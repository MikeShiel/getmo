import { useState, useEffect, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Search, Filter, Eye, EyeOff, Copy, Check, ShoppingBag, 
  AlertTriangle, Clock, ChevronDown, ChevronUp, Flag, 
  Gift, Ticket, Gamepad2, CreditCard, KeyRound
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { mockVouchers } from '@/data/mockVouchers';

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

// ── Mock seed data (client-side only, used when DB is empty) ──
const MOCK_PURCHASED: Omit<PurchasedVoucher, 'user_id'>[] = [
  {
    id: 'pv-1',
    voucher_id: 'v-steam-1',
    key_code: 'STEAM-4X7K-M9PL-Q2WN-8RFJ',
    status: 'active',
    purchased_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 90 * 86400000).toISOString(),
    redeemed_at: null,
    platform: 'PC',
    voucher_type: 'Gift Card',
    variant_label: '$25',
  },
  {
    id: 'pv-2',
    voucher_id: 'v-playstation-1',
    key_code: 'PSN-7HKL-3NVX-W8TQ-2MRP',
    status: 'used',
    purchased_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    expires_at: null,
    redeemed_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    platform: 'PlayStation',
    voucher_type: 'Game Key',
    variant_label: '$50',
  },
  {
    id: 'pv-3',
    voucher_id: 'v-xbox-1',
    key_code: 'XBOX-9FDL-K4WM-R7PX-5NQJ',
    status: 'active',
    purchased_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    redeemed_at: null,
    platform: 'Xbox',
    voucher_type: 'Gift Card',
    variant_label: '$10',
  },
  {
    id: 'pv-4',
    voucher_id: 'v-nintendo-1',
    key_code: 'NIN-2TPX-8RLK-J5WQ-4MHN',
    status: 'expired',
    purchased_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    expires_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    redeemed_at: null,
    platform: 'Switch',
    voucher_type: 'Game Key',
    variant_label: '$25',
  },
  {
    id: 'pv-5',
    voucher_id: 'v-valorant-1',
    key_code: 'VAL-6QNK-W3PM-T9XR-1FHL',
    status: 'active',
    purchased_at: new Date(Date.now() - 300000).toISOString(),
    expires_at: new Date(Date.now() + 180 * 86400000).toISOString(),
    redeemed_at: null,
    platform: 'PC',
    voucher_type: 'In-Game Currency',
    variant_label: '2575 VP',
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

// ── Voucher Card ──
function VoucherCard({ 
  pv, 
  onReveal, 
  revealedKeys, 
  isNew 
}: { 
  pv: PurchasedVoucher; 
  onReveal: (id: string) => void; 
  revealedKeys: Set<string>;
  isNew: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
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
      {/* New badge */}
      {isNew && (
        <div className="bg-primary/20 border-b border-primary/30 px-4 py-1.5 rounded-t-xl">
          <span className="text-xs font-bold text-primary">✨ NEW PURCHASE</span>
        </div>
      )}

      {/* Expiring soon banner */}
      {expiringSoon && (
        <div className="bg-orange-500/15 border-b border-orange-500/30 px-4 py-1.5 flex items-center gap-2 rounded-t-xl">
          <Clock className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-xs font-bold text-orange-400">
            Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* LEFT: Thumbnail */}
          <div className="w-full md:w-28 flex-shrink-0">
            <div className="aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-muted">
              {meta?.thumbnail ? (
                <img src={meta.thumbnail} alt={meta.brand} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Ticket className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <Badge variant="outline" className="mt-2 text-xs w-full justify-center">
              {pv.platform}
            </Badge>
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
              {/* Status badge */}
              <Badge className={`text-xs shrink-0 ${
                isUsed ? 'bg-muted text-muted-foreground' :
                isExpired ? 'bg-destructive/20 text-destructive' :
                'bg-green-500/20 text-green-400'
              }`}>
                {pv.status.charAt(0).toUpperCase() + pv.status.slice(1)}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground">
              Purchased on {formatDate(pv.purchased_at)}
            </p>

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
                    onClick={() => isRevealed ? onReveal(pv.id) : onReveal(pv.id)}
                  >
                    {isRevealed ? (
                      <><EyeOff className="h-3.5 w-3.5" /> Hide Key</>
                    ) : (
                      <><Eye className="h-3.5 w-3.5" /> Reveal Key</>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  Key has been redeemed
                </p>
              </div>
            )}

            {/* How to activate */}
            {!isUsed && !isExpired && (
              <Collapsible open={instructionsOpen} onOpenChange={setInstructionsOpen}>
                <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                  <KeyRound className="h-3 w-3" />
                  How to activate
                  {instructionsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside pl-1">
                    {getPlatformInstructions(pv.platform).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>

        {/* Footer */}
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-3 pt-3 border-t border-border/30 w-full">
            {detailsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Order details
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>Order ID: {pv.id.slice(0, 8).toUpperCase()}</span>
            <button 
              onClick={() => setReportOpen(true)}
              className="text-primary hover:underline"
            >
              Report an Issue
            </button>
            {!isUsed && !isExpired && (
              <button className="text-primary hover:underline flex items-center gap-1">
                <Gift className="h-3 w-3" /> Gift this key
              </button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Report Issue Modal */}
      <ReportIssueModal open={reportOpen} onOpenChange={setReportOpen} voucherId={pv.id} />
    </div>
  );
}

// ── Report Issue Modal ──
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

// ── Main Page ──
export default function MyVouchers() {
  const { user, loading } = useAuth();
  const [vouchers, setVouchers] = useState<PurchasedVoucher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [confirmRevealId, setConfirmRevealId] = useState<string | null>(null);
  const [revealCount, setRevealCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load vouchers from DB, fallback to mock
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
        // Use mock data with the current user's ID
        setVouchers(MOCK_PURCHASED.map(m => ({ ...m, user_id: user!.id })));
      }
      setDataLoaded(true);
    }
    load();
  }, [user]);

  // Handle reveal flow
  const handleRevealToggle = (id: string) => {
    if (revealedKeys.has(id)) {
      // Hide
      setRevealedKeys(prev => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      // Show confirm modal
      setConfirmRevealId(id);
    }
  };

  const confirmReveal = async () => {
    if (!confirmRevealId || !user) return;

    // Log reveal
    await supabase.from('key_reveal_logs').insert({
      user_id: user.id,
      purchased_voucher_id: confirmRevealId,
    });

    setRevealedKeys(prev => new Set(prev).add(confirmRevealId));
    setRevealCount(c => c + 1);
    setConfirmRevealId(null);
  };

  // Stats
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

  // Filter & sort
  const filteredVouchers = useMemo(() => {
    let list = [...vouchers];

    // Filter by tab
    if (filterTab !== 'all') {
      list = list.filter(v => v.status === filterTab);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => {
        const meta = getVoucherMeta(v.voucher_id);
        return (meta?.brand?.toLowerCase().includes(q)) || v.voucher_type.toLowerCase().includes(q) || v.platform.toLowerCase().includes(q);
      });
    }

    // Sort — expiring soon always float to top
    list.sort((a, b) => {
      const aDays = getDaysUntilExpiry(a.expires_at);
      const bDays = getDaysUntilExpiry(b.expires_at);
      const aExpiring = aDays !== null && aDays <= 7 && aDays > 0 && a.status === 'active';
      const bExpiring = bDays !== null && bDays <= 7 && bDays > 0 && b.status === 'active';
      if (aExpiring && !bExpiring) return -1;
      if (!aExpiring && bExpiring) return 1;

      switch (sortBy) {
        case 'date-desc': return new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime();
        case 'expiry': {
          if (!a.expires_at) return 1;
          if (!b.expires_at) return -1;
          return new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime();
        }
        case 'name-asc': {
          const aName = getVoucherMeta(a.voucher_id)?.brand || '';
          const bName = getVoucherMeta(b.voucher_id)?.brand || '';
          return aName.localeCompare(bName);
        }
        default: return 0;
      }
    });

    return list;
  }, [vouchers, filterTab, searchQuery, sortBy]);

  // Check if a voucher was purchased very recently (for "New" badge)
  const isNewPurchase = (pv: PurchasedVoucher) => {
    return Date.now() - new Date(pv.purchased_at).getTime() < 3600000; // within 1 hour
  };

  const FILTER_TABS: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'used', label: 'Used' },
    { id: 'expired', label: 'Expired' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold neon-text-cyan">My Vouchers</h1>
          <p className="text-muted-foreground mt-1">Your purchased game keys and voucher codes</p>
        </div>

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
            { label: 'Used', value: stats.used, icon: Check, color: 'text-muted-foreground' },
            { label: 'Expiring Soon', value: stats.expiringSoon, icon: Clock, color: stats.expiringSoon > 0 ? 'text-orange-400' : 'text-muted-foreground' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, platform..."
              className="pl-10 bg-input border-border"
            />
          </div>
          <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="expiry">Expiry Date</SelectItem>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter tabs */}
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

        {/* Content */}
        {!dataLoaded ? (
          <div className="text-center py-20 text-muted-foreground">Loading vouchers...</div>
        ) : vouchers.length === 0 ? (
          /* Empty state - no vouchers at all */
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No vouchers yet</h3>
            <p className="text-muted-foreground mb-6">You haven't purchased any vouchers yet.</p>
            <Link to="/vouchers">
              <Button className="bg-primary hover:bg-primary/90">Browse Voucher Store</Button>
            </Link>
          </div>
        ) : filteredVouchers.length === 0 ? (
          /* Empty filter results */
          <div className="text-center py-20">
            <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No vouchers match this filter</h3>
            <Button variant="outline" onClick={() => { setFilterTab('all'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVouchers.map(pv => (
              <VoucherCard
                key={pv.id}
                pv={pv}
                onReveal={handleRevealToggle}
                revealedKeys={revealedKeys}
                isNew={isNewPurchase(pv)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reveal Confirmation Modal */}
      <Dialog open={!!confirmRevealId} onOpenChange={(open) => !open && setConfirmRevealId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Reveal Key?
            </DialogTitle>
            <DialogDescription>
              Are you sure? For security, key reveals are logged.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmRevealId(null)}>Cancel</Button>
            <Button onClick={confirmReveal}>Yes, Reveal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
