import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { XPBar } from './XPBar';
import { UserStatsModal } from '@/components/stats/UserStatsModal';
import getmoLogo from '@/assets/getmo-logo.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { t } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={getmoLogo} 
              alt="Getmo" 
              className="h-10 transition-all group-hover:scale-105"
            />
          </Link>

          {/* XP Bar - Desktop (clickable) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <XPBar 
              level={profile?.xp_level || 1} 
              xp={profile?.xp_points || 0} 
              onClick={() => setStatsModalOpen(true)}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t('nav.install')}
            </Button>

            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {profile?.gamer_name || 'Player'}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-primary"
                >
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            {/* XP Bar - Mobile (clickable) */}
            <div className="mb-4">
              <XPBar 
                level={profile?.xp_level || 1} 
                xp={profile?.xp_points || 0}
                onClick={() => { setStatsModalOpen(true); setIsMenuOpen(false); }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start gap-2">
                <Download className="h-4 w-4" />
                {t('nav.install')}
              </Button>

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      {t('nav.profile')}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                    className="justify-start"
                  >
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {t('nav.login')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Stats Modal */}
      <UserStatsModal open={statsModalOpen} onOpenChange={setStatsModalOpen} />
    </nav>
  );
}
