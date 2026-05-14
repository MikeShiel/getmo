import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
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
      <div className="flex items-center justify-between mb-5 px-6">
        <h2 className="text-[18px] font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          Spotlight Games
        </h2>
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
        className="flex gap-16 overflow-x-auto scrollbar-hide px-10 pb-4 pt-2 snap-x snap-mandatory items-end"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {games.slice(0, 5).map((g, i) => (
          <div key={g.id} className="relative flex-shrink-0 snap-start" style={{ width: 240 }}>
            {/* Big rank number in the gap, peeking from behind */}
            <span
              aria-hidden
              className="absolute -left-12 bottom-0 text-[140px] leading-[0.8] font-black select-none pointer-events-none z-0"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: 'rgba(255,255,255,0.55)',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
                WebkitTextStroke: '1px rgba(255,255,255,0.85)',
              }}
            >
              {i + 1}
            </span>

            <Link to={`/game/${g.id}`} className="group block relative z-10">
              <div
                className="relative rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl"
                style={{ width: 240, height: 320 }}
              >
                <img
                  src={g.thumbnail}
                  alt={g.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating info chip */}
              <div className="absolute left-3 right-3 bottom-3 flex items-center gap-2.5 rounded-2xl bg-black/70 backdrop-blur-md px-2.5 py-2 border border-white/10">
                <img
                  src={g.thumbnail}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-white text-[13px] font-bold truncate leading-tight">{g.title}</p>
                  <p className="text-zinc-400 text-[11px] truncate leading-tight">{g.genre}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}