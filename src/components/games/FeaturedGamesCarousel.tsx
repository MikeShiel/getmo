import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Game } from '@/data/mockGames';

interface Props {
  games: Game[];
}

export function FeaturedGamesCarousel({ games }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' });
  };

  return (
    <section className="bg-black py-10">
      <div className="flex items-center justify-between mb-4 px-6">
        <h2 className="text-[20px] font-bold text-white">Featured Games</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="hidden md:inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="hidden md:inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Link to="/" className="text-[#7C3AED] text-sm font-semibold ml-2">
            VIEW ALL
          </Link>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {games.map((g) => (
          <Link
            key={g.id}
            to={`/game/${g.id}`}
            className="group flex-shrink-0 snap-start"
            style={{ width: 280 }}
          >
            <div
              className="relative rounded-xl overflow-hidden bg-zinc-900"
              style={{ width: 280, height: 180 }}
            >
              <img
                src={g.thumbnail}
                alt={g.title}
                loading="lazy"
                decoding="async"
                width={280}
                height={180}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide ${
                  g.is_free
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#7C3AED] text-white'
                }`}
              >
                {g.is_free ? 'FREE' : 'PREMIUM'}
              </span>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold text-white"
                  style={{ background: '#7C3AED' }}
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Play Now
                </span>
              </div>
            </div>
            <p className="text-white text-[14px] font-bold mt-2 truncate">{g.title}</p>
            <p className="text-zinc-500 text-[12px] truncate">{g.genre}</p>
            <p className="text-[#7C3AED] text-[12px] font-semibold mt-1">Instant Play →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}