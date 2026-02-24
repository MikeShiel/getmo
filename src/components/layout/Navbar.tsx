import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Download, Users, Ticket } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useSocial } from '@/components/social/SocialContext';
import { XPBar } from './XPBar';
import { UserStatsModal } from '@/components/stats/UserStatsModal';
import { SocialHubModal } from '@/components/social/SocialHubModal';
import getmoLogo from '@/assets/getmo-logo.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { t } = useTheme();
  const { hasNotification, currentClan, isSocialHubOpen, openSocialHub, closeSocialHub } = useSocial();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Display name with optional clan tag
  const displayName = currentClan 
    ? `[${currentClan.tag}] ${profile?.gamer_name || 'Player'}`
    : (profile?.gamer_name || 'Player');

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
            {/* Social Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 relative"
              onClick={openSocialHub}
            >
              <Users className="h-4 w-4" />
              Social
              {hasNotification && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </Button>

            <Link to="/vouchers">
              <Button variant="ghost" size="sm" className="gap-2">
                <Ticket className="h-4 w-4" />
                Vouchers
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t('nav.install')}
            </Button>

            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className={currentClan ? 'text-primary font-medium' : ''}>
                      {displayName}
                    </span>
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
              {/* Social Button - Mobile */}
              <Button 
                variant="ghost" 
                className="justify-start gap-2 relative"
                onClick={() => { openSocialHub(); setIsMenuOpen(false); }}
              >
                <Users className="h-4 w-4" />
                Social
                {hasNotification && (
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                    1
                  </span>
                )}
              </Button>

              <Link to="/vouchers" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Ticket className="h-4 w-4" />
                  Vouchers
                </Button>
              </Link>

              <Button variant="ghost" className="justify-start gap-2">
                <Download className="h-4 w-4" />
                {t('nav.install')}
              </Button>

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      {displayName}
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
      
      {/* Social Hub Modal */}
      <SocialHubModal open={isSocialHubOpen} onOpenChange={closeSocialHub} />
    </nav>
  );
}
