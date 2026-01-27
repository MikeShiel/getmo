export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  game_url: string;
  is_free: boolean;
  is_featured: boolean;
  genre: string;
  publisher: string;
  screenshots: string[];
  rating: number;
  play_count: number;
}

export const mockGames: Game[] = [
  {
    id: "1",
    title: "Neon Rider",
    description: "Race through a futuristic cityscape on your neon-powered hoverbike. Dodge obstacles, collect power-ups, and beat your high score in this endless runner with stunning cyberpunk visuals.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/neon-rider",
    is_free: true,
    is_featured: true,
    genre: "Racing",
    publisher: "CyberGames Studio",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200"
    ],
    rating: 4.8,
    play_count: 125000
  },
  {
    id: "2",
    title: "Starbase Commander",
    description: "Build and defend your space station against waves of alien invaders. Manage resources, research new technologies, and command your fleet in this epic strategy game.",
    thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/starbase-commander",
    is_free: false,
    is_featured: true,
    genre: "Strategy",
    publisher: "Stellar Interactive",
    screenshots: [
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200"
    ],
    rating: 4.6,
    play_count: 89000
  },
  {
    id: "3",
    title: "Pixel Dungeon",
    description: "Descend into procedurally generated dungeons filled with monsters, treasures, and secrets. Classic roguelike gameplay with modern polish.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/pixel-dungeon",
    is_free: true,
    is_featured: false,
    genre: "Roguelike",
    publisher: "RetroPixel Games",
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200"
    ],
    rating: 4.5,
    play_count: 67000
  },
  {
    id: "4",
    title: "Cyber Puzzle",
    description: "Hack into the mainframe by solving increasingly complex puzzles. A mind-bending puzzle game with a hacker aesthetic.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/cyber-puzzle",
    is_free: true,
    is_featured: false,
    genre: "Puzzle",
    publisher: "Neural Networks",
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200"
    ],
    rating: 4.3,
    play_count: 45000
  },
  {
    id: "5",
    title: "Space Shooter X",
    description: "Classic arcade action in deep space. Blast through asteroid fields and enemy squadrons in this fast-paced shooter.",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/space-shooter-x",
    is_free: true,
    is_featured: false,
    genre: "Arcade",
    publisher: "Arcade Legends",
    screenshots: [
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200"
    ],
    rating: 4.4,
    play_count: 78000
  },
  {
    id: "6",
    title: "Ninja Legends",
    description: "Master the way of the ninja in this action-packed platformer. Wall-jump, dash, and slice through enemies.",
    thumbnail: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/ninja-legends",
    is_free: true,
    is_featured: false,
    genre: "Action",
    publisher: "Shadow Arts",
    screenshots: [
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200"
    ],
    rating: 4.7,
    play_count: 92000
  },
  {
    id: "7",
    title: "Dragon Quest Online",
    description: "Embark on an epic adventure in a vast fantasy world. Team up with friends to defeat legendary dragons.",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/dragon-quest",
    is_free: false,
    is_featured: true,
    genre: "RPG",
    publisher: "Fantasy Realms",
    screenshots: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200"
    ],
    rating: 4.9,
    play_count: 156000
  },
  {
    id: "8",
    title: "Tower Defense Pro",
    description: "Strategically place towers to stop waves of enemies. Hundreds of levels and endless challenges await.",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/tower-defense",
    is_free: false,
    is_featured: false,
    genre: "Strategy",
    publisher: "Tactical Games",
    screenshots: [
      "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200"
    ],
    rating: 4.2,
    play_count: 34000
  },
  {
    id: "9",
    title: "Racing Thunder",
    description: "Feel the adrenaline in this high-octane racing game. Customize your car and dominate the track.",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/racing-thunder",
    is_free: false,
    is_featured: false,
    genre: "Racing",
    publisher: "Speed Demons",
    screenshots: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200"
    ],
    rating: 4.5,
    play_count: 67000
  },
  {
    id: "10",
    title: "Zombie Survival",
    description: "Survive the apocalypse in this intense survival horror game. Scavenge, build, and fight the undead.",
    thumbnail: "https://images.unsplash.com/photo-1509248961895-a8880a8b0816?w=800&h=450&fit=crop",
    game_url: "https://example.com/games/zombie-survival",
    is_free: false,
    is_featured: false,
    genre: "Horror",
    publisher: "Dark Studios",
    screenshots: [
      "https://images.unsplash.com/photo-1509248961895-a8880a8b0816?w=1200"
    ],
    rating: 4.6,
    play_count: 88000
  }
];

export const getFreeGames = () => mockGames.filter(game => game.is_free);
export const getFeaturedGames = () => mockGames.filter(game => game.is_featured);
export const getTrendingGames = () => [...mockGames].sort((a, b) => b.play_count - a.play_count).slice(0, 6);
export const getMostLovedGames = () => [...mockGames].sort((a, b) => b.rating - a.rating).slice(0, 6);
export const getGameById = (id: string) => mockGames.find(game => game.id === id);
export const getGamesByGenre = (genre: string, excludeId?: string) => 
  mockGames.filter(game => game.genre === genre && game.id !== excludeId).slice(0, 4);
