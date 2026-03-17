import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { UserXPHeader } from '@/components/rewards/UserXPHeader';
import { XPEventFeed } from '@/components/rewards/XPEventFeed';
import { XPRulesReference } from '@/components/rewards/XPRulesReference';
import { DailyObjectives } from '@/components/rewards/DailyObjectives';
import { GlobalLeaderboard } from '@/components/rewards/GlobalLeaderboard';
import { GameLeaderboard } from '@/components/rewards/GameLeaderboard';
import { MyProgress } from '@/components/rewards/MyProgress';
import { SocialTab } from '@/components/social/SocialTab';
import { Trophy, LayoutGrid, Gamepad2, User, Users } from 'lucide-react';

type Tab = 'overview' | 'global' | 'game' | 'progress' | 'social';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'global', label: 'Global Leaderboard', icon: <Trophy className="h-4 w-4" /> },
  { id: 'game', label: 'Game Leaderboard', icon: <Gamepad2 className="h-4 w-4" /> },
  { id: 'progress', label: 'My Progress', icon: <User className="h-4 w-4" /> },
  { id: 'social', label: 'Social', icon: <Users className="h-4 w-4" /> },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* XP Header */}
        <UserXPHeader />

        {/* Tab Navigation Bar */}
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <nav className="flex gap-0 overflow-x-auto scrollbar-hide" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground/80'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-primary' : ''}>{tab.icon}</span>
                  {tab.label}
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'global' && <GlobalTab />}
          {activeTab === 'game' && <GameTab />}
          {activeTab === 'progress' && <MyProgress />}
          {activeTab === 'social' && <SocialTab />}
        </div>
      </div>
    </Layout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <DailyObjectives />
        </div>
        <div className="lg:col-span-7">
          <XPEventFeed />
        </div>
      </div>
      <XPRulesReference />
    </div>
  );
}

function GlobalTab() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <GlobalLeaderboard />
    </div>
  );
}

function GameTab() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <GameLeaderboard />
    </div>
  );
}
