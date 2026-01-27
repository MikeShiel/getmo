import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/data/mockGames';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroSectionProps {
  games: Game[];
}

export function HeroSection({ games }: HeroSectionProps) {
  const { t } = useTheme();

  // Take up to 4 games for the hero grid
  const heroGames = games.slice(0, 4);

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-secondary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground">Featured Games</h2>
        </div>

        {/* Hero Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroGames.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden glass-card"
            >
              {/* Game Thumbnail */}
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  {game.is_free ? (
                    <span className="badge-free">{t('game.free')}</span>
                  ) : (
                    <span className="badge-premium">{t('game.premium')}</span>
                  )}
                </div>

                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary rounded-full p-4 neon-glow-primary transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="h-8 w-8 text-primary-foreground fill-current" />
                  </div>
                </div>

                {/* Game Info */}
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{game.genre}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{game.publisher}</span>
                  </div>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
