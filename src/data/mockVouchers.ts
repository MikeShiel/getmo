export interface VoucherVariant {
  id: string;
  label: string;
  pointsCost: number;
  dollarValue: number;
}

export type VoucherCategory = 'best-sellers' | 'recently-added' | 'trending';
export type VoucherType = 'games' | 'gift-cards' | 'subscriptions';

export interface VoucherRegion {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  /** multiplier applied to pointsCost for this region (1 = default) */
  priceMultiplier: number;
}

export interface Voucher {
  id: string;
  brand: string;
  description: string;
  thumbnail: string;
  category: VoucherCategory;
  type: VoucherType;
  platform: string;
  variants: VoucherVariant[];
  tags?: string[];
  discountPercent?: number;
  spotlight?: boolean;
  regions?: VoucherRegion[];
  instructions?: string[];
}

export const mockVouchers: Voucher[] = [
  // ─── BEST SELLERS ───
  {
    id: 'v-steam-1',
    brand: 'Steam Wallet',
    description: 'Unlock thousands of PC games on the world\'s largest gaming platform.',
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'games',
    platform: 'PC',
    spotlight: true,
    discountPercent: 15,
    variants: [
      { id: 'steam-5', label: '$5', pointsCost: 500, dollarValue: 5 },
      { id: 'steam-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'steam-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'steam-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Popular', 'PC'],
    regions: [
      { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', priceMultiplier: 1 },
      { code: 'EU', name: 'Europe', flag: '🇪🇺', currency: 'EUR', currencySymbol: '€', priceMultiplier: 0.95 },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', priceMultiplier: 0.85 },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', currencySymbol: '₺', priceMultiplier: 0.35 },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS', currencySymbol: 'ARS$', priceMultiplier: 0.25 },
    ],
    instructions: [
      'Log in to your Steam account on desktop or mobile.',
      'Navigate to your account name → "Account Details".',
      'Click "Add funds to your Steam Wallet".',
      'Select "Redeem a Steam Wallet Code" and enter your code.',
      'Funds will be added instantly to your wallet balance.',
    ],
  },
  {
    id: 'v-playstation-1',
    brand: 'PlayStation Store',
    description: 'Level up your console library with PS5 & PS4 games, DLCs, and add-ons.',
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'games',
    platform: 'PlayStation',
    spotlight: true,
    discountPercent: 20,
    variants: [
      { id: 'ps-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'ps-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'ps-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Console', 'Hot'],
    regions: [
      { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', priceMultiplier: 1 },
      { code: 'EU', name: 'Europe', flag: '🇪🇺', currency: 'EUR', currencySymbol: '€', priceMultiplier: 0.95 },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', priceMultiplier: 0.85 },
      { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥', priceMultiplier: 1.5 },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', currencySymbol: 'SAR', priceMultiplier: 0.38 },
      { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', currencySymbol: 'AED', priceMultiplier: 0.37 },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', currencySymbol: '₺', priceMultiplier: 0.35 },
    ],
    instructions: [
      'Sign in to the PlayStation Store on your console or web browser.',
      'Go to your avatar icon → "Redeem Codes".',
      'Enter the 12-digit voucher code exactly as shown.',
      'Confirm the redemption—funds appear in your PSN Wallet.',
      'Important: Your PSN account region must match the voucher region.',
    ],
  },
  {
    id: 'v-xbox-1',
    brand: 'Xbox Gift Card',
    description: 'Fuel your Xbox experience with games, movies, and Game Pass subscriptions.',
    thumbnail: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'gift-cards',
    platform: 'Xbox',
    variants: [
      { id: 'xbox-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'xbox-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'xbox-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Console'],
  },
  {
    id: 'v-ea-play',
    brand: 'EA Play',
    description: 'Access a vault of EA titles including FIFA, Battlefield, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'subscriptions',
    platform: 'Multi',
    discountPercent: 10,
    variants: [
      { id: 'ea-1m', label: '1 Month', pointsCost: 500, dollarValue: 5 },
      { id: 'ea-12m', label: '12 Months', pointsCost: 3000, dollarValue: 30 },
    ],
    tags: ['Popular'],
  },
  {
    id: 'v-google-play',
    brand: 'Google Play',
    description: 'Apps, games, movies, and books from the Google Play Store.',
    thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'gift-cards',
    platform: 'Android',
    variants: [
      { id: 'gp-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'gp-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'gp-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Mobile'],
  },
  {
    id: 'v-apple-gc',
    brand: 'Apple Gift Card',
    description: 'Use for App Store, Apple Music, iCloud+, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1591337676887-a217a6c25e63?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'gift-cards',
    platform: 'iOS',
    variants: [
      { id: 'apple-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'apple-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'apple-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
      { id: 'apple-100', label: '$100', pointsCost: 10000, dollarValue: 100 },
    ],
    tags: ['Popular'],
  },
  {
    id: 'v-riot-points',
    brand: 'Riot Points (LoL)',
    description: 'Get RP for skins, champions, and event passes in League of Legends.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'games',
    platform: 'PC',
    variants: [
      { id: 'rp-5', label: '650 RP', pointsCost: 500, dollarValue: 5 },
      { id: 'rp-10', label: '1380 RP', pointsCost: 1000, dollarValue: 10 },
      { id: 'rp-25', label: '3500 RP', pointsCost: 2500, dollarValue: 25 },
    ],
    tags: ['MOBA'],
  },
  {
    id: 'v-gamepass',
    brand: 'Xbox Game Pass',
    description: 'Hundreds of games on console, PC, and cloud with Game Pass Ultimate.',
    thumbnail: 'https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?w=400&h=300&fit=crop',
    category: 'best-sellers',
    type: 'subscriptions',
    platform: 'Xbox',
    discountPercent: 12,
    variants: [
      { id: 'gp-1m', label: '1 Month', pointsCost: 1500, dollarValue: 15 },
      { id: 'gp-3m', label: '3 Months', pointsCost: 4000, dollarValue: 40 },
    ],
    tags: ['Hot', 'Subscription'],
  },

  // ─── TRENDING ───
  {
    id: 'v-nintendo-1',
    brand: 'Nintendo eShop',
    description: 'Grab the latest Switch titles and indie gems from the Nintendo eShop.',
    thumbnail: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Switch',
    variants: [
      { id: 'nin-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'nin-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'nin-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Trending', 'Family'],
  },
  {
    id: 'v-roblox-1',
    brand: 'Roblox',
    description: 'Get Robux to customize your avatar and access premium experiences.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    variants: [
      { id: 'rbx-5', label: '400 Robux', pointsCost: 500, dollarValue: 5 },
      { id: 'rbx-10', label: '800 Robux', pointsCost: 1000, dollarValue: 10 },
      { id: 'rbx-25', label: '2000 Robux', pointsCost: 2500, dollarValue: 25 },
    ],
    tags: ['Trending', 'Kids'],
  },
  {
    id: 'v-valorant-1',
    brand: 'Valorant Points',
    description: 'Get VP for skins, battle passes, and agents in Riot\'s tactical shooter.',
    thumbnail: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'PC',
    spotlight: true,
    discountPercent: 25,
    variants: [
      { id: 'val-5', label: '475 VP', pointsCost: 500, dollarValue: 5 },
      { id: 'val-10', label: '1000 VP', pointsCost: 1000, dollarValue: 10 },
      { id: 'val-25', label: '2575 VP', pointsCost: 2500, dollarValue: 25 },
      { id: 'val-50', label: '5350 VP', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Trending', 'FPS'],
  },
  {
    id: 'v-fortnite',
    brand: 'Fortnite V-Bucks',
    description: 'Buy skins, emotes, and battle passes in Fortnite.',
    thumbnail: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    discountPercent: 8,
    variants: [
      { id: 'fn-1k', label: '1,000 V-Bucks', pointsCost: 800, dollarValue: 8 },
      { id: 'fn-27', label: '2,800 V-Bucks', pointsCost: 2000, dollarValue: 20 },
      { id: 'fn-5k', label: '5,000 V-Bucks', pointsCost: 3200, dollarValue: 32 },
    ],
    tags: ['Battle Royale'],
  },
  {
    id: 'v-minecraft',
    brand: 'Minecraft',
    description: 'Minecoins for marketplace skins, texture packs, and worlds.',
    thumbnail: 'https://images.unsplash.com/photo-1587573089734-599d584d1952?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    variants: [
      { id: 'mc-320', label: '320 Coins', pointsCost: 200, dollarValue: 2 },
      { id: 'mc-1020', label: '1,020 Coins', pointsCost: 600, dollarValue: 6 },
      { id: 'mc-1720', label: '1,720 Coins', pointsCost: 1000, dollarValue: 10 },
    ],
    tags: ['Trending', 'Sandbox'],
  },
  {
    id: 'v-apex',
    brand: 'Apex Legends Coins',
    description: 'Apex Coins for legends, skins, and battle passes.',
    thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    variants: [
      { id: 'apex-1k', label: '1,000 Coins', pointsCost: 1000, dollarValue: 10 },
      { id: 'apex-27', label: '2,150 Coins', pointsCost: 2000, dollarValue: 20 },
      { id: 'apex-4k', label: '4,350 Coins', pointsCost: 4000, dollarValue: 40 },
    ],
    tags: ['FPS'],
  },
  {
    id: 'v-genshin',
    brand: 'Genshin Impact',
    description: 'Genesis Crystals for wishes, characters, and weapons.',
    thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    discountPercent: 5,
    variants: [
      { id: 'gen-300', label: '300 Crystals', pointsCost: 500, dollarValue: 5 },
      { id: 'gen-980', label: '980 Crystals', pointsCost: 1500, dollarValue: 15 },
      { id: 'gen-1980', label: '1,980 Crystals', pointsCost: 3000, dollarValue: 30 },
    ],
    tags: ['RPG', 'Anime'],
  },
  {
    id: 'v-cod-points',
    brand: 'COD Points',
    description: 'Call of Duty Points for battle passes, operators, and blueprints.',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=400&h=300&fit=crop',
    category: 'trending',
    type: 'games',
    platform: 'Multi',
    variants: [
      { id: 'cod-1k', label: '1,100 CP', pointsCost: 1000, dollarValue: 10 },
      { id: 'cod-2k', label: '2,400 CP', pointsCost: 2000, dollarValue: 20 },
      { id: 'cod-5k', label: '5,000 CP', pointsCost: 4000, dollarValue: 40 },
    ],
    tags: ['FPS'],
  },

  // ─── RECENTLY ADDED ───
  {
    id: 'v-spotify-1',
    brand: 'Spotify Premium',
    description: 'Ad-free music, offline listening, and on-demand podcasts.',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'subscriptions',
    platform: 'Multi',
    variants: [
      { id: 'spot-10', label: '1 Month', pointsCost: 1000, dollarValue: 10 },
      { id: 'spot-30', label: '3 Months', pointsCost: 2800, dollarValue: 30 },
    ],
    tags: ['New', 'Music'],
  },
  {
    id: 'v-amazon-1',
    brand: 'Amazon',
    description: 'Shop millions of products—from tech to everyday essentials.',
    thumbnail: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'gift-cards',
    platform: 'Multi',
    discountPercent: 10,
    variants: [
      { id: 'amz-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'amz-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'amz-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
      { id: 'amz-100', label: '$100', pointsCost: 10000, dollarValue: 100 },
    ],
    tags: ['New', 'Shopping'],
  },
  {
    id: 'v-netflix-1',
    brand: 'Netflix',
    description: 'Binge your favorite shows, movies, and originals—no interruptions.',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'subscriptions',
    platform: 'Multi',
    variants: [
      { id: 'nfx-15', label: '1 Month', pointsCost: 1500, dollarValue: 15 },
      { id: 'nfx-30', label: '2 Months', pointsCost: 2800, dollarValue: 30 },
    ],
    tags: ['New', 'Entertainment'],
  },
  {
    id: 'v-disney',
    brand: 'Disney+',
    description: 'Stream Disney, Pixar, Marvel, Star Wars, and National Geographic.',
    thumbnail: 'https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'subscriptions',
    platform: 'Multi',
    variants: [
      { id: 'dis-1m', label: '1 Month', pointsCost: 800, dollarValue: 8 },
      { id: 'dis-12m', label: '12 Months', pointsCost: 8000, dollarValue: 80 },
    ],
    tags: ['New', 'Streaming'],
  },
  {
    id: 'v-uber-eats',
    brand: 'Uber Eats',
    description: 'Order food from your favorite restaurants delivered to your door.',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'gift-cards',
    platform: 'Multi',
    variants: [
      { id: 'ub-15', label: '$15', pointsCost: 1500, dollarValue: 15 },
      { id: 'ub-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'ub-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['New', 'Food'],
  },
  {
    id: 'v-doordash',
    brand: 'DoorDash',
    description: 'Gift cards for food delivery from local restaurants and chains.',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'gift-cards',
    platform: 'Multi',
    variants: [
      { id: 'dd-15', label: '$15', pointsCost: 1500, dollarValue: 15 },
      { id: 'dd-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
    ],
    tags: ['New', 'Food'],
  },
  {
    id: 'v-youtube',
    brand: 'YouTube Premium',
    description: 'Ad-free videos, background play, and YouTube Music Premium.',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'subscriptions',
    platform: 'Multi',
    variants: [
      { id: 'yt-1m', label: '1 Month', pointsCost: 1200, dollarValue: 12 },
      { id: 'yt-3m', label: '3 Months', pointsCost: 3200, dollarValue: 32 },
    ],
    tags: ['New', 'Streaming'],
  },
  {
    id: 'v-psplus',
    brand: 'PS Plus',
    description: 'Online multiplayer, free monthly games, and exclusive discounts.',
    thumbnail: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=400&h=300&fit=crop',
    category: 'recently-added',
    type: 'subscriptions',
    platform: 'PlayStation',
    discountPercent: 15,
    variants: [
      { id: 'psp-1m', label: '1 Month', pointsCost: 1000, dollarValue: 10 },
      { id: 'psp-3m', label: '3 Months', pointsCost: 2500, dollarValue: 25 },
      { id: 'psp-12m', label: '12 Months', pointsCost: 6000, dollarValue: 60 },
    ],
    tags: ['New', 'Console'],
  },
];

export function getVouchersByCategory(category: VoucherCategory) {
  return mockVouchers.filter(v => v.category === category);
}

export function getSpotlightVouchers() {
  return mockVouchers.filter(v => v.spotlight);
}

export function getVoucherById(id: string) {
  return mockVouchers.find(v => v.id === id);
}

export function searchVouchers(query: string, type?: VoucherType, maxPrice?: number) {
  return mockVouchers.filter(v => {
    const matchesQuery = !query || v.brand.toLowerCase().includes(query.toLowerCase()) || v.description.toLowerCase().includes(query.toLowerCase());
    const matchesType = !type || v.type === type;
    const matchesPrice = !maxPrice || v.variants.some(variant => variant.pointsCost <= maxPrice);
    return matchesQuery && matchesType && matchesPrice;
  });
}
