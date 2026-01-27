import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';
import getmoLogo from '@/assets/getmo-logo.png';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  gamerName: z.string().min(3, 'Gamer name must be at least 3 characters').max(20, 'Gamer name must be 20 characters or less'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn } = useAuth();
  const { t } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome back! 🎮",
        description: "You've successfully logged in.",
      });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">{t('auth.email')}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="pl-10"
            autoComplete="email"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">{t('auth.password')}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-10 pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 neon-glow-cyan"
        disabled={isLoading}
      >
        {isLoading ? t('common.loading') : t('auth.login')}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <button
            type="button"
            onClick={onToggle}
            className="text-primary hover:underline font-medium"
          >
            {t('auth.signup')}
          </button>
        </p>
      </div>
    </form>
  );
}

function SignupForm({ onToggle }: { onToggle: () => void }) {
  const [gamerName, setGamerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ gamerName?: string; email?: string; password?: string }>({});
  const { signUp } = useAuth();
  const { t } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ gamerName, email, password });
    if (!result.success) {
      const fieldErrors: { gamerName?: string; email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'gamerName') fieldErrors.gamerName = err.message;
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password, gamerName);
    setIsLoading(false);

    if (error) {
      let message = error.message;
      if (error.message.includes('already registered')) {
        message = 'An account with this email already exists. Try logging in instead.';
      }
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: message,
      });
    } else {
      toast({
        title: "Account created! 🎉",
        description: "Welcome to Getmo!",
      });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-gamer-name">{t('auth.gamerName')}</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-gamer-name"
            type="text"
            value={gamerName}
            onChange={(e) => setGamerName(e.target.value)}
            placeholder="NeonMaster2025"
            className="pl-10"
            autoComplete="username"
          />
        </div>
        {errors.gamerName && <p className="text-sm text-destructive">{errors.gamerName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">{t('auth.email')}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="pl-10"
            autoComplete="email"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">{t('auth.password')}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-10 pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <PasswordStrengthIndicator password={password} />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 neon-glow-cyan"
        disabled={isLoading}
      >
        {isLoading ? t('common.loading') : t('auth.signup')}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground">
          {t('auth.hasAccount')}{' '}
          <button
            type="button"
            onClick={onToggle}
            className="text-primary hover:underline font-medium"
          >
            {t('auth.login')}
          </button>
        </p>
      </div>
    </form>
  );
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const { t } = useTheme();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="glass-card p-8 w-full max-w-md animated-border">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <img src={getmoLogo} alt="Getmo" className="h-10" />
            </div>
            <h1 className="text-2xl font-bold">
              {isLogin ? t('auth.login') : t('auth.signup')}
            </h1>
          </div>

          {isLogin ? (
            <LoginForm key="login" onToggle={() => setIsLogin(false)} />
          ) : (
            <SignupForm key="signup" onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </Layout>
  );
}
