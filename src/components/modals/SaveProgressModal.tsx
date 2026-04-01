import { Link } from 'react-router-dom';
import { Shield, Trophy, Globe, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGuest } from '@/contexts/GuestContext';

export function SaveProgressModal() {
  const { showSaveProgressModal, setShowSaveProgressModal, displayXp } = useGuest();

  const benefits = [
    { icon: Shield, label: 'Cross-device sync', desc: 'Play on any device, keep your progress' },
    { icon: Trophy, label: 'Global leaderboards', desc: 'Claim your rank and compete worldwide' },
    { icon: Globe, label: 'Permanent username', desc: 'Stand out with your unique gamertag' },
  ];

  return (
    <Dialog open={showSaveProgressModal} onOpenChange={setShowSaveProgressModal}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-xl text-foreground flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Save Your Progress
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            You've earned <span className="text-primary font-bold">{displayXp} XP</span> as a guest. 
            Create a free account to keep it forever.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {benefits.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/auth?redirect=/" onClick={() => setShowSaveProgressModal(false)}>
            <Button className="w-full bg-primary hover:bg-primary/90 neon-glow-primary gap-2">
              <UserPlus className="h-4 w-4" />
              Create Free Account
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => setShowSaveProgressModal(false)}
            className="text-muted-foreground"
          >
            Continue as Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
