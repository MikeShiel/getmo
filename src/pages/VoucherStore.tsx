import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { VoucherSpotlight } from '@/components/vouchers/VoucherSpotlight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockVouchers, getVouchersByCategory, getSpotlightVouchers } from '@/data/mockVouchers';
import {
  TrendingUp, Clock, Sparkles, Search, SlidersHorizontal, Gamepad2,
  Gift, CreditCard, Monitor, ChevronRight, X, ShoppingCart, Ticket,
  ShoppingBag, Filter, Eye, EyeOff, Copy, Check, AlertTriangle,
  ChevronDown, ChevronUp, Flag, KeyRound, UserPlus
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

function GuestMyVouchersPrompt() {
  const { setShowSaveProgressModal } = useGuest();
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="glass-card p-8 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
          <Ticket className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron mb-2">Your Vouchers Await</h2>
          <p className="text-muted-foreground">
            Create a free account to purchase vouchers and manage your game keys all in one place.
          </p>
        </div>
        <button
          onClick={() => setShowSaveProgressModal(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Create Free Account
        </button>
      </div>
    </div>
  );
}

// ── Types ──
interface PurchasedVoucher {
  id: string;
  user_id: string;
  voucher_id: string;
  key_code: string;
  status: 'active' | 'used' | 'expired';
  purchased_at: string;
  expires_at: string | null;
  redeemed_at: string | null;
  platform: string;
  voucher_type: string;
  variant_label: string | null;
}

type FilterTab = 'all' | 'active' | 'used' | 'expired';
type SortOption = 'date-desc' | 'expiry' | 'name-asc';

// ── Mock seed data ──
const MOCK_PURCHASED: Omit<PurchasedVoucher, 'user_id'>[] = [
  {
    id: 'pv-1', voucher_id: 'v-steam-1', key_code: 'STEAM-4X7K-M9PL-Q2WN-8RFJ',
    status: 'active', purchased_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 90 * 86400000).toISOString(), redeemed_at: null,
    platform: 'PC', voucher_type: 'Gift Card', variant_label: '$25',
  },
  {
    id: 'pv-2', voucher_id: 'v-playstation-1', key_code: 'PSN-7HKL-3NVX-W8TQ-2MRP',
    status: 'used', purchased_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    expires_at: null, redeemed_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    platform: 'PlayStation', voucher_type: 'Game Key', variant_label: '$50',
  },
  {
    id: 'pv-3', voucher_id: 'v-xbox-1', key_code: 'XBOX-9FDL-K4WM-R7PX-5NQJ',
    status: 'active', purchased_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 3 * 86400000).toISOString(), redeemed_at: null,
    platform: 'Xbox', voucher_type: 'Gift Card', variant_label: '$10',
  },
  {
    id: 'pv-4', voucher_id: 'v-nintendo-1', key_code: 'NIN-2TPX-8RLK-J5WQ-4MHN',
    status: 'expired', purchased_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    expires_at: new Date(Date.now() - 5 * 86400000).toISOString(), redeemed_at: null,
    platform: 'Switch', voucher_type: 'Game Key', variant_label: '$25',
  },
  {
    id: 'pv-5', voucher_id: 'v-valorant-1', key_code: 'VAL-6QNK-W3PM-T9XR-1FHL',
    status: 'active', purchased_at: new Date(Date.now() - 300000).toISOString(),
    expires_at: new Date(Date.now() + 180 * 86400000).toISOString(), redeemed_at: null,
    platform: 'PC', voucher_type: 'In-Game Currency', variant_label: '2575 VP',
  },
];

