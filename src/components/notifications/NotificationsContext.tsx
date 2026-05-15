import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type NotifType =
  | 'friend_request'
  | 'friend_accepted'
  | 'score_beaten'
  | 'challenge'
  | 'clan_invite'
  | 'level_up'
  | 'mission_complete'
  | 'daily_cap';

export type NotifGroup = 'social' | 'progress';

export interface Notification {
  id: string;
  type: NotifType;
  group: NotifGroup;
  message: string;
  // ms ago for ordering / day-bucketing
  agoMs: number;
  read: boolean;
  actionable?: 'accept_decline' | 'play_now';
}

const HOUR = 1000 * 60 * 60;
const DAY = 24 * HOUR;

const SEED: Notification[] = [
  { id: 'n1', type: 'friend_request', group: 'social',   agoMs: 5 * 60 * 1000,    read: false, actionable: 'accept_decline', message: 'NeonRider99 wants to be your friend' },
  { id: 'n2', type: 'score_beaten',   group: 'social',   agoMs: 25 * 60 * 1000,   read: false, message: 'PixelQueen just beat your score in Subway Surfers — 184,520 points' },
  { id: 'n3', type: 'challenge',      group: 'social',   agoMs: 2 * HOUR,         read: false, actionable: 'play_now',       message: 'BoltZap challenged you to beat 50,000 in Bouncemasters' },
  { id: 'n4', type: 'level_up',       group: 'progress', agoMs: 4 * HOUR,         read: false, message: 'You levelled up to LV.7 🎉' },
  { id: 'n5', type: 'mission_complete',group: 'progress',agoMs: 6 * HOUR,         read: true,  message: 'Daily mission complete — you earned +50 XP' },
  { id: 'n6', type: 'clan_invite',    group: 'social',   agoMs: DAY + 2 * HOUR,   read: false, actionable: 'accept_decline', message: "You've been invited to join Neon Knights" },
  { id: 'n7', type: 'friend_accepted',group: 'social',   agoMs: DAY + 5 * HOUR,   read: true,  message: 'GhostDash accepted your friend request' },
  { id: 'n8', type: 'daily_cap',      group: 'progress', agoMs: 3 * DAY,          read: true,  message: "You've hit your daily XP cap. Come back tomorrow!" },
  { id: 'n9', type: 'mission_complete',group: 'progress',agoMs: 4 * DAY,          read: true,  message: 'Daily mission complete — you earned +30 XP' },
];

interface Ctx {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  dismiss: (id: string) => void;
  clearRead: () => void;
  accept: (id: string) => void;
  decline: (id: string) => void;
}

const NotificationsCtx = createContext<Ctx | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(SEED);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const value: Ctx = {
    notifications,
    unreadCount,
    markAllRead: () => setNotifications(ns => ns.map(n => ({ ...n, read: true }))),
    markRead: (id) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n)),
    dismiss: (id) => setNotifications(ns => ns.filter(n => n.id !== id)),
    clearRead: () => setNotifications(ns => ns.filter(n => !n.read)),
    accept: (id) => setNotifications(ns => ns.filter(n => n.id !== id)),
    decline: (id) => setNotifications(ns => ns.filter(n => n.id !== id)),
  };

  return <NotificationsCtx.Provider value={value}>{children}</NotificationsCtx.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationsCtx);
  if (!ctx) throw new Error('useNotifications must be used inside NotificationsProvider');
  return ctx;
}

// Helpers
export function timeAgo(ms: number) {
  const m = Math.floor(ms / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function dayBucket(ms: number): 'Today' | 'Yesterday' | 'Earlier' {
  if (ms < DAY) return 'Today';
  if (ms < 2 * DAY) return 'Yesterday';
  return 'Earlier';
}
