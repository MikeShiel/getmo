import { useState } from 'react';
import { Gamepad2, Download, Clock, Coins, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayAndEarn } from './PlayAndEarnContext';
import { RedirectionModal } from './RedirectionModal';

interface OfferGame {
  id: string;
  title: string;
  category: string;
  tokens: number;
  requirement: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const offerGames: OfferGame[] = [
  {
    id: 'offer-1',
    title: 'Merge Kingdom',
    category: 'Puzzle',
    tokens: 250,
    requirement: 'Reach Level 10',
    image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=200',
    difficulty: 'Easy'
  },
  {
    id: 'offer-2',
    title: 'Battle Royale X',
    category: 'Action',
    tokens: 500,
    requirement: 'Win 3 matches',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200',
    difficulty: 'Medium'
  },
  {
    id: 'offer-3',
    title: 'Farm Empire',
    category: 'Simulation',
    tokens: 350,
    requirement: 'Build 5 structures',
    image: 'https://images.unsplash.com/photo-1558023784-f8341393cb06?w=200',
    difficulty: 'Easy'
  },
  {
    id: 'offer-4',
    title: 'Space Raiders',
    category: 'Shooter',
    tokens: 750,
    requirement: 'Complete Chapter 1',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?w=200',
    difficulty: 'Hard'
  },
  {
    id: 'offer-5',
    title: 'Candy Blast',
    category: 'Casual',
    tokens: 150,
    requirement: 'Clear 20 levels',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200',
    difficulty: 'Easy'
  },
  {
    id: 'offer-6',
    title: 'Dragon Quest',
    category: 'RPG',
    tokens: 600,
    requirement: 'Defeat first boss',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=200',
    difficulty: 'Medium'
  },
  {
    id: 'offer-7',
    title: 'Speed Racer Pro',
    category: 'Racing',
    tokens: 400,
    requirement: 'Win 5 races',
    image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=200',
    difficulty: 'Medium'
  },
  {
    id: 'offer-8',
    title: 'Trivia Master',
    category: 'Trivia',
    tokens: 200,
    requirement: 'Answer 50 questions',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=200',
    difficulty: 'Easy'
  }
];

export function EarningHub() {
  const { tokens } = usePlayAndEarn();
  const [selectedGame, setSelectedGame] = useState<OfferGame | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePlayClick = (game: OfferGame) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-card p-6 lg:p-8">
      {/* Header with Wallet */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-secondary to-primary">
            <Gamepad2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Earning Hub</h3>
            <p className="text-sm text-muted-foreground">Play games, earn tokens</p>
          </div>
        </div>
        
        {/* Wallet Display */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 neon-glow-secondary">
          <Coins className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-xs text-muted-foreground">Your Balance</p>
            <p className="text-lg font-bold text-secondary">{tokens.toLocaleString()} Tokens</p>
          </div>
        </div>
      </div>

      {/* Offerwall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offerGames.map((game) => (
          <div 
            key={game.id}
            className="group relative rounded-xl overflow-hidden bg-muted/30 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
          >
            {/* Game Image */}
            <div className="relative h-28 overflow-hidden">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Token Badge */}
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-xs font-bold">
                <Coins className="h-3 w-3" />
                +{game.tokens}
              </div>
              
              {/* Difficulty Badge */}
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty}
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="font-semibold text-foreground truncate">{game.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{game.category}</p>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <Clock className="h-3 w-3" />
                <span>{game.requirement}</span>
              </div>

              <Button 
                size="sm" 
                className="w-full gap-2 bg-primary hover:bg-primary/90"
                onClick={() => handlePlayClick(game)}
              >
                <Download className="h-4 w-4" />
                Play & Earn
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Redirection Modal */}
      <RedirectionModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        game={selectedGame}
      />
    </div>
  );
}
