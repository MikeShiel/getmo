import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import {
  Users, UserPlus, Inbox, Ban, Shield, Compass, Plus, Mail,
  Search, MoreHorizontal, Swords, X as XIcon, Check, Circle, ShieldX,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  useFriends, Friend, Incoming, Outgoing, Blocked, SearchUser,
} from '@/components/friends/FriendsContext';

const PURPLE = '#7C3AED';
const BG_DARK = '#0D0B1E';
const BG_CARD = '#1A1730';
const BORDER = '#2E2A50';
const GREEN = '#22C55E';
const RED = '#EF4444';

const SEARCH_POOL: SearchUser[] = [
  { id: 's1', username: 'CyberNinja',   level: 17, mutualFriends: 3 },
  { id: 's2', username: 'QuantumLeap',  level: 25, mutualFriends: 1 },
  { id: 's3', username: 'BlazeFury',    level: 11, mutualFriends: 0 },
  { id: 's4', username: 'AstroPunk',    level: 33, mutualFriends: 7 },
];

// ---------------- Sidebar ----------------
type View = 'friends' | 'add' | 'pending' | 'blocked' | 'clans-mine' | 'clans-find' | 'clans-create' | 'clans-pending';

function lastSeen(min?: number) {
  if (!min) return 'Last seen recently';
  if (min < 60) return `Last seen ${min}m ago`;
  if (min < 60 * 24) return `Last seen ${Math.floor(min / 60)}h ago`;
  return `Last seen ${Math.floor(min / 60 / 24)}d ago`;
}

function timeAgoMin(min: number) {
  if (min < 60) return `${min}m ago`;
  if (min < 60 * 24) return `${Math.floor(min / 60)}h ago`;
  return `${Math.floor(min / 60 / 24)}d ago`;
}

