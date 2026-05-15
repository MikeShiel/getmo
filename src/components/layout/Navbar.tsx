import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Download, Users, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useGuest } from '@/contexts/GuestContext';
import { useSocial } from '@/components/social/SocialContext';
import { UserStatsModal } from '@/components/stats/UserStatsModal';
import { ProgressPanel } from './ProgressPanel';
import { LeaderboardPanel } from './LeaderboardPanel';
import { DailyMissionsNavItem } from './DailyMissionsNavItem';
import { ProfileMenu } from './ProfileMenu';
import getmoLogo from '@/assets/getmo-logo.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const { t } = useTheme();
  const navigate = useNavigate();

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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            <DailyMissionsNavItem />

            <Link to="/social">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Social
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setLeaderboardOpen(true)}
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>

            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t('nav.install')}
            </Button>

            <ProfileMenu />
          </div>

          {/* Mobile right side: profile menu + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ProfileMenu />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link to="/daily-missions" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <span aria-hidden="true">🔥</span>
                  Daily Missions
                </Button>
              </Link>

              <Link to="/social" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Social
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => { setLeaderboardOpen(true); setIsMenuOpen(false); }}
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>

              <Button variant="ghost" className="justify-start gap-2">
                <Download className="h-4 w-4" />
                {t('nav.install')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* User Stats Modal */}
      <UserStatsModal open={statsModalOpen} onOpenChange={setStatsModalOpen} />

      {/* Progress + Leaderboard panels */}
      <ProgressPanel open={progressOpen} onOpenChange={setProgressOpen} />
      <LeaderboardPanel open={leaderboardOpen} onOpenChange={setLeaderboardOpen} />
    </nav>
  );
}
