import { Link } from 'react-router-dom';
import { Download, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { ProfileMenu } from './ProfileMenu';
import { NotificationsBell } from '@/components/notifications/NotificationsBell';
import { useTheme } from '@/contexts/ThemeContext';
import getmoLogo from '@/assets/getmo-logo.png';

export function Navbar() {
  const { t } = useTheme();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  return (
    <header
      className="sticky top-0 z-40 h-16 flex items-center gap-3 px-3 md:px-6 border-b border-white/5"
      style={{ background: 'hsl(268 45% 12%)' }}
    >
      {collapsed && (
        <>
          <SidebarTrigger className="text-white/80 hover:text-white" />
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={getmoLogo} alt="Getmo" className="h-9" />
          </Link>
        </>
      )}

      {/* Search */}
      <div className="flex-1 max-w-2xl mx-auto hidden md:flex">
        <div className="flex w-full items-center rounded-xl bg-black/40 border border-white/10 h-10 overflow-hidden">
          <button className="flex items-center gap-1 px-3 text-sm text-white/70 border-r border-white/10 h-full hover:text-white">
            All <ChevronDown className="h-3 w-3" />
          </button>
          <Search className="h-4 w-4 text-white/40 mx-3" />
          <input
            type="text"
            placeholder="Search +1000 games, categories, or friends..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40 h-full pr-3"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          className="hidden sm:inline-flex gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-full"
        >
          <span>{t('nav.install') || 'Install app'}</span>
          <Download className="h-4 w-4" />
        </Button>
        <NotificationsBell />
        <ProfileMenu />
      </div>
    </header>
  );
}
