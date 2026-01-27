import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/data/mockGames';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroSectionProps {
  game: Game;
}

export function HeroSection({ game }: HeroSectionProps) {
  const { t } = useTheme();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Featured Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-primary font-medium">Featured Game</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 neon-text-cyan">
            {game.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-muted-foreground">{game.genre}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{game.publisher}</span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-muted-foreground">{game.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
            {game.description}
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            <Link to={`/game/${game.id}`}>
              <Button 
                size="lg" 
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan text-lg px-8"
              >
                <Play className="h-5 w-5 fill-current" />
                {t('home.hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
