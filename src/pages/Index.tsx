import { useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/games/HeroBanner';
import { Link } from 'react-router-dom';
import {
  getFeaturedGames,
  getFreeGames,
  getTrendingGames,
  getMostLovedGames,
  mockGames,
  Game,
} from '@/data/mockGames';

const CATEGORY_PILLS = [
  { label: 'For You', active: true },
  { label: '🔥 Hot' },
  { label: '✈️ Action' },
  { label: '🧭 Adventure' },
  { label: '🎮 Arcade' },
  { label: '🎲 Board' },
  { label: '🧠 Brain' },
  { label: '🎰 Casino' },
];

const CATEGORIES = [
  { label: 'Action', image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop' },
  { label: 'Adventure', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop' },
  { label: 'Arcade', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop' },
  { label: 'Puzzle', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop' },
  { label: 'Casual', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=300&fit=crop' },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-3 px-4">
      <h2 className="text-[20px] font-bold text-white">{title}</h2>
      <Link to="/" className="text-[#7C3AED] text-sm font-semibold">
        VIEW ALL
      </Link>
    </div>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children}
    </div>
  );
}

function SquareGameCard({ game, size = 90 }: { game: Game; size?: number }) {
  return (
    <Link to={`/game/${game.id}`} className="flex-shrink-0" style={{ width: size }}>
      <div
        className="rounded-xl overflow-hidden bg-zinc-900"
        style={{ width: size, height: size }}
      >
        <img
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
          decoding="async"
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-white text-[12px] font-medium mt-2 truncate">{game.title}</p>
      <p className="text-zinc-500 text-[11px] truncate">{game.genre}</p>
    </Link>
  );
}

function GameSection({ title, games, size = 90 }: { title: string; games: Game[]; size?: number }) {
  return (
    <section className="py-4">
      <SectionHeader title={title} />
      <ScrollRow>
        {games.slice(0, 7).map((g) => (
          <SquareGameCard key={g.id} game={g} size={size} />
        ))}
      </ScrollRow>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-4">
      <h2 className="text-[20px] font-bold text-white mb-3 px-4">Categories</h2>
      <ScrollRow>
        {CATEGORIES.map((c) => (
          <div
            key={c.label}
            className="relative flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: 140, height: 90 }}
          >
            <img
              src={c.image}
              alt={c.label}
              loading="lazy"
              decoding="async"
              width={140}
              height={90}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute bottom-2 left-3 text-white font-bold text-sm">
              {c.label}
            </span>
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}

function CategoryPills() {
  return (
    <section className="py-4">
      <ScrollRow>
        {CATEGORY_PILLS.map((p) => (
          <button
            key={p.label}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap ${
              p.active
                ? 'bg-white text-black'
                : 'bg-zinc-900 text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </ScrollRow>
    </section>
  );
}

const BRAIN_GENRES = ['Puzzle', 'Strategy'];
const PUZZLE_GENRES = ['Puzzle', 'Roguelike'];

const Index = () => {
  const { heroFeaturedGame, freeGames, trendingGames, brainGames, puzzleGames, kidsGames } = useMemo(() => {
    const featured = getFeaturedGames();
    const free = getFreeGames();
    const trending = getTrendingGames();
    const loved = getMostLovedGames();
    return {
      heroFeaturedGame: featured[0] || trending[0],
      freeGames: free,
      trendingGames: trending,
      brainGames: mockGames.filter((g) => BRAIN_GENRES.includes(g.genre)),
      puzzleGames: mockGames.filter((g) => PUZZLE_GENRES.includes(g.genre)),
      kidsGames: loved,
    };
  }, []);

  return (
    <Layout>
      <HeroBanner featuredGame={heroFeaturedGame} freeGames={freeGames} />

      <div className="bg-black">
        <CategoryPills />
        <GameSection title="Play Anywhere" games={freeGames} size={90} />
        <GameSection title="Brain Games" games={brainGames} size={90} />
        <GameSection title="Trending Now" games={trendingGames} size={110} />
        <CategoriesSection />
        <GameSection title="Puzzle Games" games={puzzleGames} size={90} />
        <GameSection title="Kids' Games" games={kidsGames} size={90} />
        <div className="h-8" />
      </div>
    </Layout>
  );
};

export default Index;
