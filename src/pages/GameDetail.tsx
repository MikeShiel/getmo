import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Play, ThumbsUp, ThumbsDown, Heart, Share2, Star,
  Maximize2, Trophy,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  const [descOpen, setDescOpen] = useState(false);
  const [likes, setLikes] = useState(1240);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

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
            {/* 1. Hero */}
            <section className="relative rounded-2xl overflow-hidden glass-card">
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
            </section>

            {/* 2. Leaderboard ad 728x90 */}
            <AdSlot width={728} height={90} slotId="1111111111" />

            {/* 3. Action Bar */}
            <div className="border-y border-white/10 py-3">
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

            {/* 4. Screenshots */}
            {game.screenshots.length > 0 && (
              <div className="-mx-4 px-4 overflow-x-auto">
                <div className="flex gap-3">
                  {game.screenshots.concat(game.screenshots).slice(0, 6).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(s)}
                      className="flex-shrink-0 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary transition"
                    >
                      <img src={s} alt={`Screenshot ${i + 1}`} className="h-40 w-auto object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Description */}
            <div>
              <p className={`text-white text-sm leading-relaxed ${descOpen ? '' : 'line-clamp-4'}`}>
                {game.description}
              </p>
              <button
                onClick={() => setDescOpen(o => !o)}
                className="text-sm font-medium mt-2"
                style={{ color: '#7C3AED' }}
              >
                {descOpen ? 'Read Less' : 'Read More'}
              </button>
            </div>

            {/* 6. Mobile-only inline rectangle */}
            <div className="lg:hidden">
              <AdSlot width={300} height={250} slotId="2222222222" />
            </div>

            {/* 7. Leaderboard */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">🏆 Leaderboard</h2>
              <div className="rounded-xl overflow-hidden border border-white/5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left" style={{ background: '#1A1730', color: '#A0A0C0' }}>
                      <th className="py-2 px-3 w-12">Rank</th>
                      <th className="py-2 px-3">Player</th>
                      <th className="py-2 px-3 text-right">Score</th>
                      <th className="py-2 px-3 text-right hidden sm:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeaderboard.map((row, idx) => (
                      <tr key={row.rank} style={{ background: idx % 2 === 0 ? '#0D0B1E' : '#1A1730' }}>
                        <td className="py-2 px-3 font-bold" style={{ color: rankColor(row.rank) }}>
                          #{row.rank}
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ background: `hsl(${(row.rank * 47) % 360}, 60%, 45%)` }}>
                              {row.name[0]}
                            </div>
                            <span className="text-white">{row.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right text-white tabular-nums">{row.score.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right hidden sm:table-cell" style={{ color: '#A0A0C0' }}>
                          {row.daysAgo === 1 ? '1 day ago' : `${row.daysAgo} days ago`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" asChild
                  className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]">
                  <Link to="/rewards">View Full Leaderboard →</Link>
                </Button>
              </div>
            </section>

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
              <AdSlot width={300} height={250} slotId="3333333333" />

              <div className="rounded-2xl p-4 space-y-4" style={{ background: '#1A1730' }}>
                <img src={game.thumbnail} alt={game.title} className="w-full aspect-video object-cover rounded-xl" />
                <h3 className="text-white font-bold text-lg">{game.title}</h3>
                <Button onClick={handlePlay} className="w-full gap-2 text-white font-bold"
                  style={{ background: '#7C3AED' }}>
                  <Play className="h-4 w-4 fill-current" /> Play
                </Button>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Developer', value: game.publisher },
                    { label: 'Genre', value: game.genre },
                    { label: 'Age', value: ageRating },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span style={{ color: '#A0A0C0' }}>{r.label}</span>
                      <span className="text-white font-medium">{r.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#A0A0C0' }}>Rating</span>
                    <span className="flex items-center gap-1 text-white font-medium">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.round(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                        />
                      ))}
                      <span className="ml-1">{game.rating.toFixed(1)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <AdSlot width={300} height={250} slotId="4444444444" lazy />
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          {lightbox && <img src={lightbox} alt="Screenshot" className="w-full rounded-xl" />}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
