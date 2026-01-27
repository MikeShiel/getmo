import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Maximize2, Minimize2, Volume2, VolumeX, ArrowLeft, Star, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/games/GameCard';
import { SubscribeModal } from '@/components/modals/SubscribeModal';
import { ExitIntentModal } from '@/components/modals/ExitIntentModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { getGameById, getGamesByGenre, Game } from '@/data/mockGames';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTheme();
  const { user, profile } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const foundGame = getGameById(id);
      setGame(foundGame || null);
      
      if (foundGame) {
        const related = getGamesByGenre(foundGame.genre, foundGame.id);
        setRecommendedGames(related);
      }
    }
  }, [id]);

  useEffect(() => {
    if (game) {
      // Determine if user can play
      if (game.is_free) {
        setCanPlay(true);
      } else if (profile?.is_premium) {
        setCanPlay(true);
      } else if (user) {
        // Registered but not premium - show subscribe modal when trying to play
        setCanPlay(false);
      } else {
        // Guest - can't play premium games
        setCanPlay(false);
      }
    }
  }, [game, user, profile]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitModal && !showSubscribeModal) {
        setShowExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitModal, showSubscribeModal]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handlePlayClick = () => {
    if (!canPlay && !game?.is_free) {
      if (user) {
        setShowSubscribeModal(true);
      } else {
        navigate('/auth');
      }
    }
  };

  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter={isFullscreen}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Player */}
            <div 
              ref={containerRef}
              className="relative rounded-xl overflow-hidden glass-card aspect-video"
            >
              {canPlay ? (
                <iframe
                  ref={iframeRef}
                  src={game.game_url}
                  className="w-full h-full"
                  title={game.title}
                  allow="fullscreen; autoplay"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="relative z-10 text-center p-8">
                    <h3 className="text-2xl font-bold mb-4 neon-text-pink">
                      {game.is_free ? t('auth.login') : t('subscribe.title')}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {game.is_free 
                        ? 'Sign in to play this free game'
                        : 'Subscribe to unlock this premium game'
                      }
                    </p>
                    <Button 
                      onClick={handlePlayClick}
                      className="bg-primary hover:bg-primary/90 neon-glow-cyan"
                    >
                      {game.is_free ? t('auth.login') : t('subscribe.cta')}
                    </Button>
                  </div>
                </div>
              )}

              {/* Controls */}
              {canPlay && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-display font-bold neon-text-cyan">
                    {game.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <span>{game.publisher}</span>
                    <span>•</span>
                    <span>{game.genre}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-xl font-bold">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Users className="h-4 w-4" />
                    <span>{(game.play_count / 1000).toFixed(0)}K plays</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>

              {/* Screenshots */}
              {game.screenshots.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Screenshots</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {game.screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedScreenshot(index)}
                        className={`rounded-lg overflow-hidden border-2 transition-all ${
                          selectedScreenshot === index 
                            ? 'border-primary neon-glow-cyan' 
                            : 'border-transparent hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Games */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">{t('game.recommended')}</h3>
              <div className="space-y-4">
                {recommendedGames.map((recGame) => (
                  <GameCard key={recGame.id} game={recGame} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubscribeModal 
        open={showSubscribeModal} 
        onOpenChange={setShowSubscribeModal} 
      />
      <ExitIntentModal 
        open={showExitModal} 
        onOpenChange={setShowExitModal}
        currentGameId={game.id}
      />
    </Layout>
  );
}
