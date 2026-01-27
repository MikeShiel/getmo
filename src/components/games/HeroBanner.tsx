import { Link } from 'react-router-dom';
import { Play, Zap, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/data/mockGames';

interface HeroBannerProps {
  featuredGame?: Game;
}

export function HeroBanner({ featuredGame }: HeroBannerProps) {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Instant Play</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight">
              <span className="text-foreground">Play Games</span>
              <br />
              <span className="neon-text-primary">Right Now</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              No downloads. No waiting. Jump into hundreds of games instantly in your browser.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {featuredGame ? (
                <Link to={`/game/${featuredGame.id}`}>
                  <Button 
                    size="lg" 
                    className="gap-2 bg-primary hover:bg-primary/90 neon-glow-primary text-lg px-8"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Play {featuredGame.title}
                  </Button>
                </Link>
              ) : (
                <Link to="/#games">
                  <Button 
                    size="lg" 
                    className="gap-2 bg-primary hover:bg-primary/90 neon-glow-primary text-lg px-8"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Start Playing
                  </Button>
                </Link>
              )}
              
              <Link to="/#free-games">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 border-secondary/50 hover:bg-secondary/10 text-lg px-8"
                >
                  <Gamepad2 className="h-5 w-5" />
                  Try Free Games
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center md:justify-start">
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-bold text-foreground">100+</p>
                <p className="text-sm text-muted-foreground">Games</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-bold text-foreground">0s</p>
                <p className="text-sm text-muted-foreground">Load Time</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-bold text-secondary">FREE</p>
                <p className="text-sm text-muted-foreground">To Start</p>
              </div>
            </div>
          </div>

          {/* Hero Game Preview */}
          {featuredGame && (
            <div className="flex-1 max-w-md w-full">
              <Link 
                to={`/game/${featuredGame.id}`}
                className="block relative group"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card animated-border">
                  <img
                    src={featuredGame.thumbnail}
                    alt={featuredGame.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary rounded-full p-6 neon-glow-primary transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="h-10 w-10 text-primary-foreground fill-current" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    {featuredGame.is_free ? (
                      <span className="badge-free text-sm">FREE</span>
                    ) : (
                      <span className="badge-premium text-sm">PREMIUM</span>
                    )}
                  </div>
                </div>

                {/* Game title */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Featured Game</p>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {featuredGame.title}
                  </h3>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
