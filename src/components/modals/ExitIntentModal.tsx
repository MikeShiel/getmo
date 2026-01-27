import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { mockGames, Game } from '@/data/mockGames';

interface ExitIntentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGameId?: string;
}

export function ExitIntentModal({ open, onOpenChange, currentGameId }: ExitIntentModalProps) {
  const { t } = useTheme();
  const navigate = useNavigate();
  const [suggestedGame, setSuggestedGame] = useState<Game | null>(null);

  useEffect(() => {
    if (open) {
      // Get a random game that's not the current one
      const availableGames = mockGames.filter(game => game.id !== currentGameId);
      const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
      setSuggestedGame(randomGame);
    }
  }, [open, currentGameId]);

  const handleNextGame = () => {
    if (suggestedGame) {
      onOpenChange(false);
      navigate(`/game/${suggestedGame.id}`);
    }
  };

  const handleKeepPlaying = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-secondary/30 max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-secondary opacity-50 animate-pulse" />
              <div className="relative bg-secondary p-4 rounded-full">
                <Gamepad2 className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-display text-center neon-text-pink">
            {t('exit.title')}
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            {t('exit.subtitle')}
          </p>
        </DialogHeader>

        {/* Suggested Game */}
        {suggestedGame && (
          <div className="my-6 rounded-xl overflow-hidden border border-border/50">
            <div className="relative h-32">
              <img
                src={suggestedGame.thumbnail}
                alt={suggestedGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-2 left-3 right-3">
                <h3 className="font-semibold text-foreground">{suggestedGame.title}</h3>
                <p className="text-xs text-muted-foreground">{suggestedGame.genre}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleNextGame}
            className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-white neon-glow-pink"
          >
            {t('exit.nextGame')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={handleKeepPlaying}
            className="w-full border-primary/50 hover:bg-primary/10"
          >
            {t('exit.keepPlaying')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
