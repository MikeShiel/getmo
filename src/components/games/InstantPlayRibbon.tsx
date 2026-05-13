import { useNavigate } from 'react-router-dom';
import { Play, Shuffle } from 'lucide-react';
import { Game } from '@/data/mockGames';

interface Props {
  featuredGame?: Game;
  freeGames?: Game[];
}

export function InstantPlayRibbon({ featuredGame, freeGames = [] }: Props) {
  const navigate = useNavigate();

  const playFeatured = () => {
    if (featuredGame) navigate(`/game/${featuredGame.id}`);
  };

  const playRandom = () => {
    if (freeGames.length === 0) return;
    const idx = Math.floor(Math.random() * freeGames.length);
    navigate(`/game/${freeGames[idx].id}`);
  };

  return (
    <section
      className="w-full"
      style={{
        background: 'linear-gradient(to right, #1A1040, #0D0B1E)',
        height: 64,
      }}
    >
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <button
            onClick={playFeatured}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#7C3AED' }}
          >
            <Play className="w-4 h-4" fill="currentColor" />
            <span>Quick Picks</span>
          </button>
          <button
            onClick={playRandom}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Play Random Game</span>
            <span className="sm:hidden">Random</span>
          </button>
      </div>
    </section>
  );
}