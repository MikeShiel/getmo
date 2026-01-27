import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, ArrowRight, Play, Gamepad2, Target, Star, Zap } from 'lucide-react';
import { mockGames } from '@/data/mockGames';

interface ChallengeGame {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  points: number;
  played: boolean;
}

export default function PlayAndWin() {
  // Mock state for challenge progress
  const [gamesPlayed, setGamesPlayed] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 1, minutes: 59, seconds: 52 });
  const challengeGoal = 10;

  // Transform mock games into challenge games
  const [challengeGames, setChallengeGames] = useState<ChallengeGame[]>(() => 
    mockGames.slice(0, 8).map((game, index) => ({
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      category: game.genre || 'Action',
      points: 1,
      played: index < 3 // First 3 are already played
    }))
  );

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: typeof timeRemaining) => {
    const h = String(time.hours).padStart(2, '0');
    const m = String(time.minutes).padStart(2, '0');
    const s = String(time.seconds).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handlePlayGame = (gameId: string) => {
    setChallengeGames(prev => 
      prev.map(game => 
        game.id === gameId ? { ...game, played: true } : game
      )
    );
    setGamesPlayed(prev => Math.min(prev + 1, challengeGoal));
  };

  const nextUnplayedGame = challengeGames.find(g => !g.played);
  const gamesRemaining = challengeGoal - gamesPlayed;
  const progressPercent = (gamesPlayed / challengeGoal) * 100;

  return (
    <Layout>
      {/* Sticky Countdown Banner */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-destructive via-destructive/90 to-destructive border-b border-destructive/50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-destructive-foreground" />
              <span className="text-sm font-medium text-destructive-foreground">Daily Challenge Active</span>
            </div>
            <div className="flex items-center gap-2 bg-background/20 px-4 py-1.5 rounded-full">
              <Clock className="h-4 w-4 text-destructive-foreground" />
              <span className="font-mono text-lg font-bold text-destructive-foreground">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Dashboard */}
        <Card className="mb-8 glass-card border-destructive/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-primary/10 -z-10" />
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Progress Circle */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-8 border-muted/30" />
                  {/* Progress ring - using SVG for accurate circular progress */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progressPercent * 5.52} 552`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--destructive))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Center content */}
                  <div className="text-center">
                    <span className="text-6xl font-display font-bold text-foreground">{gamesPlayed}</span>
                    <span className="text-3xl text-muted-foreground">/{challengeGoal}</span>
                    <p className="text-sm text-muted-foreground mt-1">Games Played</p>
                  </div>
                </div>
              </div>

              {/* Progress Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  Daily Challenge
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Play <span className="text-destructive font-bold">{gamesRemaining} more games</span> to unlock your prize!
                </p>

                {/* Linear Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress 
                    value={progressPercent} 
                    className="h-4 bg-muted/50"
                  />
                </div>

                {/* Primary CTA */}
                {nextUnplayedGame ? (
                  <Link to={`/game/${nextUnplayedGame.id}`}>
                    <Button 
                      size="lg" 
                      className="gap-2 bg-foreground hover:bg-foreground/90 text-background text-lg px-8"
                      onClick={() => handlePlayGame(nextUnplayedGame.id)}
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Play Game {gamesPlayed + 1}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    size="lg" 
                    className="gap-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-lg px-8"
                    disabled
                  >
                    <Trophy className="h-5 w-5" />
                    Challenge Complete!
                  </Button>
                )}
              </div>

              {/* Prize Preview */}
              <div className="flex-shrink-0 hidden md:block">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 text-center">
                  <Trophy className="h-12 w-12 text-secondary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Today's Prize</p>
                  <p className="text-xl font-bold text-foreground">$25 Gift Card</p>
                  <p className="text-xs text-secondary mt-2">Random Winner</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenge Games Grid */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">Challenge Games</h2>
          </div>
          <p className="text-muted-foreground mb-6">Play any of these games to earn challenge points</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {challengeGames.map((game) => (
            <Link 
              key={game.id} 
              to={`/game/${game.id}`}
              onClick={() => !game.played && handlePlayGame(game.id)}
              className={`group relative block ${game.played ? 'opacity-60' : ''}`}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-card border border-border/50 hover:border-primary/50 transition-all">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  {/* Points Badge */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                    <Zap className="h-3 w-3" />
                    +{game.points} Point
                  </div>
                  
                  {/* Category Badge */}
                  <div className="px-2 py-1 rounded-full bg-muted/80 backdrop-blur-sm text-xs font-medium text-foreground">
                    {game.category}
                  </div>
                </div>

                {/* Played Checkmark */}
                {game.played && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Star className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                )}
                
                {/* Game Title */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-sm font-medium text-white truncate">{game.title}</p>
                </div>

                {/* Play Button Overlay */}
                {!game.played && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center neon-glow-primary">
                      <Play className="h-6 w-6 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Prize Info Footer */}
        <div className="mt-8 p-6 rounded-xl glass-card border border-border/50 text-center">
          <Target className="h-8 w-8 text-secondary mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-2">How It Works</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete the daily challenge by playing {challengeGoal} games before the timer runs out. 
            All participants who complete the challenge are entered into a random drawing for today's prize!
          </p>
        </div>
      </div>
    </Layout>
  );
}
