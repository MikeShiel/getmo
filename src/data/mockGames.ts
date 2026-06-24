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
  ,
  // Editor's Pick
  { id: "archer-go", title: "Archer Go", description: "Hit moving targets with pinpoint precision.", thumbnail: "https://images.unsplash.com/photo-1518563259479-d003c05a6507?w=400&h=400&fit=crop", game_url: "https://example.com/games/archer-go", is_free: true, is_featured: false, genre: "Action", publisher: "Pixel Forge", screenshots: [], rating: 4.5, play_count: 210000, tags: ["editors-pick"] },
  { id: "excavahengos", title: "Excavahengos", description: "Dig deep, find treasure.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop", game_url: "https://example.com/games/excavahengos", is_free: true, is_featured: false, genre: "Casual", publisher: "Casual Co", screenshots: [], rating: 4.3, play_count: 91000, tags: ["editors-pick"] },
  { id: "ropy-hero", title: "Ropy Hero", description: "Swing across the city as a rope-slinging hero.", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop", game_url: "https://example.com/games/ropy-hero", is_free: true, is_featured: false, genre: "Action", publisher: "Shadow Arts", screenshots: [], rating: 4.4, play_count: 175000, tags: ["editors-pick"] },
  { id: "tank-stars", title: "Tank Stars", description: "Aim, fire, dominate the battlefield.", thumbnail: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=400&fit=crop", game_url: "https://example.com/games/tank-stars", is_free: true, is_featured: false, genre: "Action", publisher: "Playgendary", screenshots: [], rating: 4.7, play_count: 340000, tags: ["editors-pick", "just-dropped"] },
  { id: "blocky-warriors", title: "Blocky Warriors", description: "Blocky shooter mayhem.", thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=400&fit=crop", game_url: "https://example.com/games/blocky-warriors", is_free: true, is_featured: false, genre: "Action", publisher: "Pixel Forge", screenshots: [], rating: 4.2, play_count: 64000, tags: ["editors-pick"] },
  { id: "archer-hero", title: "Archer Hero", description: "Train your aim, ascend the ranks.", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop", game_url: "https://example.com/games/archer-hero", is_free: true, is_featured: false, genre: "Action", publisher: "Pixel Forge", screenshots: [], rating: 4.5, play_count: 88000, tags: ["editors-pick"] },
  { id: "speed-pool", title: "Speed Pool", description: "Fast-paced 8-ball pool against the clock.", thumbnail: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=400&fit=crop", game_url: "https://example.com/games/speed-pool", is_free: true, is_featured: false, genre: "Sport", publisher: "Casual Co", screenshots: [], rating: 4.3, play_count: 120000, tags: ["editors-pick"] },
  { id: "shinobi-slash", title: "Shinobi Slash", description: "Ninja slashing action.", thumbnail: "https://images.unsplash.com/photo-1601933470928-c4d56b97f4d8?w=400&h=400&fit=crop", game_url: "https://example.com/games/shinobi-slash", is_free: true, is_featured: false, genre: "Action", publisher: "Shadow Arts", screenshots: [], rating: 4.6, play_count: 145000, tags: ["editors-pick"] },
  { id: "xmas-furious", title: "Xmas Furious", description: "Holiday-themed festive runner.", thumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop", game_url: "https://example.com/games/xmas-furious", is_free: true, is_featured: false, genre: "Arcade", publisher: "Casual Co", screenshots: [], rating: 4.4, play_count: 56000, tags: ["editors-pick"] },
  { id: "flappy-wow", title: "Flappy WOW", description: "The flappiest game you'll ever play.", thumbnail: "https://images.unsplash.com/photo-1572177812156-58036aae439c?w=400&h=400&fit=crop", game_url: "https://example.com/games/flappy-wow", is_free: true, is_featured: false, genre: "Arcade", publisher: "Casual Co", screenshots: [], rating: 4.2, play_count: 73000, tags: ["editors-pick"] },

  // Just Dropped
  { id: "battle-racing", title: "Battle Racing", description: "Race and battle simultaneously.", thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop", game_url: "https://example.com/games/battle-racing", is_free: true, is_featured: false, genre: "Racing", publisher: "Speed Demons", screenshots: [], rating: 4.5, play_count: 92000, tags: ["just-dropped"] },
  { id: "we-baby-bears", title: "We Baby Bears", description: "Cute adventures with baby bears.", thumbnail: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=400&fit=crop", game_url: "https://example.com/games/we-baby-bears", is_free: true, is_featured: false, genre: "Casual", publisher: "Kiddo Games", screenshots: [], rating: 4.6, play_count: 38000, tags: ["just-dropped"] },
  { id: "crazy-fruit", title: "Crazy Fruit", description: "Match crazy fruit combos.", thumbnail: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=400&h=400&fit=crop", game_url: "https://example.com/games/crazy-fruit", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: [], rating: 4.3, play_count: 42000, tags: ["just-dropped"] },
  { id: "merge-fantasy", title: "Merge Fantasy", description: "Merge magical creatures.", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop", game_url: "https://example.com/games/merge-fantasy", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.4, play_count: 51000, tags: ["just-dropped"] },
  { id: "rabbit-samurai", title: "Rabbit Samurai", description: "Samurai bunny on a quest.", thumbnail: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=400&fit=crop", game_url: "https://example.com/games/rabbit-samurai", is_free: true, is_featured: false, genre: "Action", publisher: "Shadow Arts", screenshots: [], rating: 4.5, play_count: 67000, tags: ["just-dropped"] },
  { id: "runaway-toad", title: "Runaway Toad", description: "Hop, dodge, escape!", thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=400&fit=crop", game_url: "https://example.com/games/runaway-toad", is_free: true, is_featured: false, genre: "Arcade", publisher: "Kiddo Games", screenshots: [], rating: 4.2, play_count: 33000, tags: ["just-dropped"] },
  { id: "cut-the-rope-magic", title: "Cut the Rope Magic", description: "Magical physics puzzles.", thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", game_url: "https://example.com/games/cut-the-rope-magic", is_free: true, is_featured: false, genre: "Puzzle", publisher: "ZeptoLab", screenshots: [], rating: 4.8, play_count: 220000, tags: ["just-dropped"] },
  { id: "mini-blocks", title: "Mini Blocks", description: "Build worlds out of tiny blocks.", thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop", game_url: "https://example.com/games/mini-blocks", is_free: true, is_featured: false, genre: "Casual", publisher: "BrainBox", screenshots: [], rating: 4.4, play_count: 41000, tags: ["just-dropped"] },
  { id: "pixel-adventure", title: "Pixel Adventure", description: "Retro pixel platforming.", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop", game_url: "https://example.com/games/pixel-adventure", is_free: true, is_featured: false, genre: "Arcade", publisher: "Pixel Forge", screenshots: [], rating: 4.6, play_count: 58000, tags: ["just-dropped"] },
  { id: "fish-out-of-water", title: "Fish Out of Water", description: "Skip stones across the sea.", thumbnail: "https://images.unsplash.com/photo-1559125148-869baf508c95?w=400&h=400&fit=crop", game_url: "https://example.com/games/fish-out-of-water", is_free: true, is_featured: false, genre: "Casual", publisher: "Casual Co", screenshots: [], rating: 4.3, play_count: 29000, tags: ["just-dropped"] },

  // Most Popular on Cloud
  { id: "bouncemaster-cloud", title: "Bouncemaster", description: "Bounce to glory in the cloud.", thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=400&fit=crop", game_url: "https://example.com/games/bouncemaster-cloud", is_free: true, is_featured: false, genre: "Arcade", publisher: "Playgendary", screenshots: [], rating: 4.5, play_count: 410000, tags: ["cloud"] },
  { id: "chimpact-run", title: "Chimpact Run", description: "Swing through the jungle.", thumbnail: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=400&fit=crop", game_url: "https://example.com/games/chimpact-run", is_free: true, is_featured: false, genre: "Arcade", publisher: "Kiddo Games", screenshots: [], rating: 4.4, play_count: 78000, tags: ["cloud"] },
  { id: "royal-jewels", title: "Royal Jewels", description: "Jewel matching with royal flair.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop", game_url: "https://example.com/games/royal-jewels", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.6, play_count: 96000, tags: ["cloud"] },
  { id: "space-miner", title: "Space Miner", description: "Mine asteroids for rare ore.", thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop", game_url: "https://example.com/games/space-miner", is_free: true, is_featured: false, genre: "Strategy", publisher: "Stellar Interactive", screenshots: [], rating: 4.5, play_count: 64000, tags: ["cloud"] },
  { id: "bomber-friends", title: "Bomber Friends", description: "Blow up your friends.", thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=400&fit=crop", game_url: "https://example.com/games/bomber-friends", is_free: true, is_featured: false, genre: "Action", publisher: "Pixel Forge", screenshots: [], rating: 4.7, play_count: 134000, tags: ["cloud"] },
  { id: "zipline-rescue", title: "Zipline Rescue", description: "Save lives on the zipline.", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop", game_url: "https://example.com/games/zipline-rescue", is_free: true, is_featured: false, genre: "Action", publisher: "Shadow Arts", screenshots: [], rating: 4.3, play_count: 48000, tags: ["cloud"] },
  { id: "diamond-rush", title: "Diamond Rush", description: "Run for the diamonds!", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop", game_url: "https://example.com/games/diamond-rush", is_free: true, is_featured: false, genre: "Arcade", publisher: "Pixel Forge", screenshots: [], rating: 4.5, play_count: 87000, tags: ["cloud"] },
  { id: "daddy-escape", title: "Daddy Escape", description: "Help dad escape the maze.", thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop", game_url: "https://example.com/games/daddy-escape", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: [], rating: 4.2, play_count: 32000, tags: ["cloud"] },
  { id: "daddy-rescue", title: "Daddy Rescue", description: "Now rescue dad.", thumbnail: "https://images.unsplash.com/photo-1612831455540-c54c0fdf3fcd?w=400&h=400&fit=crop", game_url: "https://example.com/games/daddy-rescue", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: [], rating: 4.1, play_count: 26000, tags: ["cloud"] },
  { id: "panda-jewels", title: "Panda Jewels", description: "Pandas love jewels too.", thumbnail: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop", game_url: "https://example.com/games/panda-jewels", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.4, play_count: 51000, tags: ["cloud"] },

  // Zombie Saga
  { id: "zombie-defense", title: "Zombie Defense", description: "Defend against zombie hordes.", thumbnail: "https://images.unsplash.com/photo-1509248961895-a8880a8b0816?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-defense", is_free: true, is_featured: false, genre: "Action", publisher: "Dark Studios", screenshots: [], rating: 4.5, play_count: 88000, tags: ["zombie"] },
  { id: "zombie-survival-2", title: "Zombie Survival", description: "Endure the apocalypse.", thumbnail: "https://images.unsplash.com/photo-1509248961895-a8880a8b0816?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-survival-2", is_free: true, is_featured: false, genre: "Action", publisher: "Dark Studios", screenshots: [], rating: 4.6, play_count: 91000, tags: ["zombie"] },
  { id: "earn-to-die", title: "Earn to Die", description: "Drive through the undead.", thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop", game_url: "https://example.com/games/earn-to-die", is_free: true, is_featured: false, genre: "Racing", publisher: "Speed Demons", screenshots: [], rating: 4.7, play_count: 215000, tags: ["zombie"] },
  { id: "zombie-realm", title: "Zombie Realm", description: "Explore the realm of the dead.", thumbnail: "https://images.unsplash.com/photo-1518563259479-d003c05a6507?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-realm", is_free: true, is_featured: false, genre: "Action", publisher: "Dark Studios", screenshots: [], rating: 4.3, play_count: 47000, tags: ["zombie"] },
  { id: "zombie-hill", title: "Zombie Hill", description: "Climb the zombie hill.", thumbnail: "https://images.unsplash.com/photo-1612831455540-c54c0fdf3fcd?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-hill", is_free: true, is_featured: false, genre: "Arcade", publisher: "Dark Studios", screenshots: [], rating: 4.2, play_count: 36000, tags: ["zombie"] },
  { id: "tower-defense-z", title: "Tower Defense Z", description: "Towers vs zombies.", thumbnail: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=400&fit=crop", game_url: "https://example.com/games/tower-defense-z", is_free: true, is_featured: false, genre: "Strategy", publisher: "Stellar Interactive", screenshots: [], rating: 4.6, play_count: 79000, tags: ["zombie"] },
  { id: "zombie-cannon", title: "Zombie Cannon", description: "Cannon the zombies away.", thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-cannon", is_free: true, is_featured: false, genre: "Action", publisher: "Dark Studios", screenshots: [], rating: 4.4, play_count: 52000, tags: ["zombie"] },
  { id: "zombie-invasion", title: "Zombie Invasion", description: "Stop the invasion.", thumbnail: "https://images.unsplash.com/photo-1509248961895-a8880a8b0816?w=400&h=400&fit=crop", game_url: "https://example.com/games/zombie-invasion", is_free: true, is_featured: false, genre: "Action", publisher: "Dark Studios", screenshots: [], rating: 4.5, play_count: 64000, tags: ["zombie"] },
  { id: "alien-shooter", title: "Alien Shooter", description: "Aliens? Also undead. Shoot 'em.", thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop", game_url: "https://example.com/games/alien-shooter", is_free: true, is_featured: false, genre: "Action", publisher: "Stellar Interactive", screenshots: [], rating: 4.5, play_count: 72000, tags: ["zombie"] },
  { id: "empire-tower", title: "Empire Tower", description: "Defend your empire.", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop", game_url: "https://example.com/games/empire-tower", is_free: true, is_featured: false, genre: "Strategy", publisher: "Stellar Interactive", screenshots: [], rating: 4.6, play_count: 81000, tags: ["zombie"] },

  // Brain Boosters
  { id: "jewel-miner", title: "Jewel Miner", description: "Match jewels, train your mind.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop", game_url: "https://example.com/games/jewel-miner", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.5, play_count: 64000, tags: ["brain"] },
  { id: "ludo-world", title: "Ludo World", description: "Classic ludo with friends.", thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", game_url: "https://example.com/games/ludo-world", is_free: true, is_featured: false, genre: "Board", publisher: "BrainBox", screenshots: [], rating: 4.6, play_count: 88000, tags: ["brain"] },
  { id: "get-10-men", title: "Get 10", description: "Numerical combination puzzle.", thumbnail: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop", game_url: "https://example.com/games/get-10", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.4, play_count: 42000, tags: ["brain"] },
  { id: "marble-boom", title: "Marble Boom", description: "Pop marbles, boost your brain.", thumbnail: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=400&h=400&fit=crop", game_url: "https://example.com/games/marble-boom", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: [], rating: 4.3, play_count: 36000, tags: ["brain"] },
  { id: "magic-forest", title: "Magic Forest", description: "Solve woodland puzzles.", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop", game_url: "https://example.com/games/magic-forest", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.5, play_count: 48000, tags: ["brain"] },
  { id: "mahjong-sage", title: "Mahjong Sage", description: "Traditional mahjong solitaire.", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop", game_url: "https://example.com/games/mahjong-sage", is_free: true, is_featured: false, genre: "Board", publisher: "MindPlay", screenshots: [], rating: 4.7, play_count: 92000, tags: ["brain"] },
  { id: "solitaire-master", title: "Solitaire Master", description: "Master solitaire variants.", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop", game_url: "https://example.com/games/solitaire-master", is_free: true, is_featured: false, genre: "Casino", publisher: "MindPlay", screenshots: [], rating: 4.6, play_count: 78000, tags: ["brain"] },
  { id: "bubble-marine", title: "Bubble Marine", description: "Pop deep-sea bubbles.", thumbnail: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=400&h=400&fit=crop", game_url: "https://example.com/games/bubble-marine", is_free: true, is_featured: false, genre: "Puzzle", publisher: "Casual Co", screenshots: [], rating: 4.4, play_count: 41000, tags: ["brain"] },
  { id: "royal-jewels-2", title: "Royal Jewels 2", description: "More royal jewel matching.", thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop", game_url: "https://example.com/games/royal-jewels-2", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.5, play_count: 53000, tags: ["brain"] },
  { id: "mahjong-quest", title: "Mahjong Quest", description: "Mahjong on a journey.", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop", game_url: "https://example.com/games/mahjong-quest", is_free: true, is_featured: false, genre: "Board", publisher: "MindPlay", screenshots: [], rating: 4.4, play_count: 38000, tags: ["brain"] },

  // Top Players & Highscore extras
  { id: "deadly-rally", title: "Deadly Rally", description: "High-stakes rally racing.", thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop", game_url: "https://example.com/games/deadly-rally", is_free: true, is_featured: false, genre: "Racing", publisher: "Speed Demons", screenshots: [], rating: 4.6, play_count: 154000, tags: ["highscore"] },
  { id: "cubes-2048", title: "Cubes 2048 Royale", description: "2048 meets battle royale.", thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop", game_url: "https://example.com/games/cubes-2048", is_free: true, is_featured: false, genre: "Puzzle", publisher: "BrainBox", screenshots: [], rating: 4.7, play_count: 187000, tags: ["highscore"] },
  { id: "detective-iq", title: "Detective IQ 3", description: "Solve crimes with your wits.", thumbnail: "https://images.unsplash.com/photo-1518563259479-d003c05a6507?w=400&h=400&fit=crop", game_url: "https://example.com/games/detective-iq", is_free: true, is_featured: false, genre: "Puzzle", publisher: "MindPlay", screenshots: [], rating: 4.8, play_count: 198000, tags: ["highscore"] },
  { id: "road-survival", title: "Road Survival", description: "Survive endless roadways.", thumbnail: "https://images.unsplash.com/photo-1559125148-869baf508c95?w=400&h=400&fit=crop", game_url: "https://example.com/games/road-survival", is_free: true, is_featured: false, genre: "Action", publisher: "Speed Demons", screenshots: [], rating: 4.5, play_count: 121000, tags: ["highscore"] },
  { id: "word-play", title: "Word Play", description: "Wordplay leaderboard fun.", thumbnail: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop", game_url: "https://example.com/games/word-play", is_free: true, is_featured: false, genre: "Puzzle", publisher: "WordWorks", screenshots: [], rating: 4.4, play_count: 89000, tags: ["highscore"] }
];

export const getFreeGames = () => mockGames.filter(game => game.is_free);
export const getFeaturedGames = () => mockGames.filter(game => game.is_featured);
export const getTrendingGames = () => [...mockGames].sort((a, b) => b.play_count - a.play_count).slice(0, 6);
export const getMostLovedGames = () => [...mockGames].sort((a, b) => b.rating - a.rating).slice(0, 6);
export const getGameById = (id: string) => mockGames.find(game => game.id === id);
export const getGamesByGenre = (genre: string, excludeId?: string) => 
  mockGames.filter(game => game.genre === genre && game.id !== excludeId).slice(0, 4);
export const getGamesByTag = (tag: string) => mockGames.filter(g => g.tags?.includes(tag));
