import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Types
interface MockFriend {
  id: string;
  username: string;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'in-game';
  currentGame?: string;
  lastSeen?: Date;
}

interface MockClan {
  id: string;
  name: string;
  tag: string;
  logoColor: string;
  memberCount: number;
  description: string;
  isRecruiting: boolean;
}

interface FriendRequest {
  id: string;
  from: string;
  timestamp: Date;
}

interface SocialContextType {
  // Friends
  friends: MockFriend[];
  friendRequests: FriendRequest[];
  pendingInvites: string[];
  sendClanInvite: (friendId: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
  searchUsers: (query: string) => Promise<MockFriend | null>;
  
  // Clans
  availableClans: MockClan[];
  currentClan: MockClan | null;
  clanMembershipStatus: Record<string, 'none' | 'pending' | 'member'>;
  joinClan: (clanId: string) => Promise<void>;
  leaveClan: () => void;
  
  // Notifications
  hasNotification: boolean;
  clearNotifications: () => void;
  
  // Social Hub state
  isSocialHubOpen: boolean;
  openSocialHub: () => void;
  closeSocialHub: () => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

// Mock data
const mockFriends: MockFriend[] = [
  { id: 'f1', username: 'ShadowPlayer', status: 'online', currentGame: 'Neon Rider' },
  { id: 'f2', username: 'NeonPulse', status: 'online', currentGame: 'Cyber Puzzle' },
  { id: 'f3', username: 'PixelWarrior', status: 'offline', lastSeen: new Date(Date.now() - 3600000) },
  { id: 'f4', username: 'StarChaser', status: 'in-game', currentGame: 'Space Shooter X' },
  { id: 'f5', username: 'BlazeFury', status: 'offline', lastSeen: new Date(Date.now() - 86400000) },
];

const mockClans: MockClan[] = [
  { 
    id: 'c1', 
    name: 'Neon Warriors', 
    tag: 'NEON', 
    logoColor: 'from-purple-500 to-pink-500',
    memberCount: 47, 
    description: 'Elite gamers dominating the leaderboards',
    isRecruiting: true
  },
  { 
    id: 'c2', 
    name: 'Shadow Legion', 
    tag: 'SHDW', 
    logoColor: 'from-gray-600 to-gray-800',
    memberCount: 128, 
    description: 'The largest and most active gaming community',
    isRecruiting: true
  },
  { 
    id: 'c3', 
    name: 'Golden Phoenix', 
    tag: 'GPX', 
    logoColor: 'from-yellow-500 to-orange-500',
    memberCount: 32, 
    description: 'Rising from the ashes to claim victory',
    isRecruiting: true
  },
];

const mockSearchResults: MockFriend[] = [
  { id: 's1', username: 'GhostRider99', status: 'online' },
  { id: 's2', username: 'CyberNinja', status: 'offline', lastSeen: new Date() },
  { id: 's3', username: 'QuantumLeap', status: 'in-game', currentGame: 'Pixel Quest' },
];

export function SocialProvider({ children }: { children: ReactNode }) {
  const [friends] = useState<MockFriend[]>(mockFriends);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [availableClans] = useState<MockClan[]>(mockClans);
  const [currentClan, setCurrentClan] = useState<MockClan | null>(null);
  const [clanMembershipStatus, setClanMembershipStatus] = useState<Record<string, 'none' | 'pending' | 'member'>>({});
  const [hasNotification, setHasNotification] = useState(false);
  const [isSocialHubOpen, setIsSocialHubOpen] = useState(false);

  // Simulate incoming friend request after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFriendRequests([{
        id: 'fr1',
        from: 'MysticGamer',
        timestamp: new Date()
      }]);
      setHasNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sendClanInvite = useCallback((friendId: string) => {
    setPendingInvites(prev => [...prev, friendId]);
    // Simulate invite being sent
    setTimeout(() => {
      // Could show a toast here
    }, 500);
  }, []);

  const acceptFriendRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    if (friendRequests.length <= 1) {
      setHasNotification(false);
    }
  }, [friendRequests.length]);

  const declineFriendRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    if (friendRequests.length <= 1) {
      setHasNotification(false);
    }
  }, [friendRequests.length]);

  const searchUsers = useCallback(async (query: string): Promise<MockFriend | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (query.length < 2) return null;
    
    // Return a random mock result
    const result = mockSearchResults[Math.floor(Math.random() * mockSearchResults.length)];
    return { ...result, username: query.charAt(0).toUpperCase() + query.slice(1) + Math.floor(Math.random() * 100) };
  }, []);

  const joinClan = useCallback(async (clanId: string) => {
    setClanMembershipStatus(prev => ({ ...prev, [clanId]: 'pending' }));
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setClanMembershipStatus(prev => ({ ...prev, [clanId]: 'member' }));
    const clan = availableClans.find(c => c.id === clanId);
    if (clan) {
      setCurrentClan(clan);
    }
  }, [availableClans]);

  const leaveClan = useCallback(() => {
    if (currentClan) {
      setClanMembershipStatus(prev => ({ ...prev, [currentClan.id]: 'none' }));
      setCurrentClan(null);
    }
  }, [currentClan]);

  const clearNotifications = useCallback(() => {
    setHasNotification(false);
  }, []);

  const openSocialHub = useCallback(() => {
    setIsSocialHubOpen(true);
    clearNotifications();
  }, [clearNotifications]);

  const closeSocialHub = useCallback(() => {
    setIsSocialHubOpen(false);
  }, []);

  return (
    <SocialContext.Provider value={{
      friends,
      friendRequests,
      pendingInvites,
      sendClanInvite,
      acceptFriendRequest,
      declineFriendRequest,
      searchUsers,
      availableClans,
      currentClan,
      clanMembershipStatus,
      joinClan,
      leaveClan,
      hasNotification,
      clearNotifications,
      isSocialHubOpen,
      openSocialHub,
      closeSocialHub,
    }}>
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}
