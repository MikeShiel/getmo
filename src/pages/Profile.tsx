import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User, Mail, Crown, Globe, Sun, Moon, Save, Gamepad2, Sparkles, UserPlus,
  ChevronDown, Zap, Trophy, Medal, Brain, Car, Flame, Shield, Users as UsersIcon, Lock,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAvatar, AvatarVisual } from '@/contexts/AvatarContext';
import { AvatarPickerModal } from '@/components/avatars/AvatarPickerModal';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const RED = '#EF4444';
const CARD = '#1A1730';
const BORDER = '#2E2A50';
const MUTED = 'hsl(var(--muted-foreground))';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
const RARITY: Record<Rarity, { color: string }> = {
  common: { color: '#A0A0C0' }, rare: { color: '#3B82F6' },
  epic: { color: '#A855F7' },   legendary: { color: GOLD },
};
const TOP_BADGES = [
  { id: 'clan-member',  name: 'Clan Member',  rarity: 'common' as Rarity, icon: <Shield className="h-5 w-5" /> },
  { id: 'dedicated',    name: 'Dedicated',    rarity: 'common' as Rarity, icon: <Flame className="h-5 w-5" /> },
  { id: 'first-game',   name: 'First Game',   rarity: 'common' as Rarity, icon: <Gamepad2 className="h-5 w-5" /> },
];

const profileSchema = z.object({ gamerName: z.string().min(3).max(20) });
const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(d => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function Profile() {
  const { user, profile, loading, updateProfile } = useAuth();
  const { displayName, displayLevel, displayXp, setShowSaveProgressModal } = useGuest();
  const { equipped } = useAvatar();
  const navigate = useNavigate();
  const { t, theme, language, setTheme, setLanguage } = useTheme();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<'account' | 'subscription' | 'preferences' | null>('account');

  if (!loading && !user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
          <div className="glass-card p-8 max-w-md text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-orbitron mb-2">Create Your Profile</h2>
              <p className="text-muted-foreground">Sign up for a free account to customise your gamer profile.</p>
            </div>
            <button onClick={() => setShowSaveProgressModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <UserPlus className="h-4 w-4" /> Create Free Account
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return <Layout><div className="container mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">{t('common.loading')}</p></div></Layout>;
  }

  const name = profile?.gamer_name || displayName || 'Guest';
  const initial = name.charAt(0).toUpperCase();
  const totalXp = displayXp || 6000;
  const level = displayLevel || 7;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: 1000 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('profile.title')}</h1>

        {/* SECTION 1 — Profile Overview */}
        <p className="text-xs mb-2" style={{ color: MUTED }}>This is how others see you</p>
        <div className="p-6" style={{ background: CARD, borderRadius: 12 }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <AvatarVisual id={equipped} size={80} initial={initial} />
              <Button onClick={() => setPickerOpen(true)} variant="outline"
                style={{ borderColor: PURPLE, color: PURPLE, background: 'transparent' }}
                className="hover:bg-white/5">Change Avatar</Button>
              <span className="flex items-center gap-1.5 text-xs mt-1">
                <span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
                <span style={{ color: '#22C55E' }}>Online</span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-white truncate">{name}</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: PURPLE }}>LV.{level}</span>
              </div>
              <p className="text-sm mt-1" style={{ color: MUTED }}>{totalXp.toLocaleString()} XP earned</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <StatCard icon={<Gamepad2 className="h-4 w-4" />} label="Games Played" value="42" />
                <StatCard icon={<Zap className="h-4 w-4" />} label="Total XP" value={`${totalXp.toLocaleString()}`} />
                <StatCard icon={<Trophy className="h-4 w-4" />} label="Badges" value="3 / 8"
                  onClick={() => navigate('/my-progress?tab=rewards')} />
                <StatCard icon={<Medal className="h-4 w-4" />} label="Best Rank" value="#7 on Tower Stack"
                  onClick={() => navigate('/leaderboard')} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  {TOP_BADGES.map(b => (
                    <div key={b.id} className="p-2 rounded-lg" style={{ border: `2px solid ${RARITY[b.rarity].color}`, color: RARITY[b.rarity].color }}>
                      {b.icon}
                    </div>
                  ))}
                  <div className="p-2 rounded-lg opacity-60" style={{ border: `2px dashed ${BORDER}`, color: MUTED }}>
                    <Lock className="h-5 w-5" />
                  </div>
                </div>
                <button onClick={() => navigate('/my-progress?tab=rewards')} className="text-sm font-semibold" style={{ color: PURPLE }}>
                  View All Rewards →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — Settings */}
        <h2 className="text-lg font-bold text-white mt-8 mb-3">Settings</h2>
        <div className="space-y-3">
          <AccountPanel
            open={openPanel === 'account'}
            onToggle={() => setOpenPanel(openPanel === 'account' ? null : 'account')}
            user={user}
            currentName={profile?.gamer_name || ''}
            updateProfile={updateProfile}
          />
          <SubscriptionPanel
            open={openPanel === 'subscription'}
            onToggle={() => setOpenPanel(openPanel === 'subscription' ? null : 'subscription')}
            isPremium={!!profile?.is_premium}
            onNavigate={navigate}
          />
          <PreferencesPanel
            open={openPanel === 'preferences'}
            onToggle={() => setOpenPanel(openPanel === 'preferences' ? null : 'preferences')}
            language={language}
            theme={theme}
            onLang={(v) => { setLanguage(v as 'en' | 'es'); updateProfile({ language: v }); }}
            onTheme={(v) => { setTheme(v as 'dark' | 'light'); updateProfile({ theme_preference: v }); }}
            t={t}
          />
        </div>

        <AvatarPickerModal open={pickerOpen} onOpenChange={setPickerOpen} />
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value, onClick }: { icon: React.ReactNode; label: string; value: string; onClick?: () => void }) {
  const C = onClick ? 'button' : 'div';
  return (
    <C onClick={onClick} className={`p-3 text-center w-full ${onClick ? 'transition-transform hover:-translate-y-0.5 cursor-pointer' : ''}`}
       style={{ background: '#0F0D1F', borderRadius: 10, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: MUTED }}>
        {icon}<span>{label}</span>
      </div>
      <p className="text-sm font-bold text-white truncate">{value}</p>
    </C>
  );
}

