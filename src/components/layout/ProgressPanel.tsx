import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar } from 'lucide-react';
import { MyProgress } from '@/components/rewards/MyProgress';
import { DailyObjectives } from '@/components/rewards/DailyObjectives';

interface ProgressPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgressPanel({ open, onOpenChange }: ProgressPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogTitle className="sr-only">Player Progress</DialogTitle>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="progress" className="gap-2">
              <User className="h-4 w-4" />
              My Progress
            </TabsTrigger>
            <TabsTrigger value="missions" className="gap-2">
              <Calendar className="h-4 w-4" />
              Daily Missions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="progress" className="mt-4">
            <MyProgress />
          </TabsContent>
          <TabsContent value="missions" className="mt-4 max-w-2xl mx-auto">
            <DailyObjectives />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}