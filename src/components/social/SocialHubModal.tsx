import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield } from 'lucide-react';
import { useSocial } from './SocialContext';
import { FriendsTab } from './FriendsTab';
import { ClansTab } from './ClansTab';

interface SocialHubModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SocialHubModal({ open, onOpenChange }: SocialHubModalProps) {
  const { friendRequests } = useSocial();
  const [activeTab, setActiveTab] = useState('friends');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden glass-card border-primary/30 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <Users className="h-5 w-5 text-primary" />
            Social Hub
          </DialogTitle>
          <DialogDescription>
            Connect with friends, join clans, and track achievements
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="friends" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              Friends
              {friendRequests.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
                  {friendRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="clans" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              Clans
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="friends" className="mt-0">
              <FriendsTab />
            </TabsContent>
            <TabsContent value="clans" className="mt-0">
              <ClansTab />
            </TabsContent>
            <TabsContent value="achievements" className="mt-0">
              <AchievementsTab />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