function PanelShell({ open, onToggle, title, icon, badge, children }: {
  open: boolean; onToggle: () => void; title: string; icon: string; badge?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div style={{ background: CARD, borderRadius: 12, border: `1px solid ${BORDER}` }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4">
        <span className="flex items-center gap-2 text-white font-bold">
          <span>{icon}</span><span>{title}</span>{badge}
        </span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="p-4 pt-0 border-t" style={{ borderColor: BORDER }}>{children}</div>}
    </div>
  );
}

function AccountPanel({ open, onToggle, user, currentName, updateProfile }: any) {
  const [showPwd, setShowPwd] = useState(false);
  const [saving, setSaving] = useState(false);
  const profileForm = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema), defaultValues: { gamerName: currentName } });
  const passwordForm = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });

  const onSaveName = async (d: ProfileFormData) => {
    setSaving(true);
    const { error } = await updateProfile({ gamer_name: d.gamerName });
    setSaving(false);
    if (error) toast({ variant: 'destructive', title: 'Update failed', description: error.message });
    else toast({ title: 'Profile updated! ✨' });
  };
  const onChangePwd = async (d: PasswordFormData) => {
    setSaving(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: user?.email || '', password: d.currentPassword });
    if (signInError) { toast({ variant: 'destructive', title: 'Authentication failed', description: 'Current password is incorrect.' }); setSaving(false); return; }
    const { error } = await supabase.auth.updateUser({ password: d.newPassword });
    setSaving(false);
    if (error) toast({ variant: 'destructive', title: 'Password change failed', description: error.message });
    else { toast({ title: 'Password changed! 🔐' }); passwordForm.reset(); }
  };

  return (
    <PanelShell open={open} onToggle={onToggle} title="Your Account" icon="👤">
      <div className="pt-4 space-y-5">
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onSaveName)} className="space-y-3">
            <FormField control={profileForm.control} name="gamerName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Gamer Name</FormLabel>
                <FormControl><Input {...field} className="bg-background text-foreground" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={saving} style={{ background: PURPLE }} className="text-white">
              <Save className="h-4 w-4 mr-2" />{saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </form>
        </Form>

        <div>
          <p className="text-white text-sm font-semibold mb-1">Email</p>
          <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: '#0F0D1F', border: `1px solid ${BORDER}` }}>
            <Mail className="h-4 w-4" style={{ color: MUTED }} />
            <span style={{ color: MUTED }}>{user?.email}</span>
          </div>
          <p className="text-xs mt-1" style={{ color: MUTED }}>Cannot be changed</p>
        </div>

        <div>
          <button onClick={() => setShowPwd(s => !s)} className="text-sm font-semibold" style={{ color: PURPLE }}>
            {showPwd ? 'Hide' : 'Change Password'}
          </button>
          {showPwd && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onChangePwd)} className="space-y-3 mt-3">
                {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map(n => (
                  <FormField key={n} control={passwordForm.control} name={n} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        {n === 'currentPassword' ? 'Current Password' : n === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                      </FormLabel>
                      <FormControl><Input type="password" {...field} className="bg-background text-foreground" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                ))}
                <Button type="submit" variant="secondary">Change Password</Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </PanelShell>
  );
}

