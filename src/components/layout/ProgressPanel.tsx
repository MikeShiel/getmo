import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DailyObjectives } from '@/components/rewards/DailyObjectives';

interface ProgressPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgressPanel({ open, onOpenChange }: ProgressPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogTitle className="sr-only">Daily Missions</DialogTitle>
        <DailyObjectives />
      </DialogContent>
    </Dialog>
  );
}