import { useState } from 'react';
import { toast } from 'sonner';
import {
  Award, Crown, Lock, Gamepad2, Flame, Brain, Car, Trophy, Users as UsersIcon,
  Shield, Medal, Check,
  CalendarCheck, Clock, UserCheck, Play, TrendingUp, CheckCircle, Target, Rocket, RotateCcw, Zap,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { useAvatar, AvatarVisual, AvatarId } from '@/contexts/AvatarContext';
import { MyProgress as MyProgressContent } from '@/components/rewards/MyProgress';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const CARD_BG = '#1A1730';
const BORDER = '#2E2A50';

type Tab = 'xp' | 'rewards' | 'activity';

const TABS: { id: Tab; label: string }[] = [
  { id: 'xp',       label: 'XP & Level' },
  { id: 'rewards',  label: 'Rewards' },
  { id: 'activity', label: 'Activity' },
];

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
const RARITY: Record<Rarity, { label: string; color: string }> = {
  common:    { label: 'Common',    color: '#9CA3AF' },
  rare:      { label: 'Rare',      color: '#3B82F6' },
  epic:      { label: 'Epic',      color: '#A855F7' },
  legendary: { label: 'Legendary', color: GOLD },
};

interface Badge {
  id: string;
  name: string;
  rarity: Rarity;
  condition: string;
  unlocked: boolean;
  date?: string;
  progress?: { current: number; target: number };
  icon: React.ReactNode;
}

const BADGES: Badge[] = [
  { id: 'first-game',   name: 'First Game',   rarity: 'common', condition: 'Play any game for the first time', unlocked: true,  date: 'Feb 1, 2026',  icon: <Gamepad2 className="h-7 w-7" /> },
  { id: 'dedicated',    name: 'Dedicated',    rarity: 'common', condition: 'Log in 7 days in a row',           unlocked: true,  date: 'Feb 8, 2026',  icon: <Flame className="h-7 w-7" /> },
  { id: 'puzzle-master',name: 'Puzzle Master',rarity: 'rare',   condition: 'Play 10 puzzle games',             unlocked: false, progress: { current: 6, target: 10 }, icon: <Brain className="h-7 w-7" /> },
  { id: 'speed-racer',  name: 'Speed Racer',  rarity: 'rare',   condition: 'Play 10 racing games',             unlocked: false, progress: { current: 3, target: 10 }, icon: <Car className="h-7 w-7" /> },
  { id: 'top-dog',      name: 'Top Dog',      rarity: 'epic',   condition: 'Reach #1 on any leaderboard',      unlocked: false, icon: <Trophy className="h-7 w-7" /> },
  { id: 'rival',        name: 'Rival',        rarity: 'rare',   condition: "Beat a friend's score in any game",unlocked: false, icon: <UsersIcon className="h-7 w-7" /> },
  { id: 'clan-member',  name: 'Clan Member',  rarity: 'common', condition: 'Join any clan',                    unlocked: true,  date: 'Mar 2, 2026',  icon: <Shield className="h-7 w-7" /> },
  { id: 'veteran',      name: 'Veteran',      rarity: 'epic',   condition: 'Complete 50 rounds total',         unlocked: false, progress: { current: 32, target: 50 }, icon: <Medal className="h-7 w-7" /> },
];

export default function MyProgressPage() {
  const [tab, setTab] = useState<Tab>('xp');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">My Progress</h1>

          {/* Tabs */}
          <div className="flex gap-1 border-b mb-6" style={{ borderColor: BORDER }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-4 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  color: tab === t.id ? '#fff' : 'hsl(var(--muted-foreground))',
                  borderBottom: tab === t.id ? `2px solid ${PURPLE}` : '2px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'xp' && <MyProgressContent />}
          {tab === 'rewards' && <RewardsTab />}
          {tab === 'activity' && <ActivityTab />}
        </div>
      </div>
    </Layout>
  );
}

// ---- Rewards Tab ----
function RewardsTab() {
  const { profile } = useAuth();
  const { displayName, displayLevel } = useGuest();
  const { equipped, kingUnlocked, setEquipped } = useAvatar();
  const [pickerOpen, setPickerOpen] = useState(false);

  const name = profile?.gamer_name || displayName || 'Guest';
  const initial = (name || 'G').charAt(0).toUpperCase();

  const equip = (id: AvatarId) => {
    setEquipped(id);
    toast(id === 'king' ? 'King Getmo equipped 👑' : 'Standard Getmo equipped');
  };

  return (
    <div className="animate-fade-in">
      {/* Identity */}
      <div className="p-5 flex items-center gap-5" style={{ backgroundColor: CARD_BG, borderRadius: 12, border: `1px solid ${BORDER}` }}>
        <AvatarVisual id={equipped} size={80} initial={initial} />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-white truncate">{name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: PURPLE }}>
            LV.{displayLevel}
          </span>
        </div>
        <button
          onClick={() => setPickerOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors hover:bg-white/5"
          style={{ color: PURPLE, borderColor: PURPLE }}
        >
          Change Avatar
        </button>
      </div>

      {/* Badges */}
      <h2 className="mt-8 mb-3 text-lg font-bold text-white">Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {BADGES.map(b => <BadgeCard key={b.id} badge={b} />)}
      </div>

      {/* Avatar Rewards */}
      <h2 className="mt-8 mb-3 text-lg font-bold text-white">Avatar Rewards</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AvatarRewardCard
          id="standard"
          equipped={equipped === 'standard'}
          onEquip={() => equip('standard')}
        />
        <KingAvatarCard
          unlocked={kingUnlocked}
          equipped={equipped === 'king'}
          onEquip={() => equip('king')}
        />
      </div>

      {/* Avatar picker modal (Prompt 7 will replace) */}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-md p-0" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
          <DialogTitle className="px-5 pt-5 text-white">Change Avatar</DialogTitle>
          <div className="grid grid-cols-2 gap-3 p-5">
            <PickerOption label="Standard Getmo" id="standard" current={equipped} onPick={(id) => { equip(id); setPickerOpen(false); }} disabled={false} />
            <PickerOption label="King Getmo" id="king" current={equipped} onPick={(id) => { equip(id); setPickerOpen(false); }} disabled={!kingUnlocked} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PickerOption({ label, id, current, onPick, disabled }: { label: string; id: AvatarId; current: AvatarId; onPick: (id: AvatarId) => void; disabled: boolean; }) {
  const isCurrent = current === id;
  return (
    <button
      disabled={disabled}
      onClick={() => onPick(id)}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ borderColor: isCurrent ? PURPLE : BORDER, backgroundColor: '#0F0D1F' }}
    >
      <AvatarVisual id={id} size={64} initial="G" />
      <span className="text-xs font-semibold text-white">{label}</span>
      {isCurrent && <span className="text-[10px] font-bold" style={{ color: '#22C55E' }}>EQUIPPED</span>}
      {disabled && <span className="text-[10px] text-muted-foreground">Locked</span>}
    </button>
  );
}

function BadgeCard({ badge }: { badge: Badge }) {
  const r = RARITY[badge.rarity];
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center"
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 12,
        border: `2px solid ${badge.unlocked ? r.color : BORDER}`,
        opacity: badge.unlocked ? 1 : 0.85,
      }}
    >
      <div className="relative mb-2" style={{ color: badge.unlocked ? r.color : '#555170' }}>
        {badge.icon}
        {!badge.unlocked && (
          <Lock className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-muted-foreground bg-[#0F0D1F] rounded-full p-0.5" />
        )}
      </div>
      <p className="text-sm font-bold text-white">{badge.name}</p>
      <span className="text-[10px] font-bold uppercase mt-0.5" style={{ color: r.color }}>
        {r.label}
      </span>
      {badge.unlocked ? (
        <p className="mt-1 text-[11px] text-muted-foreground">Unlocked {badge.date}</p>
      ) : (
        <>
          <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{badge.condition}</p>
          {badge.progress && (
            <div className="w-full mt-2">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
                <div
                  className="h-full"
                  style={{ width: `${(badge.progress.current / badge.progress.target) * 100}%`, backgroundColor: r.color }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{badge.progress.current}/{badge.progress.target}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AvatarRewardCard({ id, equipped, onEquip }: { id: AvatarId; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="p-4 flex flex-col items-center text-center"
      style={{ backgroundColor: CARD_BG, borderRadius: 12, border: `2px solid ${BORDER}` }}
    >
      <AvatarVisual id={id} size={72} initial="G" />
      <p className="mt-2 text-sm font-bold text-white">Standard Getmo</p>
      <span className="text-[10px] font-bold uppercase mt-0.5 text-muted-foreground">Default</span>
      <div className="mt-3 w-full">
        {equipped ? (
          <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
            <Check className="h-3 w-3" /> Currently Equipped
          </span>
        ) : (
          <button onClick={onEquip} className="w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
            Equip
          </button>
        )}
      </div>
    </div>
  );
}

function KingAvatarCard({ unlocked, equipped, onEquip }: { unlocked: boolean; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center"
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 12,
        border: `2px solid ${GOLD}`,
      }}
    >
      <span
        className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold"
        style={{ backgroundColor: 'rgba(245,196,26,0.15)', color: GOLD }}
      >
        LEGENDARY
      </span>
      <div className="relative" style={{ opacity: unlocked ? 1 : 0.4 }}>
        <AvatarVisual id="king" size={72} initial="G" />
        {!unlocked && (
          <Lock className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow" />
        )}
      </div>
      <p className="mt-2 text-sm font-bold text-white">King Getmo</p>
      {unlocked ? (
        <p className="mt-1 text-[11px] font-semibold leading-snug" style={{ color: GOLD }}>
          👑 Earned — Reach #1 on Leaderboard
        </p>
      ) : (
        <p className="mt-1 text-[11px] leading-snug" style={{ color: GOLD }}>
          Reach #1 on any leaderboard to unlock 👑
        </p>
      )}
      <div className="mt-3 w-full">
        {unlocked && (
          equipped ? (
            <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
              <Check className="h-3 w-3" /> Currently Equipped
            </span>
          ) : (
            <button onClick={onEquip} className="w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
              Use as Avatar
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ---- Activity Tab ----
function ActivityTab() {
  // Reuse the right column event history full width by rendering MyProgressContent
  // and visually hiding its left column via a wrapper class. Simpler: render only events.
  return (
    <div className="animate-fade-in">
      <ActivityFullWidth />
    </div>
  );
}

// Activity events feed (full width).
const ACTIVITY_EVENTS = [
  { label: 'Daily Login', xp: 25, time: '2m ago', icon: <CalendarCheck className="h-4 w-4" /> },
  { label: 'First Game of the Day', xp: 50, time: '5m ago', icon: <Gamepad2 className="h-4 w-4" /> },
  { label: 'Time Milestone (30 min)', xp: 30, time: '18m ago', icon: <Clock className="h-4 w-4" /> },
  { label: 'Level Up in Candy Rush', xp: 50, time: '25m ago', icon: <TrendingUp className="h-4 w-4" /> },
  { label: 'High Score Beaten!', xp: 75, time: '1h ago', icon: <Target className="h-4 w-4" /> },
  { label: 'Stage Cleared – Tower Stack', xp: 40, time: '1h ago', icon: <CheckCircle className="h-4 w-4" /> },
  { label: 'Game Started – Block Blast', xp: 10, time: '2h ago', icon: <Play className="h-4 w-4" /> },
  { label: 'Session Completed', xp: 20, time: '2h ago', icon: <Award className="h-4 w-4" /> },
  { label: 'Score Milestone (5000 pts)', xp: 50, time: '3h ago', icon: <Zap className="h-4 w-4" /> },
  { label: 'New Game Launched – Pixel Run', xp: 15, time: '4h ago', icon: <Rocket className="h-4 w-4" /> },
  { label: 'Run Completed – Neon Dash', xp: 20, time: '5h ago', icon: <RotateCcw className="h-4 w-4" /> },
  { label: 'Profile Completed', xp: 100, time: '1d ago', icon: <UserCheck className="h-4 w-4" /> },
];

function ActivityFullWidth() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="p-5 border-b border-border/50">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-secondary" />
          Full Event History
        </h2>
        <p className="text-xs text-muted-foreground mt-1">All XP earned from your activity</p>
      </div>
      <ScrollArea className="h-[700px]">
        <div className="p-4 space-y-1">
          {ACTIVITY_EVENTS.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <div className="p-2.5 rounded-lg bg-primary/15 text-primary">
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{event.label}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-secondary">+{event.xp}</span>
                <span className="text-xs text-muted-foreground ml-0.5">XP</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}