// ── Helpers ──
function getDaysUntilExpiry(expiresAt: string | null): number | null {
  if (!expiresAt) return null;
  return Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getVoucherMeta(voucherId: string) {
  return mockVouchers.find(v => v.id === voucherId);
}

function getPlatformInstructions(platform: string): string[] {
  const map: Record<string, string[]> = {
    PC: ['Open Steam > Games > Activate a Product on Steam.', 'Enter your key and confirm.', 'The game will be added to your library.'],
    PlayStation: ['On your PS5/PS4, go to PlayStation Store.', 'Scroll to the bottom and select "Redeem Codes".', 'Enter the 12-digit code and confirm.'],
    Xbox: ['Press the Xbox button on your controller.', 'Go to Store > Use a code.', 'Enter the 25-character code and confirm.'],
    Switch: ['Open Nintendo eShop on your Switch.', 'Select your profile icon, then "Redeem Code".', 'Enter the 16-digit code and confirm.'],
  };
  return map[platform] || ['Visit the platform\'s website or app.', 'Navigate to the "Redeem Code" section.', 'Enter your code and confirm activation.'];
}

function getPlatformColor(platform: string) {
  const map: Record<string, string> = {
    PC: 'bg-blue-900/60 border-blue-700/40',
    PlayStation: 'bg-blue-800/60 border-blue-600/40',
    Xbox: 'bg-green-900/60 border-green-700/40',
    Switch: 'bg-red-900/60 border-red-700/40',
    Epic: 'bg-gray-900/80 border-gray-700/40',
  };
  return map[platform] || 'bg-muted border-border/50';
}

// ══════════════════════════════════════════════════════════
// STORE CATEGORIES & SECTIONS
// ══════════════════════════════════════════════════════════

const categories = [
  { label: 'Gaming', icon: Gamepad2, slug: 'gaming' },
  { label: 'Gift Cards', icon: Gift, slug: 'gift-cards' },
  { label: 'Subscriptions', icon: CreditCard, slug: 'subscriptions' },
  { label: 'PC', icon: Monitor, slug: 'pc' },
  { label: 'PlayStation', icon: Gamepad2, slug: 'playstation' },
  { label: 'Xbox', icon: Gamepad2, slug: 'xbox' },
  { label: 'Nintendo', icon: Gamepad2, slug: 'nintendo' },
  { label: 'Mobile', icon: Monitor, slug: 'mobile' },
];

const sections = [
  { key: 'best-sellers' as const, title: 'Best Sellers', subtitle: 'Fan-favorite vouchers that never miss.', icon: TrendingUp },
  { key: 'trending' as const, title: 'Trending Now', subtitle: 'What the community is claiming right now.', icon: Sparkles },
  { key: 'recently-added' as const, title: 'Recently Added', subtitle: 'Fresh drops—be the first to grab them.', icon: Clock },
];

// ══════════════════════════════════════════════════════════
// REPORT ISSUE MODAL
// ══════════════════════════════════════════════════════════

function ReportIssueModal({ open, onOpenChange, voucherId }: { open: boolean; onOpenChange: (o: boolean) => void; voucherId: string }) {
  const [issue, setIssue] = useState('');
  const [issueType, setIssueType] = useState('');

  const handleSubmit = () => {
    toast({ title: "Report submitted", description: "We'll review your issue shortly." });
    setIssue('');
    setIssueType('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
          <DialogDescription>Let us know what went wrong with this voucher.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={issueType} onValueChange={setIssueType}>
            <SelectTrigger><SelectValue placeholder="Select issue type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="not-working">Key doesn't work</SelectItem>
              <SelectItem value="already-used">Key already used</SelectItem>
              <SelectItem value="wrong-product">Wrong product</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <textarea
            value={issue}
            onChange={e => setIssue(e.target.value)}
            placeholder="Describe your issue..."
            className="w-full h-24 rounded-lg border border-border bg-input p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            maxLength={500}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!issueType}>Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ══════════════════════════════════════════════════════════
// VOUCHER KEY CARD (for My Vouchers tab)
// ══════════════════════════════════════════════════════════

function MyVoucherCard({
  pv, onReveal, revealedKeys, isNew
}: {
  pv: PurchasedVoucher; onReveal: (id: string) => void; revealedKeys: Set<string>; isNew: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const meta = getVoucherMeta(pv.voucher_id);
  const daysLeft = getDaysUntilExpiry(pv.expires_at);
  const isRevealed = revealedKeys.has(pv.id);
  const isUsed = pv.status === 'used';
  const isExpired = pv.status === 'expired';
  const expiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && !isUsed && !isExpired;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pv.key_code);
    setCopied(true);
    toast({ title: "Key copied to clipboard", description: "Don't share it with anyone!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const expiryColor = () => {
    if (!daysLeft || isUsed) return 'text-muted-foreground';
    if (daysLeft <= 7) return 'text-destructive';
    if (daysLeft <= 30) return 'text-orange-400';
    return 'text-muted-foreground';
  };

  return (
    <div className={`rounded-xl border transition-all ${
      expiringSoon ? 'border-orange-500/60 shadow-[0_0_15px_-3px_hsl(30,90%,50%,0.2)]' : 'border-border/50'
    } ${isUsed || isExpired ? 'opacity-60' : ''} bg-card/80 backdrop-blur-sm`}>
      {isNew && (
        <div className="bg-primary/20 border-b border-primary/30 px-4 py-1.5 rounded-t-xl">
          <span className="text-xs font-bold text-primary">✨ NEW PURCHASE</span>
        </div>
      )}
      {expiringSoon && !isNew && (
        <div className="bg-orange-500/15 border-b border-orange-500/30 px-4 py-1.5 flex items-center gap-2 rounded-t-xl">
          <Clock className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-xs font-bold text-orange-400">
            Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* LEFT: Platform thumbnail */}
          <div className="w-full md:w-28 flex-shrink-0">
            <div className={`aspect-[4/3] md:aspect-square rounded-lg overflow-hidden border ${getPlatformColor(pv.platform)}`}>
              {meta?.thumbnail ? (
                <img src={meta.thumbnail} alt={meta.brand} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Ticket className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <Badge variant="outline" className="mt-2 text-xs w-full justify-center">{pv.platform}</Badge>
          </div>

          {/* CENTER: Details */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-foreground text-base leading-tight">
                  {meta?.brand || 'Voucher'} {pv.variant_label && `— ${pv.variant_label}`}
                </h3>
                <span className="text-xs text-muted-foreground">{pv.voucher_type}</span>
              </div>
              <Badge className={`text-xs shrink-0 ${
                isUsed ? 'bg-muted text-muted-foreground' :
                isExpired ? 'bg-destructive/20 text-destructive' :
                'bg-green-500/20 text-green-400'
              }`}>
                {pv.status.charAt(0).toUpperCase() + pv.status.slice(1)}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground">Purchased on {formatDate(pv.purchased_at)}</p>
            {pv.expires_at && (
              <p className={`text-xs ${expiryColor()}`}>
                {isExpired ? 'Expired' : 'Expires'} {formatDate(pv.expires_at)}
              </p>
            )}
            {isUsed && pv.redeemed_at && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <Check className="h-3 w-3" /> Redeemed on {formatDate(pv.redeemed_at)}
              </p>
            )}

            {/* KEY SECTION */}
            {!isUsed ? (
              <div className="mt-3 p-3 rounded-lg bg-background/60 border border-border/50 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="font-mono text-sm text-foreground tracking-wider flex-1 min-w-0 truncate">
                    {isRevealed ? pv.key_code : '████████-████-████-████'}
                  </code>
                  {isRevealed && (
                    <Button size="sm" variant="outline" className="h-8 gap-1.5 shrink-0" onClick={handleCopy}>
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
                {!isExpired && (
                  <Button
                    size="sm"
                    variant={isRevealed ? 'ghost' : 'default'}
                    className={`gap-1.5 w-full md:w-auto ${!isRevealed ? 'bg-primary hover:bg-primary/90' : ''}`}
                    onClick={() => onReveal(pv.id)}
                  >
                    {isRevealed ? <><EyeOff className="h-3.5 w-3.5" /> Hide Key</> : <><Eye className="h-3.5 w-3.5" /> Reveal Key</>}
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" /> Key has been redeemed
                </p>
              </div>
            )}

            {/* How to activate */}
            {!isUsed && !isExpired && (
              <Collapsible open={instructionsOpen} onOpenChange={setInstructionsOpen}>
                <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                  <KeyRound className="h-3 w-3" /> How to activate
                  {instructionsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside pl-1">
                    {getPlatformInstructions(pv.platform).map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>

        {/* Report link */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <button onClick={() => setReportOpen(true)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Report an issue
          </button>
        </div>
      </div>

      <ReportIssueModal open={reportOpen} onOpenChange={setReportOpen} voucherId={pv.id} />
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// MY VOUCHERS TAB CONTENT
// ══════════════════════════════════════════════════════════

function MyVouchersTabContent() {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState<PurchasedVoucher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [confirmRevealId, setConfirmRevealId] = useState<string | null>(null);
  const [revealCount, setRevealCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data, error } = await supabase
        .from('purchased_vouchers')
        .select('*')
        .eq('user_id', user!.id)
        .order('purchased_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setVouchers(data as unknown as PurchasedVoucher[]);
      } else {
        setVouchers(MOCK_PURCHASED.map(m => ({ ...m, user_id: user!.id })));
      }
      setDataLoaded(true);
    }
    load();
  }, [user]);

  const handleRevealToggle = (id: string) => {
    if (revealedKeys.has(id)) {
      setRevealedKeys(prev => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      setConfirmRevealId(id);
    }
  };

  const confirmReveal = async () => {
    if (!confirmRevealId || !user) return;
    await supabase.from('key_reveal_logs').insert({
      user_id: user.id,
      purchased_voucher_id: confirmRevealId,
    });
    setRevealedKeys(prev => new Set(prev).add(confirmRevealId));
    setRevealCount(c => c + 1);
    setConfirmRevealId(null);
  };

  const stats = useMemo(() => {
    const total = vouchers.length;
    const active = vouchers.filter(v => v.status === 'active').length;
    const used = vouchers.filter(v => v.status === 'used').length;
    const expiringSoon = vouchers.filter(v => {
      const d = getDaysUntilExpiry(v.expires_at);
      return d !== null && d <= 7 && d > 0 && v.status === 'active';
    }).length;
    return { total, active, used, expiringSoon };
  }, [vouchers]);

  const filteredVouchers = useMemo(() => {
    let list = [...vouchers];
    if (filterTab !== 'all') list = list.filter(v => v.status === filterTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => {
        const meta = getVoucherMeta(v.voucher_id);
        return meta?.brand?.toLowerCase().includes(q) || v.voucher_type.toLowerCase().includes(q) || v.platform.toLowerCase().includes(q);
      });
    }
    list.sort((a, b) => {
      const aDays = getDaysUntilExpiry(a.expires_at);
      const bDays = getDaysUntilExpiry(b.expires_at);
      const aExpiring = aDays !== null && aDays <= 7 && aDays > 0 && a.status === 'active';
      const bExpiring = bDays !== null && bDays <= 7 && bDays > 0 && b.status === 'active';
      if (aExpiring && !bExpiring) return -1;
      if (!aExpiring && bExpiring) return 1;
      switch (sortBy) {
        case 'date-desc': return new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime();
        case 'expiry': return (!a.expires_at ? 1 : !b.expires_at ? -1 : new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime());
        case 'name-asc': return (getVoucherMeta(a.voucher_id)?.brand || '').localeCompare(getVoucherMeta(b.voucher_id)?.brand || '');
        default: return 0;
      }
    });
    return list;
  }, [vouchers, filterTab, searchQuery, sortBy]);

  const isNewPurchase = (pv: PurchasedVoucher) => Date.now() - new Date(pv.purchased_at).getTime() < 3600000;

  const FILTER_TABS: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'used', label: 'Used' },
    { id: 'expired', label: 'Expired' },
  ];

  if (!user) {
    return (
      <div className="text-center py-20">
        <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-semibold mb-2">Sign in to view your vouchers</h3>
        <p className="text-muted-foreground mb-6">You need to be logged in to manage your vouchers.</p>
        <Link to="/auth"><Button className="bg-primary hover:bg-primary/90">Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Rate limit warning */}
      {revealCount >= 5 && (
        <div className="mb-4 p-3 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
          <p className="text-sm text-orange-400">
            You've revealed several keys recently. If you didn't do this, please secure your account immediately.
          </p>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, icon: ShoppingBag, color: 'text-foreground' },
          { label: 'Active', value: stats.active, icon: Ticket, color: 'text-green-400' },
          { label: 'Redeemed', value: stats.used, icon: Check, color: 'text-muted-foreground' },
          { label: 'Expiring Soon', value: stats.expiringSoon, icon: Clock, color: stats.expiringSoon > 0 ? 'text-orange-400' : 'text-muted-foreground' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center">
            <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Expiring soon warning */}
      {stats.expiringSoon > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
          <p className="text-sm text-orange-400">
            {stats.expiringSoon} voucher{stats.expiringSoon !== 1 ? 's' : ''} expiring within 7 days — use them before they're gone
          </p>
        </div>
      )}

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search your vouchers..." className="pl-10 bg-input border-border" />
        </div>
        <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="expiry">Expiry Date</SelectItem>
            <SelectItem value="name-asc">Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              filterTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Voucher cards */}
      {!dataLoaded ? (
        <div className="text-center py-20 text-muted-foreground">Loading vouchers...</div>
      ) : vouchers.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold mb-2">No vouchers yet</h3>
          <p className="text-muted-foreground mb-6">You haven't purchased any vouchers yet.</p>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => {}}>Browse Voucher Store</Button>
        </div>
      ) : filteredVouchers.length === 0 ? (
        <div className="text-center py-20">
          <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No vouchers match this filter</h3>
          <Button variant="outline" onClick={() => { setFilterTab('all'); setSearchQuery(''); }}>Clear Filters</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVouchers.map(pv => (
            <MyVoucherCard key={pv.id} pv={pv} onReveal={handleRevealToggle} revealedKeys={revealedKeys} isNew={isNewPurchase(pv)} />
          ))}
        </div>
      )}


      {/* Reveal Confirmation Modal */}
      <Dialog open={!!confirmRevealId} onOpenChange={(open) => !open && setConfirmRevealId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" /> Reveal Key?
            </DialogTitle>
            <DialogDescription>Key reveals are logged for your security. Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmRevealId(null)}>Cancel</Button>
            <Button onClick={confirmReveal}>Yes, Reveal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// STORE TAB CONTENT
// ══════════════════════════════════════════════════════════

function StoreTabContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const allSpotlight = getSpotlightVouchers();
  const discounted = mockVouchers.filter(v => v.discountPercent && !v.spotlight);
  const spotlightVouchers = [...allSpotlight, ...discounted].slice(0, 12);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return mockVouchers.filter(
      v => v.brand.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.platform.toLowerCase().includes(q) || v.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchQuery(''); searchRef.current?.blur(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Sticky search bar */}
      <div className="sticky top-[7.5rem] z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vouchers..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:outline-none transition-colors text-sm"
            />
            {isSearching && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-border/50" onClick={() => navigate('/vouchers/category/all')}>
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {isSearching ? (
        <div className="container mx-auto px-4 py-8">
          <p className="text-sm text-muted-foreground mb-4">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<span className="text-foreground font-medium">{searchQuery}</span>"
          </p>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {searchResults.map(v => <VoucherCard key={v.id} voucher={v} compact />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No vouchers found. Try a different search.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <VoucherSpotlight vouchers={spotlightVouchers} />
          <section className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {categories.map(({ label, icon: Icon, slug }) => (
                <Link key={label} to={`/vouchers/category/${slug}`} className="flex flex-col items-center gap-2 p-3 rounded-xl glass-card border border-border/30 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--neon-primary)/0.15)] transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </section>
          <div className="container mx-auto px-4 pb-20 space-y-12">
            {sections.map(({ key, title, subtitle, icon: Icon }) => {
              const vouchers = getVouchersByCategory(key);
              if (vouchers.length === 0) return null;
              return (
                <section key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold font-[Orbitron]">{title}</h2>
                    </div>
                    <Link to={`/vouchers/category/${key}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {vouchers.map(v => <VoucherCard key={v.id} voucher={v} compact />)}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE WITH SECONDARY TAB NAV
// ══════════════════════════════════════════════════════════

type VoucherTab = 'store' | 'my-vouchers' | 'achievements';

export default function VoucherStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const tabParam = searchParams.get('tab');
  const activeTab: VoucherTab = tabParam === 'my-vouchers' ? 'my-vouchers' : 'store';

  // Count active vouchers for badge (simple mock count)
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    async function loadCount() {
      const { data, error } = await supabase
        .from('purchased_vouchers')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .eq('status', 'active');

      if (!error && data) {
        setActiveCount(data.length || 0);
      } else {
        // fallback mock count
        setActiveCount(MOCK_PURCHASED.filter(m => m.status === 'active').length);
      }
    }
    loadCount();
  }, [user]);

  const setTab = (tab: VoucherTab) => {
    setSearchParams(tab === 'store' ? {} : { tab });
  };

  const tabs: { id: VoucherTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'store', label: 'Voucher Store', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'my-vouchers', label: 'My Vouchers', icon: <Ticket className="h-4 w-4" />, badge: activeCount > 0 ? activeCount : undefined },
  ];

  return (
    <Layout>
      {/* Secondary tab nav */}
      <div className="sticky top-16 z-40 bg-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-[hsl(262,80%,72%)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-[hsl(262,80%,72%)]' : ''}>{tab.icon}</span>
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(262,80%,72%)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'store' ? (
        <StoreTabContent />
      ) : user ? (
        <div className="container mx-auto px-4 py-8">
          <MyVouchersTabContent />
        </div>
      ) : (
        <GuestMyVouchersPrompt />
      )}
    </Layout>
  );
}
