import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, X, Trophy } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FeaturedGamesCarousel } from '@/components/games/FeaturedGamesCarousel';
import {
  getFeaturedGames,
  getFreeGames,
  getTrendingGames,
  getGamesByTag,
  mockGames,
  Game,
} from '@/data/mockGames';

/* ----------------------- shared bits ----------------------- */

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[15px] font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <Link to="/" className="text-[11px] font-semibold tracking-wider text-white/50 hover:text-white">
        VIEW ALL
      </Link>
    </div>
  );
}

function SquareTile({ game, size = 'md' }: { game: Game; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'aspect-square' : 'aspect-square';
  return (
    <Link to={`/game/${game.id}`} className="group">
      <div className={`relative ${dim} rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-white/5`}>
        <img
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-white text-[12px] font-medium mt-1.5 truncate">{game.title}</p>
    </Link>
  );
}

function HorizontalGrid({ games, cols = 10 }: { games: Game[]; cols?: number }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {games.slice(0, cols).map((g) => (
        <SquareTile key={g.id} game={g} />
      ))}
    </div>
  );
}

/* ----------------------- Pick your genre (collage) ----------------------- */

function PickYourGenreCollage({ games }: { games: Game[] }) {
  const [big, a, b, c, d, e] = games;
  if (!big) return null;
  return (
    <div className="grid grid-cols-12 gap-3">
      <Link to={`/game/${big.id}`} className="col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden">
        <img src={big.thumbnail} alt={big.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-3 left-4 text-white font-extrabold text-lg">{big.title}</span>
      </Link>
      <div className="col-span-3 grid grid-rows-2 gap-3">
        {[a, b].filter(Boolean).map((g) => (
          <Link key={g.id} to={`/game/${g.id}`} className="relative rounded-2xl overflow-hidden">
            <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
      <div className="col-span-3 grid grid-rows-2 gap-3">
        {[c, d].filter(Boolean).map((g) => (
          <Link key={g.id} to={`/game/${g.id}`} className="relative rounded-2xl overflow-hidden">
            <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover" />
          </Link>
        ))}
        {e && (
          <Link to={`/game/${e.id}`} className="relative rounded-2xl overflow-hidden hidden">
            <img src={e.thumbnail} alt={e.title} className="w-full h-full object-cover" />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ----------------------- Featured big cards ----------------------- */

function FeaturedBigCards({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {games.slice(0, 3).map((g) => (
        <Link key={g.id} to={`/game/${g.id}`} className="group">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          </div>
          <div className="mt-2">
            <p className="text-white font-semibold text-sm">{g.title}</p>
            <p className="text-white/40 text-xs">{g.publisher}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ----------------------- Jump back in (dismissible) ----------------------- */

function JumpBackIn({ games }: { games: Game[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = games.filter((g) => !dismissed.has(g.id)).slice(0, 6);
  if (visible.length === 0) return null;
  return (
    <section className="px-6 md:px-8 py-6">
      <h2 className="text-[15px] font-bold text-white mb-3">Jump back in</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {visible.map((g) => (
          <div key={g.id} className="relative shrink-0" style={{ width: 110 }}>
            <button
              onClick={() => setDismissed((s) => new Set(s).add(g.id))}
              className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:scale-110 transition"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <Link to={`/game/${g.id}`}>
              <div className="aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10">
                <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-xs font-medium mt-1.5 truncate">{g.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------- Top Players & Highscore card ----------------------- */

function TopPlayersCard({ game }: { game: Game }) {
  const rows = [
    { name: 'Hexcomtre', score: '61,123' },
    { name: 'BleckOpz', score: '45,219' },
    { name: 'JIMHvR', score: '30,332' },
  ];
  return (
    <div className="rounded-2xl overflow-hidden bg-[hsl(268_30%_14%)] ring-1 ring-white/5">
      <div className="aspect-video">
        <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-semibold mb-2">{game.title}</p>
        <div className="space-y-1.5">
          {rows.map((r, i) => (
            <div key={r.name} className="flex items-center gap-2 text-[11px]">
              <Trophy className={`w-3 h-3 ${i === 0 ? 'text-secondary' : 'text-white/30'}`} />
              <span className="text-white/80 flex-1 truncate">{r.name}</span>
              <span className="text-white/50">{r.score}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 h-8 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90">
          Beat their score
        </button>
      </div>
    </div>
  );
}

/* ----------------------- Pick-your-genre icons row ----------------------- */

const GENRE_ICONS = [
  { label: 'Action', emoji: '🗡️' },
  { label: 'Adventure', emoji: '🧭' },
  { label: 'Puzzle', emoji: '🧩' },
  { label: 'Sport', emoji: '⚽' },
  { label: 'Fortune', emoji: '🎰' },
];

function GenreIconsRow() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {GENRE_ICONS.map((g) => (
        <Link
          key={g.label}
          to="/"
          className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/40 to-primary/10 ring-1 ring-white/10 flex items-end p-3"
        >
          <span className="absolute top-2 right-3 text-3xl">{g.emoji}</span>
          <span className="text-white font-bold text-sm">{g.label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ----------------------- Page ----------------------- */

const Index = () => {
  const data = useMemo(() => {
    const featured = getFeaturedGames();
    const free = getFreeGames();
    const trending = getTrendingGames();
    return {
      heroFeaturedGame: featured[0] || trending[0],
      featuredGames: featured.slice(0, 5),
      freeGames: free,
      jumpBack: trending.slice(0, 6),
      pickGenre1: free.slice(0, 6),
      pickGenre2: free.slice(6, 12),
      featuredBig: mockGames.filter((g) => ['King of Thieves', 'Cut the Rope', 'Colossatron'].some(t => g.title.includes(t))).concat(featured).slice(0, 3),
      topPlayers: getGamesByTag('highscore'),
      editorsPick: getGamesByTag('editors-pick'),
      justDropped: getGamesByTag('just-dropped'),
      cloud: getGamesByTag('cloud'),
      zombie: getGamesByTag('zombie'),
      brain: getGamesByTag('brain'),
    };
  }, []);

  return (
    <Layout>
      <FeaturedGamesCarousel games={data.featuredGames} />

      <JumpBackIn games={data.jumpBack} />

      <div className="bg-background">
        <div className="px-6 md:px-8 py-6 space-y-10">
          {/* Pick your genre - collage */}
          <section>
            <h2 className="text-[15px] font-bold text-white mb-3">Pick your genre</h2>
            <PickYourGenreCollage games={data.pickGenre1} />
          </section>

          {/* Pick your genre - icon row */}
          <section>
            <h2 className="text-[15px] font-bold text-white mb-3">Pick your genre</h2>
            <GenreIconsRow />
          </section>

          {/* Featured Games */}
          <section>
            <SectionHeader title="Featured Games" icon={<Flame className="w-4 h-4 text-orange-500 fill-orange-500" />} />
            <FeaturedBigCards games={data.featuredBig} />
          </section>

          {/* Top Players & Highscore */}
          <section>
            <SectionHeader title="Top Players & Highscore" />
            <div className="grid grid-cols-5 gap-4">
              {data.topPlayers.slice(0, 5).map((g) => (
                <TopPlayersCard key={g.id} game={g} />
              ))}
            </div>
          </section>

          {/* Pick your genre - collage again */}
          <section>
            <h2 className="text-[15px] font-bold text-white mb-3">Pick your genre</h2>
            <PickYourGenreCollage games={data.pickGenre2} />
          </section>

          {/* Editor's Pick */}
          <section>
            <SectionHeader title="Editor's Pick" />
            <HorizontalGrid games={data.editorsPick} cols={10} />
          </section>

          {/* Just Dropped */}
          <section>
            <SectionHeader title="Just Dropped" />
            <HorizontalGrid games={data.justDropped} cols={10} />
          </section>

          {/* Most Popular on Cloud */}
          <section>
            <SectionHeader title="Most Popular on Cloud" icon={<Flame className="w-4 h-4 text-orange-500 fill-orange-500" />} />
            <HorizontalGrid games={data.cloud} cols={10} />
          </section>

          {/* Zombie Saga */}
          <section>
            <SectionHeader title="Zombie Saga" />
            <HorizontalGrid games={data.zombie} cols={10} />
          </section>

          {/* Brain Boosters */}
          <section>
            <SectionHeader title="Brain Boosters" />
            <HorizontalGrid games={data.brain} cols={10} />
          </section>
        </div>
        <div className="h-12" />
      </div>
    </Layout>
  );
};

export default Index;
