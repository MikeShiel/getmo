import { useState } from 'react';
import { Users, Shield } from 'lucide-react';
import { useSocial } from './SocialContext';
import { FriendsTab } from './FriendsTab';
import { ClansTab } from './ClansTab';

type SubTab = 'friends' | 'clans';

const SUB_TABS: { id: SubTab; label: string; icon: React.ReactNode }[] = [
  { id: 'friends', label: 'Friends', icon: <Users className="h-4 w-4" /> },
  { id: 'clans', label: 'Clans', icon: <Shield className="h-4 w-4" /> },
];

export function SocialTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('friends');
  const { friendRequests } = useSocial();

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Sub-tab navigation */}
      <div className="flex gap-2 mb-6">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-border/50'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === 'friends' && friendRequests.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
                {friendRequests.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        {activeSubTab === 'friends' && <FriendsTab />}
        {activeSubTab === 'clans' && <ClansTab />}
        {activeSubTab === 'achievements' && <AchievementsTab />}
      </div>
    </div>
  );
}
