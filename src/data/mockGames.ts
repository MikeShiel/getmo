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
  tags?: string[];
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
  },
  { id: "11", title: "Block Breaker", description: "Smash blocks in this addictive arcade classic.", thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=450&fit=crop", game_url: "https://example.com/games/block-breaker", is_free: true, is_featured: false, genre: "Arcade", publisher: "Arcade Legends", screenshots: ["https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200"], rating: 4.2, play_count: 52000 },
  { id: "12", title: "Chess Master", description: "Sharpen your mind with classic chess.", thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=450&fit=crop", game_url: "https://example.com/games/chess-master", is_free: true, is_featured: false, genre: "Strategy", publisher: "MindPlay", screenshots: ["https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200"], rating: 4.7, play_count: 64000 },
  { id: "13", title: "Sudoku Pro", description: "The ultimate sudoku challenge.", thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=450&fit=crop", game_url: "https://example.com/games/sudoku-pro", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: ["https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200"], rating: 4.5, play_count: 41000 },
  { id: "14", title: "Match Mania", description: "Match-3 puzzle fun for everyone.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=450&fit=crop", game_url: "https://example.com/games/match-mania", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: ["https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200"], rating: 4.4, play_count: 73000 },
  { id: "15", title: "Word Quest", description: "Find hidden words in tricky grids.", thumbnail: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=450&fit=crop", game_url: "https://example.com/games/word-quest", is_free: true, is_featured: false, genre: "Puzzle", publisher: "WordWorks", screenshots: ["https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=1200"], rating: 4.3, play_count: 38000 },
  { id: "16", title: "Memory Flip", description: "Test and train your memory skills.", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=450&fit=crop", game_url: "https://example.com/games/memory-flip", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200"], rating: 4.1, play_count: 29000 },
  { id: "17", title: "Kart Rush", description: "Wild kart racing with crazy power-ups.", thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=450&fit=crop", game_url: "https://example.com/games/kart-rush", is_free: true, is_featured: false, genre: "Racing", publisher: "Speed Demons", screenshots: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?w=1200"], rating: 4.5, play_count: 81000 },
  { id: "18", title: "Bubble Pop", description: "Pop bubbles in colorful combos.", thumbnail: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=800&h=450&fit=crop", game_url: "https://example.com/games/bubble-pop", is_free: true, is_featured: false, genre: "Casual", publisher: "Casual Co", screenshots: ["https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=1200"], rating: 4.6, play_count: 95000 },
  { id: "19", title: "Jelly Jump", description: "Hop your jelly to the top!", thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=450&fit=crop", game_url: "https://example.com/games/jelly-jump", is_free: true, is_featured: false, genre: "Casual", publisher: "Kiddo Games", screenshots: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200"], rating: 4.4, play_count: 60000 },
  { id: "20", title: "Animal Friends", description: "Adorable animal adventures for kids.", thumbnail: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=450&fit=crop", game_url: "https://example.com/games/animal-friends", is_free: true, is_featured: false, genre: "Casual", publisher: "Kiddo Games", screenshots: ["https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200"], rating: 4.8, play_count: 110000 },
  { id: "21", title: "Dino Dash", description: "Run with dinos in this kid-friendly runner.", thumbnail: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&h=450&fit=crop", game_url: "https://example.com/games/dino-dash", is_free: true, is_featured: false, genre: "Arcade", publisher: "Kiddo Games", screenshots: ["https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=1200"], rating: 4.5, play_count: 72000 },
  { id: "22", title: "Mind Maze", description: "Brain-bending mazes and logic puzzles.", thumbnail: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=800&h=450&fit=crop", game_url: "https://example.com/games/mind-maze", is_free: true, is_featured: false, genre: "Strategy", publisher: "MindPlay", screenshots: ["https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=1200"], rating: 4.6, play_count: 47000 },
  { id: "23", title: "Cube Stack", description: "Stack cubes higher than you ever imagined.", thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=450&fit=crop", game_url: "https://example.com/games/cube-stack", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: ["https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200"], rating: 4.2, play_count: 33000 },
  { id: "24", title: "Sky Pilot", description: "Fly through obstacle-filled skies.", thumbnail: "https://images.unsplash.com/photo-1559125148-869baf508c95?w=800&h=450&fit=crop", game_url: "https://example.com/games/sky-pilot", is_free: true, is_featured: false, genre: "Action", publisher: "Shadow Arts", screenshots: ["https://images.unsplash.com/photo-1559125148-869baf508c95?w=1200"], rating: 4.3, play_count: 56000 }
  ,
  { id: "subway-surfers-berlin", title: "Subway Surfers Berlin", description: "Dash through the streets of Berlin in the latest Subway Surfers world tour. Dodge trains, grab power-ups, and rack up high scores in this iconic endless runner.", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop", game_url: "https://example.com/games/subway-surfers-berlin", is_free: true, is_featured: true, genre: "Arcade", publisher: "SYBO Games", screenshots: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"], rating: 4.8, play_count: 1200000 },
  { id: "bouncemasters", title: "Bouncemasters: Penguin", description: "Launch the penguin as far as you can! Upgrade gear, hit perfect bounces, and unlock crazy new tools in this addictive distance game.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=450&fit=crop", game_url: "https://example.com/games/bouncemasters", is_free: true, is_featured: true, genre: "Arcade", publisher: "Playgendary", screenshots: ["https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200"], rating: 4.6, play_count: 540000 },
  { id: "speedy-runner", title: "Speedy Runner", description: "Sprint, slide, and leap through neon-soaked levels. A fast-paced runner that rewards quick reflexes and clean lines.", thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=450&fit=crop", game_url: "https://example.com/games/speedy-runner", is_free: true, is_featured: true, genre: "Arcade", publisher: "Pixel Forge", screenshots: ["https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200"], rating: 4.5, play_count: 320000 },
  { id: "cut-the-rope", title: "Cut the Rope", description: "Feed the candy to Om Nom by slicing ropes in just the right order. A timeless physics puzzler with hundreds of brain-bending levels.", thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=450&fit=crop", game_url: "https://example.com/games/cut-the-rope", is_free: true, is_featured: true, genre: "Puzzle", publisher: "ZeptoLab", screenshots: ["https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200"], rating: 4.9, play_count: 890000 }
];

export const getFreeGames = () => mockGames.filter(game => game.is_free);
export const getFeaturedGames = () => mockGames.filter(game => game.is_featured);
export const getTrendingGames = () => [...mockGames].sort((a, b) => b.play_count - a.play_count).slice(0, 6);
export const getMostLovedGames = () => [...mockGames].sort((a, b) => b.rating - a.rating).slice(0, 6);
export const getGameById = (id: string) => mockGames.find(game => game.id === id);
export const getGamesByGenre = (genre: string, excludeId?: string) => 
  mockGames.filter(game => game.genre === genre && game.id !== excludeId).slice(0, 4);
