import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Play, ThumbsUp, ThumbsDown, Heart, Share2, Star,
  Maximize2,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { getGameById, getGamesByGenre, mockGames, Game } from '@/data/mockGames';
import { toast } from 'sonner';

// ---------- Ad slot ----------
function AdSlot({
  width, height, slotId, className = '', lazy = false,
}: { width: number; height: number; slotId: string; className?: string; lazy?: boolean }) {
  const [show, setShow] = useState(!lazy);
  useEffect(() => {
    if (!lazy) return;
    const onScroll = () => { if (window.scrollY > 600) { setShow(true); window.removeEventListener('scroll', onScroll); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lazy]);
  return (
    <div className={className}>
      <p className="text-[11px] text-left mb-1" style={{ color: '#A0A0C0' }}>Advertisement</p>
      <div
        className="w-full flex items-center justify-center text-xs text-muted-foreground rounded"
        style={{ background: '#1A1730', height, maxWidth: width }}
      >
        {show ? (
          <ins
            className="adsbygoogle block"
            style={{ display: 'block', width: '100%', height }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slotId}
            data-ad-format="auto"
          />
        ) : null}
        <span className="opacity-50">Ad {width}×{height}</span>
      </div>
    </div>
  );
}

// ---------- Mock leaderboard ----------
const mockLeaderboard = [
  { rank: 1, name: 'NeonShadow', score: 98230, daysAgo: 1 },
  { rank: 2, name: 'PixelQueen', score: 91450, daysAgo: 1 },
  { rank: 3, name: 'GlitchHunter', score: 88720, daysAgo: 2 },
  { rank: 4, name: 'VoidRunner', score: 81100, daysAgo: 2 },
  { rank: 5, name: 'CyberWolf', score: 76540, daysAgo: 3 },
  { rank: 6, name: 'StarFox99', score: 71290, daysAgo: 3 },
  { rank: 7, name: 'BitCrusher', score: 68030, daysAgo: 4 },
  { rank: 8, name: 'ChromeFury', score: 64210, daysAgo: 5 },
  { rank: 9, name: 'NovaBlade', score: 60880, daysAgo: 6 },
  { rank: 10, name: 'EchoDrift', score: 57300, daysAgo: 7 },
];

const rankColor = (r: number) =>
  r === 1 ? '#FFD700' : r === 2 ? '#C0C0C0' : r === 3 ? '#CD7F32' : '#A0A0C0';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTheme();

  const [game, setGame] = useState<Game | null>(null);
  const [related, setRelated] = useState<Game[]>([]);
  const [likes, setLikes] = useState(1240);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
    const g = getGameById(id);
    setGame(g || null);
    if (g) {
      const r = getGamesByGenre(g.genre, g.id);
      const extra = mockGames.filter(m => m.id !== g.id && !r.find(x => x.id === m.id)).slice(0, 8 - r.length);
      setRelated([...r, ...extra].slice(0, 8));
    }
  }, [id]);

  const ageRating = useMemo(() => game?.is_free ? 'E (Everyone)' : 'T (Teen)', [game]);

  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </Layout>
    );
  }

  const handlePlay = () => navigate(`/game/${game.id}/play`);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied');
    } catch { toast.error('Could not copy link'); }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> {t('common.back')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            {/* Top leaderboard ad above iframe */}
            <AdSlot width={728} height={90} slotId="1111111111" />

            {/* 1. Hero + attached action bar */}
            <section className="rounded-2xl overflow-hidden glass-card">
            <div className="relative">
              <div className="absolute inset-0">
                <img src={game.thumbnail} alt="" className="w-full h-full object-cover scale-110 blur-xl opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 gap-4">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-[100px] h-[100px] rounded-2xl object-cover ring-2 ring-white/20 shadow-xl"
                />
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white">{game.title}</h1>
                <Button
                  size="lg"
                  onClick={handlePlay}
                  className="gap-2 text-white font-bold px-10 h-12 rounded-xl shadow-lg"
                  style={{ background: '#7C3AED' }}
                >
                  <Play className="h-5 w-5 fill-current" /> Play
                </Button>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {[
                    { label: 'Developer', value: game.publisher },
                    { label: 'Genre', value: game.genre },
                    { label: 'Age Rating', value: ageRating },
                  ].map(p => (
                    <div key={p.label} className="px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5"
                      style={{ background: 'rgba(26,23,48,0.7)' }}>
                      <span style={{ color: '#A0A0C0' }}>{p.label}</span>
                      <span className="text-white font-medium">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Attached action bar */}
            <div className="py-2.5 px-4" style={{ background: '#0D0B1E' }}>
              <div className="flex items-center justify-around text-muted-foreground">
                <button
                  onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }}
                  className={`flex items-center gap-1.5 text-sm hover:text-white transition ${liked ? 'text-white' : ''}`}
                >
                  <ThumbsUp className="h-4 w-4" /> {likes.toLocaleString()}
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-white transition">
                  <ThumbsDown className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-white transition">
                  <Heart className="h-4 w-4" />
                </button>
                <button onClick={handleShare} className="flex items-center gap-1.5 text-sm hover:text-white transition">
                  <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setFavorited(f => !f)}
                  className={`flex items-center gap-1.5 text-sm hover:text-white transition ${favorited ? 'text-white' : ''}`}
                >
                  <Star className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">Favourite</span>
                </button>
                <button onClick={handlePlay} className="flex items-center gap-1.5 text-sm hover:text-white transition">
                  <Maximize2 className="h-4 w-4" /> <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>
            </section>

            {/* Mobile-only: Leaderboard + 300x250 ad */}
            <div className="lg:hidden space-y-6">
              <section>
                <h2 className="text-lg font-bold text-white mb-3">🏆 Leaderboard</h2>
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left" style={{ background: '#1A1730', color: '#A0A0C0' }}>
                        <th className="py-2 px-2 w-10 text-xs">Rank</th>
                        <th className="py-2 px-2 text-xs">Player</th>
                        <th className="py-2 px-2 text-right text-xs">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeaderboard.map((row, idx) => (
                        <tr key={row.rank} style={{ background: idx % 2 === 0 ? '#0D0B1E' : '#1A1730' }}>
                          <td className="py-2 px-2 font-bold text-xs" style={{ color: rankColor(row.rank) }}>
                            #{row.rank}
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                style={{ background: `hsl(${(row.rank * 47) % 360}, 60%, 45%)` }}>
                                {row.name[0]}
                              </div>
                              <span className="text-white text-xs truncate">{row.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2 text-right text-white tabular-nums text-xs">{row.score.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm" asChild
                    className="w-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]">
                    <Link to="/rewards">View Full Leaderboard →</Link>
                  </Button>
                </div>
              </section>

              <div className="flex justify-center">
                <AdSlot width={300} height={250} slotId="2222222222" />
              </div>
            </div>

            {/* 8. Related Games */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-white">Related Games</h2>
                <Link to="/" className="text-xs font-semibold tracking-wider" style={{ color: '#7C3AED' }}>
                  VIEW ALL
                </Link>
              </div>
              <div className="-mx-4 px-4 overflow-x-auto">
                <div className="flex gap-3">
                  {related.map(g => (
                    <Link
                      key={g.id}
                      to={`/game/${g.id}`}
                      className="flex-shrink-0 w-40 rounded-xl overflow-hidden glass-card hover:ring-2 hover:ring-primary transition"
                    >
                      <div className="relative aspect-square">
                        <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white"
                          style={{ background: 'rgba(124,58,237,0.9)' }}>
                          Online Game
                        </span>
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-white truncate">{g.title}</h3>
                        <p className="text-xs" style={{ color: '#A0A0C0' }}>{g.genre}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Spacer to align with game iframe top (matches 728x90 ad block in left column) */}
              <div aria-hidden className="invisible">
                <p className="text-[11px] mb-1">Advertisement</p>
                <div style={{ height: 90 }} />
              </div>
              {/* Leaderboard - level with game iframe */}
              <section>
                <h2 className="text-lg font-bold text-white mb-3">🏆 Leaderboard</h2>
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left" style={{ background: '#1A1730', color: '#A0A0C0' }}>
                        <th className="py-2 px-2 w-10 text-xs">Rank</th>
                        <th className="py-2 px-2 text-xs">Player</th>
                        <th className="py-2 px-2 text-right text-xs">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeaderboard.map((row, idx) => (
                        <tr key={row.rank} style={{ background: idx % 2 === 0 ? '#0D0B1E' : '#1A1730' }}>
                          <td className="py-2 px-2 font-bold text-xs" style={{ color: rankColor(row.rank) }}>
                            #{row.rank}
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                style={{ background: `hsl(${(row.rank * 47) % 360}, 60%, 45%)` }}>
                                {row.name[0]}
                              </div>
                              <span className="text-white text-xs truncate">{row.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2 text-right text-white tabular-nums text-xs">{row.score.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm" asChild
                    className="w-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]">
                    <Link to="/rewards">View Full Leaderboard →</Link>
                  </Button>
                </div>
              </section>

              <AdSlot width={300} height={250} slotId="3333333333" lazy />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