function SubscriptionPanel({ open, onToggle, isPremium, onNavigate }: any) {
  return (
    <PanelShell open={open} onToggle={onToggle} title="Subscription" icon="👑"
      badge={isPremium ? <Crown className="h-4 w-4" style={{ color: GOLD }} /> : undefined}>
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: MUTED }}>Current Plan</span>
          <span className="text-white font-bold">{isPremium ? 'Games Now Plus' : 'Free Plan'}</span>
        </div>
        {isPremium ? (
          <>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" style={{ color: GOLD }} /><span className="text-sm font-semibold" style={{ color: GOLD }}>GN+ PREMIUM</span></div>
            <Row label="Plan" value="Games Now Plus" />
            <Row label="Amount" value="€5.00/month" />
            <Row label="Billing date" value="1st of each month" />
            <Button variant="secondary" className="w-full" onClick={() => onNavigate('/subscriptions')}>
              <Gamepad2 className="h-4 w-4 mr-2" /> Downgrade to Games Now
            </Button>
            <button onClick={() => onNavigate('/subscriptions?action=cancel')} className="block mx-auto text-sm font-semibold" style={{ color: RED }}>
              Cancel my subscription
            </button>
          </>
        ) : (
          <Button onClick={() => onNavigate('/subscriptions')} style={{ background: PURPLE }} className="w-full text-white">
            Upgrade to Premium
          </Button>
        )}
      </div>
    </PanelShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between p-3 rounded-lg" style={{ background: '#0F0D1F', border: `1px solid ${BORDER}` }}>
      <span style={{ color: MUTED }}>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function PreferencesPanel({ open, onToggle, language, theme, onLang, onTheme, t }: any) {
  return (
    <PanelShell open={open} onToggle={onToggle} title="Preferences" icon="⚙️">
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white flex items-center gap-2"><Globe className="h-4 w-4" />{t('profile.language')}</span>
          <Select value={language} onValueChange={onLang}>
            <SelectTrigger className="w-32 bg-background text-foreground"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}{t('profile.theme')}
          </span>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" style={{ color: MUTED }} />
            <Switch checked={theme === 'light'} onCheckedChange={(c) => onTheme(c ? 'light' : 'dark')} />
            <Sun className="h-4 w-4" style={{ color: MUTED }} />
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
