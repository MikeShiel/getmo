import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useNotifications } from '@/components/notifications/NotificationsContext';

export type FriendStatus = 'online' | 'in-game' | 'offline';
export interface Friend { id: string; username: string; level: number; status: FriendStatus; game?: string; lastSeenMin?: number; }
export interface Incoming { id: string; username: string; level: number; agoMin: number; }
export interface Outgoing { id: string; username: string; level: number; agoMin: number; }
export interface Blocked { id: string; username: string; level: number; }
export interface SearchUser { id: string; username: string; level: number; mutualFriends: number; }

const SEED_FRIENDS: Friend[] = [
  { id: 'f1', username: 'NeonRider99', level: 24, status: 'online' },
  { id: 'f2', username: 'PixelQueen',  level: 18, status: 'in-game', game: 'Subway Surfers' },
  { id: 'f3', username: 'BoltZap',     level: 31, status: 'in-game', game: 'Bouncemasters' },
  { id: 'f4', username: 'GhostDash',   level: 12, status: 'offline', lastSeenMin: 45 },
  { id: 'f5', username: 'CometKid',    level: 9,  status: 'offline', lastSeenMin: 60 * 6 },
  { id: 'f6', username: 'StarChaser',  level: 22, status: 'offline', lastSeenMin: 60 * 24 * 2 },
];

const SEED_INCOMING: Incoming[] = [
  { id: 'i1', username: 'MysticGamer', level: 14, agoMin: 5 },
  { id: 'i2', username: 'VoltViper',   level: 19, agoMin: 60 * 3 },
];

const SEED_OUTGOING: Outgoing[] = [
  { id: 'o1', username: 'ZenithRogue', level: 27, agoMin: 60 * 8 },
];

const friendReqNotifId = (incomingId: string) => `nfr-${incomingId}`;

interface FriendsCtx {
  friends: Friend[];
  incoming: Incoming[];
  outgoing: Outgoing[];
  blocked: Blocked[];
  sendRequest: (u: SearchUser) => void;
  acceptIncoming: (incomingId: string) => void;
  declineIncoming: (incomingId: string) => void;
  blockIncoming: (incomingId: string) => void;
  cancelOutgoing: (outgoingId: string) => void;
  removeFriend: (friendId: string) => void;
  blockFriend: (friendId: string) => void;
  unblock: (blockedId: string) => void;
}

const Ctx = createContext<FriendsCtx | null>(null);

export function FriendsProvider({ children }: { children: ReactNode }) {
  const notifs = useNotifications();
  const [friends, setFriends] = useState<Friend[]>(SEED_FRIENDS);
  const [incoming, setIncoming] = useState<Incoming[]>(SEED_INCOMING);
  const [outgoing, setOutgoing] = useState<Outgoing[]>(SEED_OUTGOING);
  const [blocked, setBlocked] = useState<Blocked[]>([]);

  // Seed friend_request notifications for each incoming request (once)
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    SEED_INCOMING.forEach(inc => {
      notifs.addNotification({
        id: friendReqNotifId(inc.id),
        type: 'friend_request',
        group: 'social',
        agoMs: inc.agoMin * 60 * 1000,
        read: false,
        actionable: 'accept_decline',
        message: `${inc.username} wants to be your friend.`,
        username: inc.username,
        requestId: inc.id,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendRequest = (u: SearchUser) => {
    const id = 'o' + Date.now();
    setOutgoing(o => [{ id, username: u.username, level: u.level, agoMin: 0 }, ...o]);
    // Spec: a "friend request received" notification is created for the recipient.
    // Single-user mock: simulate the recipient accepting after a short delay so the
    // sender (this user) observes the "accepted" notification + bell badge increment.
    window.setTimeout(() => {
      setOutgoing(o => o.filter(x => x.id !== id));
      setFriends(f => [
        ...f,
        { id: 'f' + Date.now(), username: u.username, level: u.level, status: 'online' },
      ]);
      notifs.addNotification({
        id: 'nfa-' + Date.now(),
        type: 'friend_accepted',
        group: 'social',
        agoMs: 0,
        read: false,
        message: `${u.username} accepted your friend request.`,
        username: u.username,
      });
    }, 6000);
  };

  const acceptIncoming = (incomingId: string) => {
    const inc = incoming.find(i => i.id === incomingId);
    if (!inc) return;
    setIncoming(i => i.filter(x => x.id !== incomingId));
    setFriends(f => [...f, { id: 'f' + Date.now(), username: inc.username, level: inc.level, status: 'online' }]);
    // Morph the linked notification (if any) into the "now friends" state
    notifs.updateNotification(friendReqNotifId(incomingId), {
      message: `You are now friends with ${inc.username}.`,
      actionable: undefined,
      read: true,
    });
    // The original sender (the other user) gets a "friend request accepted" notification.
    // We surface it on the bell so the wired flow is observable in this mock.
    notifs.addNotification({
      id: 'nfa-' + Date.now(),
      type: 'friend_accepted',
      group: 'social',
      agoMs: 0,
      read: false,
      message: `${inc.username} accepted your friend request.`,
      username: inc.username,
    });
  };

  const declineIncoming = (incomingId: string) => {
    setIncoming(i => i.filter(x => x.id !== incomingId));
    notifs.dismiss(friendReqNotifId(incomingId));
  };

  const blockIncoming = (incomingId: string) => {
    const inc = incoming.find(i => i.id === incomingId);
    if (!inc) return;
    setIncoming(i => i.filter(x => x.id !== incomingId));
    setBlocked(b => [...b, { id: inc.id, username: inc.username, level: inc.level }]);
    notifs.dismiss(friendReqNotifId(incomingId));
  };

  const cancelOutgoing = (outgoingId: string) =>
    setOutgoing(o => o.filter(x => x.id !== outgoingId));

  const removeFriend = (friendId: string) =>
    setFriends(fs => fs.filter(x => x.id !== friendId));

  const blockFriend = (friendId: string) => {
    const f = friends.find(x => x.id === friendId);
    if (!f) return;
    setFriends(fs => fs.filter(x => x.id !== friendId));
    setBlocked(bs => [...bs, { id: f.id, username: f.username, level: f.level }]);
  };

  const unblock = (blockedId: string) =>
    setBlocked(bs => bs.filter(x => x.id !== blockedId));

  return (
    <Ctx.Provider
      value={{
        friends, incoming, outgoing, blocked,
        sendRequest, acceptIncoming, declineIncoming, blockIncoming,
        cancelOutgoing, removeFriend, blockFriend, unblock,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useFriends() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useFriends must be used inside FriendsProvider');
  return c;
}