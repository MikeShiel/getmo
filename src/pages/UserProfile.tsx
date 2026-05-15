import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Gamepad2, Zap, Trophy, Medal, Lock, Swords, Shield, UserPlus, UserMinus, Check, X,
  Flame, Brain, Car, Users as UsersIcon,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFriends, Friend } from '@/components/friends/FriendsContext';
import { useGuest } from '@/contexts/GuestContext';
import { useAvatar, AvatarVisual, AvatarId } from '@/contexts/AvatarContext';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const GREEN = '#22C55E';
const RED = '#EF4444';
const CARD = '#1A1730';
const BORDER = '#2E2A50';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
const RARITY: Record<Rarity, { label: string; color: string }> = {
  common:    { label: 'Common',    color: '#A0A0C0' },
  rare:      { label: 'Rare',      color: '#3B82F6' },
  epic:      { label: 'Epic',      color: '#7C3AED' },
  legendary: { label: 'Legendary', color: GOLD },
};

interface BadgeDef { id: string; name: string; rarity: Rarity; icon: React.ReactNode; }
const BADGE_DEFS: BadgeDef[] = [
  { id: 'first-game',    name: 'First Game',    rarity: 'common',    icon: <Gamepad2 className="h-7 w-7" /> },
  { id: 'dedicated',     name: 'Dedicated',     rarity: 'common',    icon: <Flame className="h-7 w-7" /> },
  { id: 'puzzle-master', name: 'Puzzle Master', rarity: 'rare',      icon: <Brain className="h-7 w-7" /> },
  { id: 'speed-racer',   name: 'Speed Racer',   rarity: 'rare',      icon: <Car className="h-7 w-7" /> },
  { id: 'top-dog',       name: 'Top Dog',       rarity: 'epic',      icon: <Trophy className="h-7 w-7" /> },
  { id: 'rival',         name: 'Rival',         rarity: 'rare',      icon: <UsersIcon className="h-7 w-7" /> },
  { id: 'clan-member',   name: 'Clan Member',   rarity: 'common',    icon: <Shield className="h-7 w-7" /> },
  { id: 'veteran',       name: 'Veteran',       rarity: 'epic',      icon: <Medal className="h-7 w-7" /> },
];

const SAMPLE_GAMES = [
  { name: 'Subway Surfers',  genre: 'Endless Runner', thumbColor: '#F97316' },
  { name: 'Bouncemasters',   genre: 'Casual',         thumbColor: '#3B82F6' },
  { name: 'Candy Rush',      genre: 'Puzzle',         thumbColor: '#EC4899' },
  { name: 'Tower Stack',     genre: 'Arcade',         thumbColor: '#10B981' },
  { name: 'Neon Dash',       genre: 'Racing',         thumbColor: '#A855F7' },
  { name: 'Block Blast',     genre: 'Puzzle',         thumbColor: '#F59E0B' },
];

function hashStr(s: string) {
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function useMockProfile(username: string, friend?: Friend) {
  return useMemo(() => {
    const h = hashStr(username);
    const level = friend?.level ?? (5 + (h % 40));
    const totalXp = level * 250 + (h % 500);
    const gamesPlayed = 20 + (h % 200);
    const unlockedCount = 1 + (h % BADGE_DEFS.length);
    const unlocked = new Set<string>();
    for (let i = 0; i < unlockedCount; i++) unlocked.add(BADGE_DEFS[(h + i * 7) % BADGE_DEFS.length].id);
    const bestRank = h % 10 === 0
      ? null
      : { rank: 1 + (h % 25), game: SAMPLE_GAMES[h % SAMPLE_GAMES.length].name };
    const recent = SAMPLE_GAMES.slice(0, 1 + (h % SAMPLE_GAMES.length)).map((g, i) => ({
      ...g, lastPlayed: i === 0 ? '12m ago' : `${(i + 1) * 2}h ago`,
    })).slice(0, 5);
    const equippedAvatar: AvatarId = (h % 7 === 0) ? 'king' : 'standard';
    const status: 'online' | 'in-game' | 'offline' =
      friend?.status ?? (h % 3 === 0 ? 'in-game' : h % 3 === 1 ? 'online' : 'offline');
    const inGame = friend?.game ?? SAMPLE_GAMES[h % SAMPLE_GAMES.length].name;
    const lastSeen = `${1 + (h % 47)}h ago`;
    return { level, totalXp, gamesPlayed, unlocked, bestRank, recent, equippedAvatar, status, inGame, lastSeen };
  }, [username, friend]);
}

function StatusLine({ status, game, lastSeen }: { status: 'online' | 'in-game' | 'offline'; game?: string; lastSeen?: string }) {
  if (status === 'in-game') return (
    <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ background: GREEN }} /><span style={{ color: GREEN }}>Playing {game}</span></span>
  );
  if (status === 'online') return (
    <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ background: GREEN }} /><span style={{ color: GREEN }}>Online</span></span>
  );
  return (
    <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full bg-muted-foreground/60" /><span className="text-muted-foreground">Last seen {lastSeen}</span></span>
  );
}

