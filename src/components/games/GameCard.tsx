import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { Game } from '@/data/mockGames';
import { useTheme } from '@/contexts/ThemeContext';

interface GameCardProps {
  game: Game;
  size?: 'sm' | 'md' | 'lg';
}

export function GameCard({ game, size = 'md' }: GameCardProps) {
  const { t } = useTheme();

  const sizeClasses = {
    sm: 'w-40',
    md: 'w-56',
    lg: 'w-72'
  };

  const imageHeights = {
    sm: 'h-24',
    md: 'h-32',
    lg: 'h-40'
  };

  return (
    <Link 
      to={`/game/${game.id}`}
      className={`game-card glass-card flex-shrink-0 ${sizeClasses[size]} group cursor-pointer`}
    >
      {/* Thumbnail */}
      <div className={`relative ${imageHeights[size]} overflow-hidden`}>
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-primary rounded-full p-3 neon-glow-cyan">
            <Play className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-2 left-2">
          {game.is_free ? (
            <span className="badge-free">{t('game.free')}</span>
          ) : (
            <span className="badge-premium">{t('game.premium')}</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">{game.genre}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs text-muted-foreground">{game.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
