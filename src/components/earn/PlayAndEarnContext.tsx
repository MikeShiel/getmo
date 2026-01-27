import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface RewardActivity {
  id: string;
  username: string;
  reward: string;
  amount: number;
  timestamp: Date;
}

interface PendingReward {
  gameId: string;
  gameName: string;
  tokens: number;
  minutesRequired: number;
  startTime: Date;
}

interface PlayAndEarnContextType {
  tokens: number;
  addTokens: (amount: number) => void;
  subtractTokens: (amount: number) => boolean;
  rewardHistory: RewardActivity[];
  pendingRewards: PendingReward[];
  addPendingReward: (reward: PendingReward) => void;
  completePendingReward: (gameId: string) => void;
  communityProgress: number;
  communityGoal: number;
}

const PlayAndEarnContext = createContext<PlayAndEarnContextType | undefined>(undefined);

// Mock usernames for live feed
const mockUsernames = [
  'GamerX', 'NeonNinja', 'PixelPro', 'StarRunner', 'CryptoKing', 
  'LunaPlay', 'TurboMax', 'ShadowByte', 'NovaStrike', 'ZenMaster',
  'BlazeFury', 'IceQueen', 'ThunderBolt', 'RocketRider', 'MysticWolf'
];

const mockRewards = ['$5 Amazon', '$10 PSN', '$5 Xbox', '$10 Zara', '$15 Steam', '$5 Spotify'];

export function PlayAndEarnProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState(10000); // Starting with 10,000 tokens for testing
  const [rewardHistory, setRewardHistory] = useState<RewardActivity[]>(() => {
    // Generate initial mock activities
    const initial: RewardActivity[] = [];
    for (let i = 0; i < 10; i++) {
      initial.push({
        id: `mock-${i}`,
        username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
        reward: mockRewards[Math.floor(Math.random() * mockRewards.length)],
        amount: [5, 10, 15, 20][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - Math.random() * 60000 * 60) // Last hour
      });
    }
    return initial;
  });
  const [pendingRewards, setPendingRewards] = useState<PendingReward[]>([]);
  const [communityProgress] = useState(1250);
  const [communityGoal] = useState(5000);

  // Simulate live feed updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: RewardActivity = {
        id: `live-${Date.now()}`,
        username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
        reward: mockRewards[Math.floor(Math.random() * mockRewards.length)],
        amount: [5, 10, 15, 20][Math.floor(Math.random() * 4)],
        timestamp: new Date()
      };
      setRewardHistory(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  }, []);

  const addTokens = useCallback((amount: number) => {
    setTokens(prev => prev + amount);
  }, []);

  const subtractTokens = useCallback((amount: number): boolean => {
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  }, [tokens]);

  const addPendingReward = useCallback((reward: PendingReward) => {
    setPendingRewards(prev => [...prev, reward]);
  }, []);

  const completePendingReward = useCallback((gameId: string) => {
    const reward = pendingRewards.find(r => r.gameId === gameId);
    if (reward) {
      setTokens(prev => prev + reward.tokens);
      setPendingRewards(prev => prev.filter(r => r.gameId !== gameId));
    }
  }, [pendingRewards]);

  return (
    <PlayAndEarnContext.Provider value={{
      tokens,
      addTokens,
      subtractTokens,
      rewardHistory,
      pendingRewards,
      addPendingReward,
      completePendingReward,
      communityProgress,
      communityGoal
    }}>
      {children}
    </PlayAndEarnContext.Provider>
  );
}

export function usePlayAndEarn() {
  const context = useContext(PlayAndEarnContext);
  if (!context) {
    throw new Error('usePlayAndEarn must be used within a PlayAndEarnProvider');
  }
  return context;
}