export default function UserProfile() {
  const { username = '' } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const guest = useGuest();
  const myAvatar = useAvatar();
  const f = useFriends();

  const isOwnProfile = username.toLowerCase() === (guest.displayName || '').toLowerCase();

  const friend = f.friends.find(x => x.username.toLowerCase() === username.toLowerCase());
  const incoming = f.incoming.find(x => x.username.toLowerCase() === username.toLowerCase());
  const outgoing = f.outgoing.find(x => x.username.toLowerCase() === username.toLowerCase());
  const blocked  = f.blocked.find(x => x.username.toLowerCase() === username.toLowerCase());

  const mock = useMockProfile(username, friend);

  // For self, override with real values
  const level    = isOwnProfile ? guest.displayLevel : mock.level;
  const totalXp  = isOwnProfile ? guest.displayXp    : mock.totalXp;
  const equipped = isOwnProfile ? myAvatar.equipped  : mock.equippedAvatar;
  const initial  = (username || 'G').charAt(0).toUpperCase();
  const unlockedCount = mock.unlocked.size;

  const friendsInCommon = friend ? f.friends.filter(x => x.id !== friend.id).slice(0, 4) : [];

  const ActionButtons = () => {
    if (isOwnProfile) return null;
    if (incoming) return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => f.acceptIncoming(incoming.id)} className="text-white" style={{ background: GREEN }}>
          <Check className="h-4 w-4 mr-1" /> Accept
        </Button>
        <Button variant="ghost" onClick={() => f.declineIncoming(incoming.id)}>Decline</Button>
      </div>
    );
    if (outgoing) return (
      <div className="flex flex-col items-stretch gap-1">
        <Button disabled className="opacity-60 cursor-not-allowed">Request Sent</Button>
        <button onClick={() => f.cancelOutgoing(outgoing.id)} className="text-[11px] text-muted-foreground hover:text-white text-center">Cancel</button>
      </div>
    );
    if (friend) return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => toast('Coming Soon')} className="text-white" style={{ background: PURPLE }}>
          <Swords className="h-4 w-4 mr-1" /> Challenge
        </Button>
        <Button variant="outline" onClick={() => f.removeFriend(friend.id)}>
          <UserMinus className="h-4 w-4 mr-1" /> Remove Friend
        </Button>
        <Button variant="outline" onClick={() => f.blockFriend(friend.id)}>Block</Button>
      </div>
    );
    if (blocked) return (
      <Button variant="outline" onClick={() => f.unblock(blocked.id)}>Unblock</Button>
    );
    // stranger
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => f.sendRequest({ id: 'sr-' + username, username, level, mutualFriends: 0 })} className="text-white" style={{ background: GREEN }}>
          <UserPlus className="h-4 w-4 mr-1" /> Add Friend
        </Button>
        <Button variant="outline">Block</Button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)]" style={{ background: '#000' }}>
        <div className="mx-auto px-4 py-8" style={{ maxWidth: 1000 }}>
          {/* Header */}
          <div className="p-6 rounded-xl flex flex-col md:flex-row gap-6 md:items-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex flex-col items-center md:items-start gap-2">
              <AvatarVisual id={equipped} size={80} initial={initial} />
              <StatusLine status={mock.status} game={mock.inGame} lastSeen={mock.lastSeen} />
            </div>
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-[28px] font-bold text-white truncate">{username}</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: PURPLE }}>LV.{level}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{totalXp.toLocaleString()} XP earned</p>
            </div>
            <div className="md:ml-auto w-full md:w-auto">
              <ActionButtons />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={<Gamepad2 className="h-5 w-5" />} label="Games Played" value={mock.gamesPlayed.toLocaleString()} />
            <StatCard icon={<Zap className="h-5 w-5" />}      label="Total XP"     value={`${totalXp.toLocaleString()} XP`} />
            <StatCard icon={<Trophy className="h-5 w-5" />}   label="Badges Unlocked" value={`${unlockedCount} / 8`} />
            <StatCard
              icon={<Medal className="h-5 w-5" />}
              label="Best Rank"
              value={mock.bestRank ? `#${mock.bestRank.rank} on ${mock.bestRank.game}` : 'Not ranked yet'}
              muted={!mock.bestRank}
            />
          </div>

          {/* Badges */}
          <h2 className="mt-8 mb-3 text-lg font-bold text-white">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BADGE_DEFS.map(b => {
              const unlocked = mock.unlocked.has(b.id);
              const r = RARITY[b.rarity];
              return (
                <div key={b.id} className="relative p-4 flex flex-col items-center text-center rounded-xl"
                  style={{ background: CARD, border: `2px solid ${unlocked ? r.color : BORDER}`, opacity: unlocked ? 1 : 0.85 }}
                >
                  <div className="relative mb-2" style={{ color: unlocked ? r.color : '#555170' }}>
                    {b.icon}
                    {!unlocked && <Lock className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-muted-foreground bg-[#0F0D1F] rounded-full p-0.5" />}
                  </div>
                  {unlocked ? (
                    <>
                      <p className="text-sm font-bold text-white">{b.name}</p>
                      <span className="text-[10px] font-bold uppercase mt-0.5" style={{ color: r.color }}>{r.label}</span>
                      <p className="mt-1 text-[11px] text-muted-foreground">Unlocked recently</p>
                    </>
                  ) : (
                    <p className="text-[11px] text-muted-foreground mt-1">Locked</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Recently Played */}
          <h2 className="mt-8 mb-3 text-lg font-bold text-white">Recently Played</h2>
          <div className="space-y-2">
            {mock.recent.length === 0 && (
              <p className="text-center text-muted-foreground py-8 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                No games played yet
              </p>
            )}
            {mock.recent.map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold"
                     style={{ width: 50, height: 50, background: g.thumbColor }}>
                  {g.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.genre}</p>
                </div>
                <p className="text-xs text-muted-foreground flex-shrink-0">Last played {g.lastPlayed}</p>
              </div>
            ))}
          </div>

          {/* Friends in common (only when friends) */}
          {friend && friendsInCommon.length > 0 && (
            <>
              <h2 className="mt-8 mb-3 text-lg font-bold text-white">{friendsInCommon.length} Friends in Common</h2>
              <TooltipProvider delayDuration={150}>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {friendsInCommon.map(fr => (
                    <Tooltip key={fr.id}>
                      <TooltipTrigger asChild>
                        <Link to={`/user/${fr.username}`} className="flex-shrink-0">
                          <AvatarVisual id="standard" size={40} initial={fr.username.charAt(0)} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{fr.username}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value, muted }: { icon: React.ReactNode; label: string; value: string; muted?: boolean }) {
  return (
    <div className="p-4 rounded-xl text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1.5">
        {icon}<span>{label}</span>
      </div>
      <p className={`text-base font-bold ${muted ? 'text-muted-foreground' : 'text-white'}`}>{value}</p>
    </div>
  );
}
