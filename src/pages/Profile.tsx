import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Crown, Globe, Sun, Moon, Save, Gamepad2, Sparkles, Zap, UserPlus } from 'lucide-react';
import { useGuest } from '@/contexts/GuestContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const profileSchema = z.object({
  gamerName: z.string().min(3, 'Gamer name must be at least 3 characters').max(20),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function Profile() {
  const { user, profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { t, theme, language, setTheme, setLanguage } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { gamerName: profile?.gamer_name || '' },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </Layout>
    );
  }

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsSaving(true);
    const { error } = await updateProfile({ gamer_name: data.gamerName });
    setIsSaving(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Profile updated! ✨",
        description: "Your changes have been saved.",
      });
    }
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
    setIsSaving(true);
    try {
      // Verify current password by attempting re-authentication
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: data.currentPassword,
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Current password is incorrect.",
        });
        setIsSaving(false);
        return;
      }

      // Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) {
        toast({
          variant: "destructive",
          title: "Password change failed",
          description: updateError.message,
        });
        setIsSaving(false);
        return;
      }

      toast({
        title: "Password changed! 🔐",
        description: "Your password has been updated successfully.",
      });
      passwordForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    }
    setIsSaving(false);
  };

  const handlePreferenceChange = async (key: 'language' | 'theme_preference', value: string) => {
    if (key === 'language') {
      setLanguage(value as 'en' | 'es');
    } else {
      setTheme(value as 'dark' | 'light');
    }
    
    // Also save to profile if logged in
    await updateProfile({ [key]: value });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-display font-bold mb-8 neon-text-cyan">
          {t('profile.title')}
        </h1>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              {t('profile.account')}
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <Crown className="h-4 w-4" />
              {t('profile.subscription')}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Globe className="h-4 w-4" />
              {t('profile.preferences')}
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            {/* Gamer Name */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t('profile.gamerName')}</h3>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="gamerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              placeholder="Your gamer name"
                              className="pl-10 bg-input border-border"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="gap-2"
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? t('common.loading') : t('profile.save')}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Email */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t('profile.email')}</h3>
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user?.email}</span>
              </div>
            </div>

            {/* Password */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t('profile.changePassword')}</h3>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              type="password"
                              className="pl-10 bg-input border-border"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              type="password"
                              className="pl-10 bg-input border-border"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              type="password"
                              className="pl-10 bg-input border-border"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="outline">
                    {t('profile.changePassword')}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{t('profile.currentPlan')}</h3>
                  <p className="text-muted-foreground">
                    {profile?.is_premium ? 'Games Now Plus' : 'Free Plan'}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full ${
                  profile?.is_premium 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {profile?.is_premium ? <Crown className="h-5 w-5" /> : <Gamepad2 className="h-5 w-5" />}
                </div>
              </div>

              {profile?.is_premium ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">GN+ PREMIUM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-input rounded-lg">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">Games Now Plus</span>
                  </div>
                  <div className="flex justify-between p-3 bg-input rounded-lg">
                    <span className="text-muted-foreground">Amount</span>
                    <span>€5.00/month</span>
                  </div>
                  <div className="flex justify-between p-3 bg-input rounded-lg">
                    <span className="text-muted-foreground">Billing date</span>
                    <span>1st of each month</span>
                  </div>

                  <div className="pt-2 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/subscriptions')}
                    >
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      Downgrade to Games Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => navigate('/subscriptions?action=cancel')}
                    >
                      Cancel my subscription
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Crown className="h-16 w-16 mx-auto mb-4 text-secondary" />
                  <h4 className="text-xl font-semibold mb-2">Unlock Premium Gaming</h4>
                  <p className="text-muted-foreground mb-6">
                    Get 150+ premium titles, cloud gaming, and cross-device saves for just €5/month
                  </p>
                  <Button 
                    onClick={() => navigate('/subscriptions')}
                    className="gradient-neon hover:opacity-90 text-primary-foreground font-bold neon-glow-primary"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            {/* Language */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">{t('profile.language')}</h3>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                </div>
                <Select 
                  value={language} 
                  onValueChange={(value) => handlePreferenceChange('language', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Theme */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Sun className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">{t('profile.theme')}</h3>
                    <p className="text-sm text-muted-foreground">Choose dark or light mode</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    checked={theme === 'light'}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('theme_preference', checked ? 'light' : 'dark')
                    }
                  />
                  <Sun className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </Layout>
  );
}
