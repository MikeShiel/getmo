export interface VoucherVariant {
  id: string;
  label: string;
  pointsCost: number;
  dollarValue: number;
}

export interface Voucher {
  id: string;
  brand: string;
  description: string;
  thumbnail: string;
  category: 'best-sellers' | 'recently-added' | 'trending';
  variants: VoucherVariant[];
  tags?: string[];
}

export const mockVouchers: Voucher[] = [
  {
    id: 'v-steam-1',
    brand: 'Steam',
    description: 'Unlock thousands of PC games on the world\'s largest gaming platform.',
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
    category: 'best-sellers',
    variants: [
      { id: 'steam-5', label: '$5', pointsCost: 500, dollarValue: 5 },
      { id: 'steam-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'steam-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'steam-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Popular', 'PC Gaming'],
  },
  {
    id: 'v-playstation-1',
    brand: 'PlayStation Store',
    description: 'Level up your console library with PS5 & PS4 games, DLCs, and add-ons.',
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    category: 'best-sellers',
    variants: [
      { id: 'ps-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'ps-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'ps-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Console', 'Hot'],
  },
  {
    id: 'v-xbox-1',
    brand: 'Xbox Gift Card',
    description: 'Fuel your Xbox experience with games, movies, and Game Pass subscriptions.',
    thumbnail: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop',
    category: 'best-sellers',
    variants: [
      { id: 'xbox-10', label: '$10', pointsCost: 1000, dollarValue: 10 },
      { id: 'xbox-25', label: '$25', pointsCost: 2500, dollarValue: 25 },
      { id: 'xbox-50', label: '$50', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Console'],
  },
  {
    id: 'v-nintendo-1',
    brand: 'Nintendo eShop',
    description: 'Grab the latest Switch titles and indie gems from the Nintendo eShop.',
    thumbnail: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    category: 'trending',
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
    variants: [
      { id: 'rbx-5', label: '400 Robux', pointsCost: 500, dollarValue: 5 },
      { id: 'rbx-10', label: '800 Robux', pointsCost: 1000, dollarValue: 10 },
      { id: 'rbx-25', label: '2000 Robux', pointsCost: 2500, dollarValue: 25 },
    ],
    tags: ['Trending', 'Kids'],
  },
  {
    id: 'v-spotify-1',
    brand: 'Spotify Premium',
    description: 'Ad-free music, offline listening, and on-demand podcasts.',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
    category: 'recently-added',
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
    variants: [
      { id: 'nfx-15', label: '1 Month', pointsCost: 1500, dollarValue: 15 },
      { id: 'nfx-30', label: '2 Months', pointsCost: 2800, dollarValue: 30 },
    ],
    tags: ['New', 'Entertainment'],
  },
  {
    id: 'v-valorant-1',
    brand: 'Valorant Points',
    description: 'Get VP for skins, battle passes, and agents in Riot\'s tactical shooter.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    category: 'trending',
    variants: [
      { id: 'val-5', label: '475 VP', pointsCost: 500, dollarValue: 5 },
      { id: 'val-10', label: '1000 VP', pointsCost: 1000, dollarValue: 10 },
      { id: 'val-25', label: '2575 VP', pointsCost: 2500, dollarValue: 25 },
      { id: 'val-50', label: '5350 VP', pointsCost: 5000, dollarValue: 50 },
    ],
    tags: ['Trending', 'FPS'],
  },
];

export function getVouchersByCategory(category: Voucher['category']) {
  return mockVouchers.filter(v => v.category === category);
}

export function getVoucherById(id: string) {
  return mockVouchers.find(v => v.id === id);
}
