import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Download, Ticket, Crown, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useGuest } from '@/contexts/GuestContext';
import { useSocial } from '@/components/social/SocialContext';
import { XPBar } from './XPBar';
import { UserStatsModal } from '@/components/stats/UserStatsModal';
import getmoLogo from '@/assets/getmo-logo.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { t } = useTheme();
  const { currentClan } = useSocial();
  const { isGuest, displayName, displayXp, displayLevel, setShowSaveProgressModal } = useGuest();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Display name with optional clan tag
  const fullDisplayName = user && currentClan 
    ? `[${currentClan.tag}] ${profile?.gamer_name || 'Player'}`
    : displayName;

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
              level={displayLevel} 
              xp={displayXp} 
              onClick={() => isGuest ? setShowSaveProgressModal(true) : navigate('/rewards')}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/vouchers">
              <Button variant="ghost" size="sm" className="gap-2">
                <Ticket className="h-4 w-4" />
                Vouchers
              </Button>
            </Link>

            <Link to="/social">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Social
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
                      {fullDisplayName}
                    </span>
                    {profile?.is_premium && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary text-secondary-foreground">
                        <Crown className="h-3 w-3" />
                        GN+
                      </span>
                    )}
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
              /* Guest Profile Pill */
              <button
                onClick={() => setShowSaveProgressModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Guest</span>
                <span className="text-xs font-bold text-primary">{displayXp} XP</span>
              </button>
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
            {/* XP Bar - Mobile */}
            <div className="mb-4">
              <XPBar 
                level={displayLevel} 
                xp={displayXp}
                onClick={() => { 
                  if (isGuest) {
                    setShowSaveProgressModal(true);
                  } else {
                    setStatsModalOpen(true);
                  }
                  setIsMenuOpen(false); 
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
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
                      {fullDisplayName}
                      {profile?.is_premium && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary text-secondary-foreground">
                          <Crown className="h-3 w-3" />
                          GN+
                        </span>
                      )}
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
                <Button 
                  onClick={() => { setShowSaveProgressModal(true); setIsMenuOpen(false); }}
                  className="w-full gap-2 bg-primary hover:bg-primary/90"
                >
                  <UserPlus className="h-4 w-4" />
                  Save Progress
                </Button>
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
