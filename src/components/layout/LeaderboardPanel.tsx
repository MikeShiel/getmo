import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Gamepad2 } from 'lucide-react';
import { GlobalLeaderboard } from '@/components/rewards/GlobalLeaderboard';
import { GameLeaderboard } from '@/components/rewards/GameLeaderboard';

interface LeaderboardPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaderboardPanel({ open, onOpenChange }: LeaderboardPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogTitle className="sr-only">Leaderboards</DialogTitle>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="global" className="gap-2">
              <Globe className="h-4 w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="game" className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Game
            </TabsTrigger>
          </TabsList>
          <TabsContent value="global" className="mt-4">
            <GlobalLeaderboard />
          </TabsContent>
          <TabsContent value="game" className="mt-4">
            <GameLeaderboard />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}