function Avatar({ name, size = 40, dim = false }: { name: string; size?: number; dim?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: PURPLE, opacity: dim ? 0.4 : 1, fontSize: size / 2.6 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function LevelBadge({ level }: { level: number }) {
  return (
    <span
      className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
      style={{ backgroundColor: PURPLE }}
    >
      LV.{level}
    </span>
  );
}

function StatusDot({ color }: { color: string }) {
  return <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />;
}

// ---------------- Page ----------------
export default function Social() {
  const [view, setView] = useState<View>('friends');
  const {
    friends, incoming, outgoing, blocked,
    sendRequest, acceptIncoming, declineIncoming, blockIncoming,
    cancelOutgoing, removeFriend, blockFriend, unblock,
  } = useFriends();

  // Confirm modal
  const [confirm, setConfirm] = useState<{ title: string; desc: string; confirmLabel: string; onConfirm: () => void } | null>(null);

  // sidebar items
  const sidebar: { section: string; items: { id: View; label: string; icon: React.ReactNode; badge?: number }[] }[] = [
    {
      section: 'FRIENDS',
      items: [
        { id: 'friends', label: 'Your Friends',    icon: <Users className="h-4 w-4" />,    badge: friends.length },
        { id: 'add',     label: 'Add a Friend',    icon: <UserPlus className="h-4 w-4" /> },
        { id: 'pending', label: 'Pending Invites', icon: <Inbox className="h-4 w-4" />,    badge: incoming.length },
        { id: 'blocked', label: 'Blocked',         icon: <Ban className="h-4 w-4" />,      badge: blocked.length },
      ],
    },
    {
      section: 'CLANS',
      items: [
        { id: 'clans-mine',    label: 'Your Clans',           icon: <Shield className="h-4 w-4" /> },
        { id: 'clans-find',    label: 'Find a Clan',          icon: <Compass className="h-4 w-4" /> },
        { id: 'clans-create',  label: 'Create a Clan',        icon: <Plus className="h-4 w-4" /> },
        { id: 'clans-pending', label: 'Pending Clan Invites', icon: <Mail className="h-4 w-4" />, badge: 0 },
      ],
    },
  ];

  const promptRemoveFriend = (f: Friend) =>
    setConfirm({
      title: `Remove ${f.username} as a friend?`,
      desc: 'They will not be notified.',
      confirmLabel: 'Remove',
      onConfirm: () => removeFriend(f.id),
    });

  const promptBlockFriend = (f: Friend) =>
    setConfirm({
      title: `Block ${f.username}?`,
      desc: "They will be removed from your friends and won't be able to contact you.",
      confirmLabel: 'Block',
      onConfirm: () => blockFriend(f.id),
    });

  const promptUnblock = (b: Blocked) =>
    setConfirm({
      title: `Unblock ${b.username}?`,
      desc: 'They will be able to find you and send friend requests again.',
      confirmLabel: 'Unblock',
      onConfirm: () => unblock(b.id),
    });

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)]" style={{ backgroundColor: BG_DARK }}>
        {/* Header */}
        <div className="border-b" style={{ borderColor: BORDER }}>
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-white">Social Hub</h1>
            <p className="text-sm text-muted-foreground">Connect with friends, join clans, and track achievements</p>
          </div>
        </div>

        {/* Layout */}
        <div className="flex">
          {/* Sidebar */}
          <aside
            className="hidden md:flex flex-col flex-shrink-0"
            style={{ width: 220, backgroundColor: BG_DARK, borderRight: `1px solid ${BORDER}`, minHeight: 'calc(100vh - 4rem - 96px)' }}
          >
            {sidebar.map(group => (
              <div key={group.section} className="py-4">
                <p className="px-4 mb-2 text-[11px] font-bold tracking-wider text-muted-foreground">{group.section}</p>
                {group.items.map(it => {
                  const active = view === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => setView(it.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                      style={{
                        backgroundColor: active ? BG_CARD : 'transparent',
                        color: active ? '#fff' : 'hsl(var(--muted-foreground))',
                        borderLeft: active ? `2px solid ${PURPLE}` : '2px solid transparent',
                      }}
                    >
                      {it.icon}
                      <span className="flex-1 text-left">{it.label}</span>
                      {typeof it.badge === 'number' && it.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: PURPLE }}>
                          {it.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* Main */}
          <main className="flex-1 px-4 md:px-8 py-6">
            {/* Mobile view switcher */}
            <div className="md:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
              {sidebar.flatMap(g => g.items).map(it => (
                <button
                  key={it.id}
                  onClick={() => setView(it.id)}
                  className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap"
                  style={{
                    backgroundColor: view === it.id ? PURPLE : BG_CARD,
                    color: '#fff',
                  }}
                >
                  {it.label}{typeof it.badge === 'number' && it.badge > 0 ? ` (${it.badge})` : ''}
                </button>
              ))}
            </div>

            {view === 'friends' && (
              <YourFriends
                friends={friends}
                onAdd={() => setView('add')}
                onRemove={promptRemoveFriend}
                onBlock={promptBlockFriend}
              />
            )}
            {view === 'add' && (
              <AddFriend
                friends={friends}
                outgoing={outgoing}
                incoming={incoming}
                blocked={blocked}
                onSendRequest={(u) => sendRequest(u)}
                onCancelOutgoing={(id) => cancelOutgoing(id)}
                onAcceptIncoming={(id) => acceptIncoming(id)}
              />
            )}
            {view === 'pending' && (
              <PendingInvites
                incoming={incoming}
                outgoing={outgoing}
                onAccept={(id) => acceptIncoming(id)}
                onDecline={(id) => declineIncoming(id)}
                onBlockIncoming={(id) => blockIncoming(id)}
                onCancelOutgoing={(id) => cancelOutgoing(id)}
              />
            )}
            {view === 'blocked' && (
              <BlockedView blocked={blocked} onUnblock={promptUnblock} />
            )}
            {view.startsWith('clans-') && (
              <div className="text-muted-foreground text-sm py-12 text-center">Clans section — coming next.</div>
            )}
          </main>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <DialogContent style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}>
          <DialogHeader>
            <DialogTitle className="text-white">{confirm?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{confirm?.desc}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setConfirm(null)}>Cancel</Button>
            <Button
              onClick={() => { confirm?.onConfirm(); setConfirm(null); }}
              style={{ backgroundColor: RED, color: '#fff' }}
            >
              {confirm?.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

// ---------------- Your Friends ----------------
function YourFriends({
  friends, onAdd, onRemove, onBlock,
}: {
  friends: Friend[];
  onAdd: () => void;
  onRemove: (f: Friend) => void;
  onBlock: (f: Friend) => void;
}) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return friends;
    return friends.filter(f => f.username.toLowerCase().includes(term) || (f.game || '').toLowerCase().includes(term));
  }, [q, friends]);

  const online = filtered.filter(f => f.status === 'online' || f.status === 'in-game');
  const offline = filtered.filter(f => f.status === 'offline');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">
          Your Friends <span className="text-muted-foreground font-normal">{friends.length} / 350</span>
        </h2>
        <Button onClick={onAdd} style={{ backgroundColor: GREEN, color: '#fff' }}>
          <UserPlus className="h-4 w-4 mr-2" /> Add a Friend
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search friends by name or game..."
          className="pl-9 bg-background text-foreground"
        />
      </div>

      {/* Online */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
          <StatusDot color={GREEN} /> Online <span className="text-muted-foreground font-normal">({online.length})</span>
        </h3>
        <div className="space-y-2">
          {online.length === 0 && <p className="text-xs text-muted-foreground">No friends online.</p>}
          {online.map(f => (
            <FriendRow key={f.id} f={f} onRemove={() => onRemove(f)} onBlock={() => onBlock(f)} />
          ))}
        </div>
      </section>

      {/* Offline */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
          <StatusDot color="#6B7280" /> Offline <span className="text-muted-foreground font-normal">({offline.length})</span>
        </h3>
        <div className="space-y-2">
          {offline.length === 0 && <p className="text-xs text-muted-foreground">Nobody offline.</p>}
          {offline.map(f => (
            <FriendRow key={f.id} f={f} onRemove={() => onRemove(f)} onBlock={() => onBlock(f)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FriendRow({ f, onRemove, onBlock }: { f: Friend; onRemove: () => void; onBlock: () => void }) {
  const statusEl =
    f.status === 'in-game' ? (
      <span className="flex items-center gap-1.5 text-xs"><StatusDot color={GREEN} /><span style={{ color: GREEN }}>Playing {f.game}</span></span>
    ) : f.status === 'online' ? (
      <span className="flex items-center gap-1.5 text-xs"><StatusDot color={GREEN} /><span style={{ color: GREEN }}>Online</span></span>
    ) : (
      <span className="text-xs text-muted-foreground">{lastSeen(f.lastSeenMin)}</span>
    );

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}
    >
      <Avatar name={f.username} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/user/${f.username}`}
            className="text-sm font-bold text-white truncate hover:underline"
            style={{ textUnderlineOffset: 3, textDecorationColor: 'rgba(124,58,237,0.6)' }}
          >
            {f.username}
          </Link>
          <LevelBadge level={f.level} />
        </div>
        <div className="mt-0.5">{statusEl}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Friend options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={`/user/${f.username}`}>View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem><Swords className="h-4 w-4 mr-2" /> Challenge</DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove} className="text-destructive">Remove Friend</DropdownMenuItem>
          <DropdownMenuItem onClick={onBlock} className="text-destructive">Block</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ---------------- Add a Friend ----------------
function AddFriend({
  friends, outgoing, incoming, blocked,
  onSendRequest, onCancelOutgoing, onAcceptIncoming,
}: {
  friends: Friend[];
  outgoing: Outgoing[];
  incoming: Incoming[];
  blocked: Blocked[];
  onSendRequest: (u: SearchUser) => void;
  onCancelOutgoing: (id: string) => void;
  onAcceptIncoming: (id: string) => void;
}) {
  const [q, setQ] = useState('');
  const [submitted, setSubmitted] = useState('');

  const results = useMemo(() => {
    const term = submitted.trim().toLowerCase();
    if (!term) return [];
    return SEARCH_POOL.filter(u =>
      u.username.toLowerCase().includes(term) &&
      !blocked.find(b => b.username.toLowerCase() === u.username.toLowerCase())
    );
  }, [submitted, blocked]);

  const stateFor = (u: SearchUser) => {
    if (friends.find(f => f.username === u.username)) return 'friends' as const;
    if (incoming.find(i => i.username === u.username)) return 'incoming' as const;
    const out = outgoing.find(o => o.username === u.username);
    if (out) return { kind: 'outgoing' as const, id: out.id };
    return 'none' as const;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Add a Friend</h2>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(q); }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter a username..."
            className="pl-9 bg-background text-foreground"
          />
        </div>
        <Button type="submit" style={{ backgroundColor: PURPLE, color: '#fff' }}>Search</Button>
      </form>

      <div className="space-y-2">
        {submitted && results.length === 0 && (
          <p className="text-sm text-muted-foreground">No users found.</p>
        )}
        {results.map(u => {
          const s = stateFor(u);
          return (
            <div key={u.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}>
              <Avatar name={u.username} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">{u.username}</p>
                  <LevelBadge level={u.level} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {u.mutualFriends} mutual {u.mutualFriends === 1 ? 'friend' : 'friends'}
                </p>
              </div>
              {s === 'friends' && <span className="text-xs text-muted-foreground">Already Friends</span>}
              {s === 'incoming' && (
                <Button
                  size="sm"
                  style={{ backgroundColor: GREEN, color: '#fff' }}
                  onClick={() => {
                    const inc = incoming.find(i => i.username === u.username);
                    if (inc) onAcceptIncoming(inc.id);
                  }}
                >
                  Accept Request
                </Button>
              )}
              {typeof s === 'object' && s.kind === 'outgoing' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Request Sent</span>
                  <Button size="sm" variant="ghost" onClick={() => onCancelOutgoing(s.id)}>Cancel</Button>
                </div>
              )}
              {s === 'none' && (
                <Button size="sm" style={{ backgroundColor: PURPLE, color: '#fff' }} onClick={() => onSendRequest(u)}>
                  Add Friend
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Pending Invites ----------------
function PendingInvites({
  incoming, outgoing, onAccept, onDecline, onBlockIncoming, onCancelOutgoing,
}: {
  incoming: Incoming[];
  outgoing: Outgoing[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onBlockIncoming: (id: string) => void;
  onCancelOutgoing: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Incoming <span className="text-muted-foreground font-normal">({incoming.length})</span></h2>
        <div className="space-y-2">
          {incoming.length === 0 && <p className="text-sm text-muted-foreground">No incoming requests.</p>}
          {incoming.map(i => (
            <div key={i.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}>
              <Avatar name={i.username} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">{i.username}</p>
                  <LevelBadge level={i.level} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Wants to be your friend · {timeAgoMin(i.agoMin)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" style={{ backgroundColor: GREEN, color: '#fff' }} onClick={() => onAccept(i.id)}>
                  <Check className="h-4 w-4 mr-1" /> Accept
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onDecline(i.id)}>Decline</Button>
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        aria-label="Block this user"
                        onClick={() => onBlockIncoming(i.id)}
                        className="h-9 w-9 rounded-md flex items-center justify-center text-muted-foreground transition-colors hover:text-white"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = RED)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <ShieldX className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Block this user</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-3">Outgoing <span className="text-muted-foreground font-normal">({outgoing.length})</span></h2>
        <div className="space-y-2">
          {outgoing.length === 0 && <p className="text-sm text-muted-foreground">No outgoing requests.</p>}
          {outgoing.map(o => (
            <div key={o.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}>
              <Avatar name={o.username} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">{o.username}</p>
                  <LevelBadge level={o.level} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Request Sent · {timeAgoMin(o.agoMin)}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => onCancelOutgoing(o.id)}>Cancel</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------------- Blocked ----------------
function BlockedView({ blocked, onUnblock }: { blocked: Blocked[]; onUnblock: (b: Blocked) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Blocked Users</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Blocked users cannot send you friend requests, find you in search, or see your scores.
        </p>
      </div>
      <div className="space-y-2">
        {blocked.length === 0 && <p className="text-sm text-muted-foreground">You haven't blocked anyone.</p>}
        {blocked.map(b => (
          <div key={b.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: BG_CARD, border: `1px solid ${BORDER}` }}>
            <Avatar name={b.username} dim />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-muted-foreground truncate">{b.username}</p>
                <LevelBadge level={b.level} />
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onUnblock(b)}>Unblock</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
