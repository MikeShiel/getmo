import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, BarChart3, User, Users, Shield, LogOut, UserPlus, Crown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAvatar, AvatarVisual } from '@/contexts/AvatarContext';

const BG = '#0D0B1E';
const CARD = '#1A1730';
const BORDER = '#2E2A50';
const HOVER = '#2E2A50';
const PURPLE = '#7C3AED';

interface MenuBodyProps {
  name: string;
  initial: string;
  level: number;
  xp: number;
  maxXp: number;
  isPremium: boolean;
  isGuest: boolean;
  onNavigate: (to: string) => void;
  onSignOut: () => void;
  onSignUp: () => void;
}

function MenuBody({ name, initial, level, xp, maxXp, isPremium, isGuest, onNavigate, onSignOut, onSignUp }: MenuBodyProps) {
  const pct = Math.min((xp % maxXp) / maxXp * 100, 100);
  const { equipped } = useAvatar();

  const items = [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'My Progress', to: '/my-progress' },
    { icon: <User className="h-4 w-4" />,      label: 'Profile',     to: '/profile' },
    { icon: <Users className="h-4 w-4" />,     label: 'Friends',     to: '/social' },
    { icon: <Shield className="h-4 w-4" />,    label: 'Clans',       to: '/social?tab=clans' },
  ];

  return (
    <div className="flex flex-col">
      {/* Summary */}
      <div className="p-4" style={{ backgroundColor: CARD }}>
        <div className="flex items-center gap-3">
          <AvatarVisual id={equipped} size={48} initial={initial} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-white font-bold truncate">{name}</p>
              {isPremium && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary text-secondary-foreground">
                  <Crown className="h-3 w-3" /> GN+
                </span>
              )}
            </div>
            <span
              className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: PURPLE }}
            >
              LV.{level}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
            <div className="h-full" style={{ width: `${pct}%`, backgroundColor: PURPLE }} />
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            {xp % maxXp}/{maxXp} XP · Total {xp.toLocaleString()} XP
          </p>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: BORDER }} />

      {/* Links */}
      <ul className="py-2">
        {items.map((it) => (
          <li key={it.label}>
            <button
              onClick={() => onNavigate(it.to)}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span className="text-muted-foreground">{it.icon}</span>
              <span>{it.label}</span>
            </button>
          </li>
        ))}

        <li>
          {isGuest ? (
            <button
              onClick={onSignUp}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
              style={{ color: PURPLE, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <UserPlus className="h-4 w-4" />
              <span className="font-semibold">Sign up / Save progress</span>
            </button>
          ) : (
            <button
              onClick={onSignOut}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              <span>Logout</span>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export function ProfileMenu() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { isGuest, displayName, displayXp, displayLevel, setShowSaveProgressModal } = useGuest();
  const { equipped } = useAvatar();

  const name = profile?.gamer_name || displayName || 'Guest';
  const initial = (name || 'G').charAt(0).toUpperCase();
  const isPremium = !!profile?.is_premium;

  const handleNavigate = (to: string) => {
    setOpen(false);
    navigate(to);
  };
  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate('/');
  };
  const handleSignUp = () => {
    setOpen(false);
    setShowSaveProgressModal(true);
  };

  const trigger = (
    <button
      className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-muted/40 transition-colors"
      aria-label="Open profile menu"
    >
      <AvatarVisual id={equipped} size={32} initial={initial} />
      <span className="text-sm text-foreground font-medium max-w-[120px] truncate">{name}</span>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </button>
  );

  const body = (
    <MenuBody
      name={name}
      initial={initial}
      level={displayLevel}
      xp={displayXp}
      maxXp={1000}
      isPremium={isPremium}
      isGuest={!user || isGuest}
      onNavigate={handleNavigate}
      onSignOut={handleSignOut}
      onSignUp={handleSignUp}
    />
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="p-0 border-0 rounded-t-2xl overflow-hidden"
          style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, height: '60vh' }}
        >
          {body}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="p-0 overflow-hidden"
        style={{
          width: 280,
          backgroundColor: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
        }}
      >
        {body}
      </PopoverContent>
    </Popover>
  );
}
