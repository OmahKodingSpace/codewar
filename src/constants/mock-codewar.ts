// Mock data for the CodeWar platform

export interface CWUser {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  rank: number;
  xp: number;
  level: number;
  challengesSolved: number;
  streak: number;
  joinedAt: string;
  bio: string;
  language: string;
}

export interface CWQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CWChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;
  xpReward: number;
  solvedBy: number;
  totalAttempts: number;
  tags: string[];
  createdAt: string;
  questions: CWQuestion[];
}

export interface CWAchievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
  category: string;
}

export interface CWReward {
  id: number;
  title: string;
  description: string;
  cost: number;
  category: string;
  claimed: boolean;
  icon: string;
}

export interface CWLeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  challengesSolved: number;
}

// Current logged-in user
export const currentUser: CWUser = {
  id: 1,
  username: 'codehero',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
  rank: 5,
  xp: 4250,
  level: 12,
  challengesSolved: 87,
  streak: 14,
  joinedAt: '2024-06-15T00:00:00.000Z',
  bio: 'Full-stack developer who loves solving algorithmic challenges.',
  language: 'TypeScript'
};

// Leaderboard data
export const leaderboardData: CWLeaderboardEntry[] = [
  {
    rank: 1,
    userId: 10,
    username: 'algorithmKing',
    name: 'Sarah Chen',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    xp: 9850,
    level: 25,
    challengesSolved: 234
  },
  {
    rank: 2,
    userId: 11,
    username: 'byteMaster',
    name: 'Marcus Webb',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    xp: 8720,
    level: 23,
    challengesSolved: 198
  },
  {
    rank: 3,
    userId: 12,
    username: 'codeNinja',
    name: 'Yuki Tanaka',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    xp: 7600,
    level: 20,
    challengesSolved: 176
  },
  {
    rank: 4,
    userId: 13,
    username: 'devWizard',
    name: 'Priya Patel',
    avatar: 'https://api.slingacademy.com/public/sample-users/6.png',
    xp: 5100,
    level: 14,
    challengesSolved: 112
  },
  {
    rank: 5,
    userId: 1,
    username: 'codehero',
    name: 'Alex Johnson',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    xp: 4250,
    level: 12,
    challengesSolved: 87
  },
  {
    rank: 6,
    userId: 14,
    username: 'rustacean',
    name: 'Oliver Schmidt',
    avatar: 'https://api.slingacademy.com/public/sample-users/7.png',
    xp: 3900,
    level: 11,
    challengesSolved: 79
  },
  {
    rank: 7,
    userId: 15,
    username: 'pyQueen',
    name: 'Amara Obi',
    avatar: 'https://api.slingacademy.com/public/sample-users/8.png',
    xp: 3400,
    level: 10,
    challengesSolved: 68
  },
  {
    rank: 8,
    userId: 16,
    username: 'goGopher',
    name: 'Liam Murphy',
    avatar: 'https://api.slingacademy.com/public/sample-users/9.png',
    xp: 2800,
    level: 8,
    challengesSolved: 54
  },
  {
    rank: 9,
    userId: 17,
    username: 'jsJedi',
    name: 'Emma Rodriguez',
    avatar: 'https://api.slingacademy.com/public/sample-users/10.png',
    xp: 2200,
    level: 7,
    challengesSolved: 43
  },
  {
    rank: 10,
    userId: 18,
    username: 'bitShifter',
    name: 'Noah Kim',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    xp: 1800,
    level: 6,
    challengesSolved: 35
  }
];

// Challenges data
export const challengesData: CWChallenge[] = [
  {
    id: 1,
    title: 'Two Sum',
    description:
      'Given an array of integers, return indices of the two numbers that add up to a specific target.',
    difficulty: 'easy',
    category: 'Arrays',
    xpReward: 50,
    solvedBy: 1240,
    totalAttempts: 2100,
    tags: ['arrays', 'hash-map'],
    createdAt: '2024-01-10T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'What is the optimal time complexity for Two Sum?',
        options: ['O(n^2)', 'O(n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Which data structure helps solve Two Sum in O(n)?',
        options: ['Array', 'Stack', 'Hash Map', 'Queue'],
        correctIndex: 2
      },
      {
        id: 3,
        question: 'What does Two Sum return?',
        options: [
          'The sum',
          'Indices of two numbers',
          'The two numbers',
          'Boolean'
        ],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'Can Two Sum have multiple valid answers?',
        options: [
          'Yes always',
          'No never',
          'Depends on input',
          'Only with duplicates'
        ],
        correctIndex: 2
      },
      {
        id: 5,
        question: 'What happens if no pair sums to target?',
        options: [
          'Return [-1,-1]',
          'Return null',
          'Throw error',
          'Depends on implementation'
        ],
        correctIndex: 3
      }
    ]
  },
  {
    id: 2,
    title: 'Binary Tree Traversal',
    description:
      'Implement in-order, pre-order, and post-order traversal of a binary tree.',
    difficulty: 'medium',
    category: 'Trees',
    xpReward: 100,
    solvedBy: 680,
    totalAttempts: 1500,
    tags: ['trees', 'recursion', 'dfs'],
    createdAt: '2024-02-05T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'In-order traversal of a BST gives:',
        options: [
          'Random order',
          'Sorted order',
          'Reverse order',
          'Level order'
        ],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Pre-order visits the root:',
        options: ['Last', 'In the middle', 'First', 'Never'],
        correctIndex: 2
      },
      {
        id: 3,
        question: 'Post-order is useful for:',
        options: ['Searching', 'Deleting a tree', 'Sorting', 'Balancing'],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'Which traversal uses a stack iteratively?',
        options: ['Level-order', 'Pre-order', 'BFS', 'None'],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'Time complexity of tree traversal?',
        options: ['O(log n)', 'O(n)', 'O(n^2)', 'O(1)'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 3,
    title: 'Longest Palindromic Substring',
    description: 'Find the longest palindromic substring in a given string.',
    difficulty: 'medium',
    category: 'Strings',
    xpReward: 120,
    solvedBy: 520,
    totalAttempts: 1800,
    tags: ['strings', 'dynamic-programming'],
    createdAt: '2024-02-20T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'A palindrome reads the same:',
        options: [
          'Top to bottom',
          'Left to right only',
          'Forward and backward',
          'Diagonally'
        ],
        correctIndex: 2
      },
      {
        id: 2,
        question: 'Which approach finds longest palindromic substring?',
        options: ['Greedy', 'Expand around center', 'BFS', 'Sorting'],
        correctIndex: 1
      },
      {
        id: 3,
        question: 'Time complexity of the expand approach?',
        options: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(log n)'],
        correctIndex: 1
      },
      {
        id: 4,
        question: '"racecar" is a palindrome. What about "racecars"?',
        options: ['Yes', 'No', 'Partially', 'Depends'],
        correctIndex: 1
      },
      {
        id: 5,
        question: "Manacher's algorithm runs in:",
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(n^3)'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 4,
    title: 'Merge K Sorted Lists',
    description:
      'Merge k sorted linked lists and return it as one sorted list.',
    difficulty: 'hard',
    category: 'Linked Lists',
    xpReward: 200,
    solvedBy: 310,
    totalAttempts: 1200,
    tags: ['linked-lists', 'heap', 'divide-and-conquer'],
    createdAt: '2024-03-01T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'Best data structure to merge k sorted lists?',
        options: ['Stack', 'Min-heap', 'Array', 'Hash map'],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Time complexity with a heap approach?',
        options: ['O(n)', 'O(n log k)', 'O(nk)', 'O(k^2)'],
        correctIndex: 1
      },
      {
        id: 3,
        question: 'How many elements does the heap hold at most?',
        options: ['n', 'k', 'n*k', '1'],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'Divide and conquer merges lists in:',
        options: ['O(n log k)', 'O(nk)', 'O(n^2)', 'O(k)'],
        correctIndex: 0
      },
      {
        id: 5,
        question: 'What is k in this problem?',
        options: [
          'Total elements',
          'Number of lists',
          'Max list length',
          'Target value'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 5,
    title: 'Valid Parentheses',
    description:
      'Determine if a string of brackets is valid (properly opened and closed).',
    difficulty: 'easy',
    category: 'Stacks',
    xpReward: 50,
    solvedBy: 1580,
    totalAttempts: 2300,
    tags: ['stacks', 'strings'],
    createdAt: '2024-03-15T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'Which data structure is ideal for matching parentheses?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Is "([])" valid?',
        options: ['Yes', 'No', 'Depends', 'Partially'],
        correctIndex: 0
      },
      {
        id: 3,
        question: 'Is "([)]" valid?',
        options: ['Yes', 'No', 'Depends', 'Partially'],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'Time complexity to validate parentheses?',
        options: ['O(n^2)', 'O(n)', 'O(log n)', 'O(1)'],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'What do you push onto the stack?',
        options: ['Closing brackets', 'Opening brackets', 'Both', 'Indices'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 6,
    title: 'Graph Shortest Path',
    description:
      "Implement Dijkstra's algorithm to find the shortest path in a weighted graph.",
    difficulty: 'hard',
    category: 'Graphs',
    xpReward: 250,
    solvedBy: 190,
    totalAttempts: 800,
    tags: ['graphs', 'dijkstra', 'priority-queue'],
    createdAt: '2024-04-01T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: "Dijkstra's algorithm works on graphs with:",
        options: [
          'Negative weights',
          'Non-negative weights',
          'Any weights',
          'No weights'
        ],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Key data structure for Dijkstra?',
        options: ['Stack', 'Queue', 'Priority queue', 'Hash set'],
        correctIndex: 2
      },
      {
        id: 3,
        question: 'Time complexity with a min-heap?',
        options: ['O(V^2)', 'O((V+E) log V)', 'O(VE)', 'O(V)'],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'Dijkstra is a type of:',
        options: ['DFS', 'BFS', 'Greedy algorithm', 'Backtracking'],
        correctIndex: 2
      },
      {
        id: 5,
        question: 'For negative weights, use:',
        options: ['Dijkstra', 'Bellman-Ford', "Prim's", "Kruskal's"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 7,
    title: 'LRU Cache',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    difficulty: 'hard',
    category: 'Design',
    xpReward: 200,
    solvedBy: 280,
    totalAttempts: 950,
    tags: ['design', 'hash-map', 'linked-lists'],
    createdAt: '2024-04-20T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'LRU stands for:',
        options: [
          'Last Recently Updated',
          'Least Recently Used',
          'Last Removed Unit',
          'Least Required Update'
        ],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Best data structures for LRU Cache?',
        options: [
          'Array + Stack',
          'Hash Map + Doubly Linked List',
          'Tree + Queue',
          'Graph + Set'
        ],
        correctIndex: 1
      },
      {
        id: 3,
        question: 'Get operation time complexity?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'When cache is full, which item is evicted?',
        options: [
          'Most recently used',
          'Least recently used',
          'Random',
          'First inserted'
        ],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'Put operation time complexity?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 8,
    title: 'N-Queens Problem',
    description:
      'Place N queens on an NxN chessboard so that no two queens threaten each other.',
    difficulty: 'expert',
    category: 'Backtracking',
    xpReward: 350,
    solvedBy: 95,
    totalAttempts: 600,
    tags: ['backtracking', 'recursion'],
    createdAt: '2024-05-10T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'N-Queens uses which algorithmic technique?',
        options: [
          'Dynamic programming',
          'Greedy',
          'Backtracking',
          'Divide & conquer'
        ],
        correctIndex: 2
      },
      {
        id: 2,
        question: 'How many solutions exist for 8-Queens?',
        options: ['1', '12', '92', '256'],
        correctIndex: 2
      },
      {
        id: 3,
        question: 'Queens can attack:',
        options: [
          'Only horizontally',
          'Rows, columns, diagonals',
          'L-shaped like knights',
          'Only adjacent squares'
        ],
        correctIndex: 1
      },
      {
        id: 4,
        question: 'For N=1, how many solutions?',
        options: ['0', '1', '2', 'N'],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'For N=2, how many solutions?',
        options: ['0', '1', '2', '4'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 9,
    title: 'Fibonacci Sequence',
    description:
      'Write a function that returns the nth Fibonacci number using dynamic programming.',
    difficulty: 'easy',
    category: 'Dynamic Programming',
    xpReward: 50,
    solvedBy: 2100,
    totalAttempts: 2800,
    tags: ['dynamic-programming', 'math'],
    createdAt: '2024-05-25T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: 'What are the first two Fibonacci numbers?',
        options: ['1, 1', '0, 1', '1, 2', '0, 0'],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Recursive Fibonacci without memoization is:',
        options: ['O(n)', 'O(2^n)', 'O(n^2)', 'O(log n)'],
        correctIndex: 1
      },
      {
        id: 3,
        question: 'DP Fibonacci time complexity?',
        options: ['O(2^n)', 'O(n^2)', 'O(n)', 'O(1)'],
        correctIndex: 2
      },
      {
        id: 4,
        question: 'Fibonacci(10) equals:',
        options: ['34', '55', '89', '144'],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'Space-optimized Fibonacci uses:',
        options: [
          'An array of size n',
          'Two variables',
          'A hash map',
          'Recursion stack'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 10,
    title: 'Minimum Spanning Tree',
    description:
      "Implement Kruskal's algorithm to find the minimum spanning tree of a graph.",
    difficulty: 'expert',
    category: 'Graphs',
    xpReward: 300,
    solvedBy: 120,
    totalAttempts: 500,
    tags: ['graphs', 'union-find', 'greedy'],
    createdAt: '2024-06-01T00:00:00.000Z',
    questions: [
      {
        id: 1,
        question: "Kruskal's algorithm sorts edges by:",
        options: ['Source vertex', 'Weight', 'Destination vertex', 'Random'],
        correctIndex: 1
      },
      {
        id: 2,
        question: 'Key data structure for cycle detection in Kruskal?',
        options: ['Stack', 'Queue', 'Union-Find', 'Priority Queue'],
        correctIndex: 2
      },
      {
        id: 3,
        question: 'MST has exactly how many edges for V vertices?',
        options: ['V', 'V-1', 'V+1', 'V^2'],
        correctIndex: 1
      },
      {
        id: 4,
        question: "Kruskal's is a type of:",
        options: ['DP algorithm', 'Greedy algorithm', 'Backtracking', 'BFS'],
        correctIndex: 1
      },
      {
        id: 5,
        question: 'Alternative MST algorithm:',
        options: ['Dijkstra', 'Bellman-Ford', "Prim's", 'Floyd-Warshall'],
        correctIndex: 2
      }
    ]
  }
];

// Achievements data
export const achievementsData: CWAchievement[] = [
  {
    id: 1,
    title: 'First Blood',
    description: 'Solve your first challenge.',
    icon: 'sword',
    xpReward: 25,
    unlockedAt: '2024-06-16T00:00:00.000Z',
    progress: 1,
    maxProgress: 1,
    category: 'Milestones'
  },
  {
    id: 2,
    title: 'Streak Master',
    description: 'Maintain a 7-day solving streak.',
    icon: 'flame',
    xpReward: 100,
    unlockedAt: '2024-07-01T00:00:00.000Z',
    progress: 7,
    maxProgress: 7,
    category: 'Consistency'
  },
  {
    id: 3,
    title: 'Centurion',
    description: 'Solve 100 challenges.',
    icon: 'shield',
    xpReward: 500,
    unlockedAt: null,
    progress: 87,
    maxProgress: 100,
    category: 'Milestones'
  },
  {
    id: 4,
    title: 'Algorithm Ace',
    description: 'Solve 10 hard difficulty challenges.',
    icon: 'brain',
    xpReward: 250,
    unlockedAt: null,
    progress: 7,
    maxProgress: 10,
    category: 'Skill'
  },
  {
    id: 5,
    title: 'Speed Demon',
    description: 'Solve a challenge in under 5 minutes.',
    icon: 'bolt',
    xpReward: 75,
    unlockedAt: '2024-08-10T00:00:00.000Z',
    progress: 1,
    maxProgress: 1,
    category: 'Speed'
  },
  {
    id: 6,
    title: 'Polyglot',
    description: 'Solve challenges in 5 different programming languages.',
    icon: 'globe',
    xpReward: 200,
    unlockedAt: null,
    progress: 3,
    maxProgress: 5,
    category: 'Skill'
  },
  {
    id: 7,
    title: 'Night Owl',
    description: 'Solve a challenge between midnight and 5 AM.',
    icon: 'moon',
    xpReward: 50,
    unlockedAt: '2024-09-05T00:00:00.000Z',
    progress: 1,
    maxProgress: 1,
    category: 'Fun'
  },
  {
    id: 8,
    title: 'Top 10',
    description: 'Reach the top 10 on the leaderboard.',
    icon: 'trophy',
    xpReward: 300,
    unlockedAt: '2024-10-15T00:00:00.000Z',
    progress: 1,
    maxProgress: 1,
    category: 'Milestones'
  },
  {
    id: 9,
    title: 'Month-long Streak',
    description: 'Maintain a 30-day solving streak.',
    icon: 'calendar',
    xpReward: 500,
    unlockedAt: null,
    progress: 14,
    maxProgress: 30,
    category: 'Consistency'
  },
  {
    id: 10,
    title: 'Expert Slayer',
    description: 'Solve an expert-level challenge.',
    icon: 'crown',
    xpReward: 150,
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
    category: 'Skill'
  }
];

// Rewards data
export const rewardsData: CWReward[] = [
  {
    id: 1,
    title: 'Custom Profile Badge',
    description: 'Unlock a custom badge to display on your profile.',
    cost: 500,
    category: 'Cosmetic',
    claimed: true,
    icon: 'badge'
  },
  {
    id: 2,
    title: 'Dark Theme Pro',
    description: 'Exclusive dark theme with custom accent colors.',
    cost: 750,
    category: 'Cosmetic',
    claimed: true,
    icon: 'palette'
  },
  {
    id: 3,
    title: 'Challenge Hint Token',
    description: 'Get a hint for any challenge. One-time use.',
    cost: 200,
    category: 'Power-up',
    claimed: false,
    icon: 'lightbulb'
  },
  {
    id: 4,
    title: 'XP Booster (24h)',
    description: 'Double your XP earnings for 24 hours.',
    cost: 1000,
    category: 'Power-up',
    claimed: false,
    icon: 'rocket'
  },
  {
    id: 5,
    title: 'Exclusive Avatar Frame',
    description: 'A golden frame around your profile avatar.',
    cost: 1500,
    category: 'Cosmetic',
    claimed: false,
    icon: 'frame'
  },
  {
    id: 6,
    title: 'Streak Shield',
    description: 'Protect your streak for one missed day.',
    cost: 300,
    category: 'Power-up',
    claimed: false,
    icon: 'shield'
  },
  {
    id: 7,
    title: 'Leaderboard Spotlight',
    description: 'Highlight your name on the leaderboard for 7 days.',
    cost: 2000,
    category: 'Cosmetic',
    claimed: false,
    icon: 'spotlight'
  },
  {
    id: 8,
    title: 'Code Review Token',
    description: 'Get a detailed code review from a top-ranked user.',
    cost: 800,
    category: 'Learning',
    claimed: false,
    icon: 'review'
  }
];

// Homepage stats
export const platformStats = {
  totalUsers: 12450,
  totalChallenges: 342,
  correctAnswers: 3421,
  activeToday: 1230
};

export const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  expert:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

// Programming languages
export const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift'
] as const;

export type ProgrammingLanguage = (typeof programmingLanguages)[number];

// Badges
export interface CWBadge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedAt: string | null;
  category: string;
}

export const badgesData: CWBadge[] = [
  {
    id: 'beginner',
    title: 'The Beginner',
    description: 'Complete your first challenge',
    emoji: '🐣',
    earned: true,
    earnedAt: '2024-06-16',
    category: 'Progress'
  },
  {
    id: 'hacker',
    title: 'The Hacker',
    description: 'Solve 50 challenges',
    emoji: '💻',
    earned: true,
    earnedAt: '2024-09-20',
    category: 'Progress'
  },
  {
    id: 'faster',
    title: 'The Faster',
    description: 'Complete a challenge under 2 minutes',
    emoji: '⚡',
    earned: true,
    earnedAt: '2024-08-10',
    category: 'Speed'
  },
  {
    id: 'perfect',
    title: 'Most Perfect',
    description: 'Get 5/5 correct 10 times',
    emoji: '💎',
    earned: false,
    earnedAt: null,
    category: 'Accuracy'
  },
  {
    id: 'polyglot',
    title: 'The Polyglot',
    description: 'Solve in 5+ languages',
    emoji: '🌐',
    earned: false,
    earnedAt: null,
    category: 'Diversity'
  },
  {
    id: 'warrior',
    title: 'The Warrior',
    description: 'Complete 100 challenges',
    emoji: '⚔️',
    earned: false,
    earnedAt: null,
    category: 'Progress'
  },
  {
    id: 'nightowl',
    title: 'Night Owl',
    description: 'Solve between midnight and 5 AM',
    emoji: '🦉',
    earned: true,
    earnedAt: '2024-09-05',
    category: 'Fun'
  },
  {
    id: 'streak7',
    title: 'Week Warrior',
    description: '7-day streak',
    emoji: '🔥',
    earned: true,
    earnedAt: '2024-07-01',
    category: 'Consistency'
  },
  {
    id: 'streak30',
    title: 'Iron Will',
    description: '30-day streak',
    emoji: '🏔️',
    earned: false,
    earnedAt: null,
    category: 'Consistency'
  },
  {
    id: 'expert',
    title: 'Expert Slayer',
    description: 'Ace an expert challenge with 5/5',
    emoji: '🐉',
    earned: false,
    earnedAt: null,
    category: 'Skill'
  },
  {
    id: 'top10',
    title: 'Elite',
    description: 'Reach top 10 on leaderboard',
    emoji: '👑',
    earned: true,
    earnedAt: '2024-10-15',
    category: 'Ranking'
  },
  {
    id: 'helper',
    title: 'The Mentor',
    description: 'Help 10 users in discussions',
    emoji: '🤝',
    earned: false,
    earnedAt: null,
    category: 'Community'
  }
];

// Extended leaderboard with language + difficulty info
export interface CWLeaderboardFull extends CWLeaderboardEntry {
  primaryLanguage: ProgrammingLanguage;
  easyScore: number;
  mediumScore: number;
  hardScore: number;
  expertScore: number;
  todayXp: number;
  weekXp: number;
  monthXp: number;
}

export const leaderboardFullData: CWLeaderboardFull[] = [
  {
    ...leaderboardData[0],
    primaryLanguage: 'Python',
    easyScore: 980,
    mediumScore: 2400,
    hardScore: 4200,
    expertScore: 2270,
    todayXp: 350,
    weekXp: 1800,
    monthXp: 4200
  },
  {
    ...leaderboardData[1],
    primaryLanguage: 'Java',
    easyScore: 850,
    mediumScore: 2100,
    hardScore: 3800,
    expertScore: 1970,
    todayXp: 200,
    weekXp: 1500,
    monthXp: 3800
  },
  {
    ...leaderboardData[2],
    primaryLanguage: 'TypeScript',
    easyScore: 700,
    mediumScore: 1900,
    hardScore: 3200,
    expertScore: 1800,
    todayXp: 450,
    weekXp: 2100,
    monthXp: 3500
  },
  {
    ...leaderboardData[3],
    primaryLanguage: 'Go',
    easyScore: 600,
    mediumScore: 1400,
    hardScore: 2000,
    expertScore: 1100,
    todayXp: 100,
    weekXp: 800,
    monthXp: 2200
  },
  {
    ...leaderboardData[4],
    primaryLanguage: 'TypeScript',
    easyScore: 500,
    mediumScore: 1200,
    hardScore: 1600,
    expertScore: 950,
    todayXp: 150,
    weekXp: 900,
    monthXp: 1800
  },
  {
    ...leaderboardData[5],
    primaryLanguage: 'Rust',
    easyScore: 450,
    mediumScore: 1100,
    hardScore: 1500,
    expertScore: 850,
    todayXp: 0,
    weekXp: 600,
    monthXp: 1600
  },
  {
    ...leaderboardData[6],
    primaryLanguage: 'Python',
    easyScore: 400,
    mediumScore: 900,
    hardScore: 1300,
    expertScore: 800,
    todayXp: 250,
    weekXp: 1100,
    monthXp: 1500
  },
  {
    ...leaderboardData[7],
    primaryLanguage: 'JavaScript',
    easyScore: 350,
    mediumScore: 800,
    hardScore: 1000,
    expertScore: 650,
    todayXp: 50,
    weekXp: 400,
    monthXp: 1200
  },
  {
    ...leaderboardData[8],
    primaryLanguage: 'C++',
    easyScore: 300,
    mediumScore: 700,
    hardScore: 800,
    expertScore: 400,
    todayXp: 100,
    weekXp: 500,
    monthXp: 900
  },
  {
    ...leaderboardData[9],
    primaryLanguage: 'PHP',
    easyScore: 250,
    mediumScore: 600,
    hardScore: 600,
    expertScore: 350,
    todayXp: 0,
    weekXp: 300,
    monthXp: 700
  }
];

// Question bank for random generation per language+difficulty
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface QuestionTemplate {
  question: string;
  options: string[];
  correctIndex: number;
}

const questionBank: Record<string, Record<Difficulty, QuestionTemplate[]>> = {
  JavaScript: {
    easy: [
      {
        question: 'What does `typeof null` return in JavaScript?',
        options: ['null', 'undefined', 'object', 'number'],
        correctIndex: 2
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['unshift()', 'push()', 'pop()', 'shift()'],
        correctIndex: 1
      },
      {
        question: 'What is `NaN === NaN`?',
        options: ['true', 'false', 'undefined', 'TypeError'],
        correctIndex: 1
      },
      {
        question: '`let` and `const` are:',
        options: [
          'Function-scoped',
          'Block-scoped',
          'Global-scoped',
          'Module-scoped'
        ],
        correctIndex: 1
      },
      {
        question: 'What does `"5" + 3` return?',
        options: ['8', '"53"', 'NaN', 'TypeError'],
        correctIndex: 1
      },
      {
        question: 'Which is NOT a primitive type?',
        options: ['string', 'number', 'object', 'boolean'],
        correctIndex: 2
      },
      {
        question: 'What does `Array.isArray([])` return?',
        options: ['true', 'false', 'undefined', '[]'],
        correctIndex: 0
      }
    ],
    medium: [
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A loop construct',
          'A function with access to its outer scope',
          'A class method',
          'A promise chain'
        ],
        correctIndex: 1
      },
      {
        question: 'What does `Promise.all` do if one promise rejects?',
        options: [
          'Resolves with partial results',
          'Rejects immediately',
          'Waits for all',
          'Returns undefined'
        ],
        correctIndex: 1
      },
      {
        question: 'The event loop processes which queue first?',
        options: ['Macro tasks', 'Micro tasks', 'Both equally', 'Neither'],
        correctIndex: 1
      },
      {
        question: '`Object.freeze()` makes an object:',
        options: [
          'Deeply immutable',
          'Shallowly immutable',
          'Deletable',
          'Extensible'
        ],
        correctIndex: 1
      },
      {
        question: "What is the output of `[...'hello']`?",
        options: [
          '["hello"]',
          '["h","e","l","l","o"]',
          'Error',
          '["h e l l o"]'
        ],
        correctIndex: 1
      },
      {
        question: 'WeakMap keys must be:',
        options: ['Strings', 'Numbers', 'Objects', 'Any type'],
        correctIndex: 2
      }
    ],
    hard: [
      {
        question: 'What is the Temporal Dead Zone?',
        options: [
          'Memory leak period',
          'Time before let/const initialization',
          'Event loop delay',
          'Garbage collection phase'
        ],
        correctIndex: 1
      },
      {
        question: 'Symbol.iterator is used for:',
        options: [
          'Type checking',
          'Making objects iterable',
          'Memory management',
          'Error handling'
        ],
        correctIndex: 1
      },
      {
        question: 'Proxy can intercept which operations?',
        options: [
          'Only get/set',
          'Only function calls',
          'Nearly all object operations',
          'Only property deletion'
        ],
        correctIndex: 2
      },
      {
        question: 'SharedArrayBuffer is used for:',
        options: [
          'File I/O',
          'Shared memory between workers',
          'DOM manipulation',
          'Network requests'
        ],
        correctIndex: 1
      },
      {
        question: 'What does `Reflect.ownKeys()` return?',
        options: [
          'Only enumerable keys',
          'String keys only',
          'All own keys including symbols',
          'Prototype chain keys'
        ],
        correctIndex: 2
      }
    ],
    expert: [
      {
        question: 'V8 uses which JIT compilation tiers?',
        options: [
          'Ignition + TurboFan',
          'SpiderMonkey + IonMonkey',
          'Baseline + Optimizing',
          'Interpreter only'
        ],
        correctIndex: 0
      },
      {
        question: 'What is reification in JavaScript engines?',
        options: [
          'Variable hoisting',
          'Making abstract concepts into objects',
          'Garbage collection',
          'Code splitting'
        ],
        correctIndex: 1
      },
      {
        question: 'TC39 Stage 3 means:',
        options: [
          'Strawman proposal',
          'Draft',
          'Candidate for inclusion',
          'Finished'
        ],
        correctIndex: 2
      },
      {
        question: 'FinalizationRegistry is used for:',
        options: [
          'Promise cleanup',
          'Cleanup after garbage collection',
          'Event listener removal',
          'Timer cleanup'
        ],
        correctIndex: 1
      },
      {
        question: 'Atomics.wait() is used in:',
        options: [
          'Main thread',
          'SharedArrayBuffer with workers',
          'Promise chains',
          'Event handlers'
        ],
        correctIndex: 1
      }
    ]
  },
  TypeScript: {
    easy: [
      {
        question: 'TypeScript is a superset of:',
        options: ['Java', 'JavaScript', 'Python', 'C++'],
        correctIndex: 1
      },
      {
        question: 'Which keyword declares a constant type?',
        options: ['let', 'var', 'const', 'static'],
        correctIndex: 2
      },
      {
        question: 'What is the `any` type?',
        options: [
          'A number',
          'Opts out of type checking',
          'An error',
          'A class'
        ],
        correctIndex: 1
      },
      {
        question: '`interface` is used to:',
        options: [
          'Define object shapes',
          'Loop arrays',
          'Handle errors',
          'Import modules'
        ],
        correctIndex: 0
      },
      {
        question: 'TypeScript compiles to:',
        options: ['Machine code', 'JavaScript', 'Java bytecode', 'WebAssembly'],
        correctIndex: 1
      },
      {
        question: 'What does `?:` mean in an interface?',
        options: [
          'Required property',
          'Optional property',
          'Read-only',
          'Nullable'
        ],
        correctIndex: 1
      }
    ],
    medium: [
      {
        question: 'What is a discriminated union?',
        options: [
          'A union with a common literal property',
          'A class hierarchy',
          'An enum type',
          'A generic constraint'
        ],
        correctIndex: 0
      },
      {
        question: 'What does `keyof` return?',
        options: [
          'Object values',
          'Union of property names',
          'Array of keys',
          'Object entries'
        ],
        correctIndex: 1
      },
      {
        question: '`Partial<T>` makes all properties:',
        options: ['Required', 'Optional', 'Readonly', 'Nullable'],
        correctIndex: 1
      },
      {
        question: 'What is type narrowing?',
        options: [
          'Making types smaller',
          'Refining types in conditional blocks',
          'Removing properties',
          'Type casting'
        ],
        correctIndex: 1
      },
      {
        question: '`infer` keyword is used in:',
        options: [
          'Variable declarations',
          'Conditional types',
          'Enum definitions',
          'Import statements'
        ],
        correctIndex: 1
      },
      {
        question: 'What does `satisfies` do?',
        options: [
          'Runtime check',
          'Validates type without widening',
          'Creates assertion',
          'Defines guard'
        ],
        correctIndex: 1
      }
    ],
    hard: [
      {
        question: 'Template literal types can:',
        options: [
          'Only format strings',
          'Create string pattern types',
          'Execute at runtime',
          'Replace regex'
        ],
        correctIndex: 1
      },
      {
        question: 'What is variance in TypeScript?',
        options: [
          'Type randomness',
          'How subtypes relate in generics',
          'Error variance',
          'Code style'
        ],
        correctIndex: 1
      },
      {
        question: 'Mapped types can modify:',
        options: [
          'Only values',
          'Keys and value types',
          'Only readonly',
          'Only optional'
        ],
        correctIndex: 1
      },
      {
        question: '`NoInfer<T>` prevents:',
        options: [
          'Type errors',
          'Inference from that position',
          'Null values',
          'Undefined access'
        ],
        correctIndex: 1
      },
      {
        question: 'Declaration merging works with:',
        options: [
          'type aliases',
          'interfaces',
          'const assertions',
          'enums only'
        ],
        correctIndex: 1
      }
    ],
    expert: [
      {
        question: 'What are higher-kinded types?',
        options: [
          'Types that take type constructors as params',
          'Very tall types',
          'Recursive types',
          'Branded types'
        ],
        correctIndex: 0
      },
      {
        question: 'Contravariance applies to:',
        options: [
          'Return types',
          'Function parameter types',
          'Property types',
          'All types'
        ],
        correctIndex: 1
      },
      {
        question: 'The `unique symbol` type is:',
        options: [
          'A string subtype',
          'A nominal type for symbols',
          'A runtime check',
          'Deprecated'
        ],
        correctIndex: 1
      },
      {
        question: 'What is type-level programming?',
        options: [
          'Writing types that compute types',
          'Programming type systems',
          'Using typeof',
          'Creating classes'
        ],
        correctIndex: 0
      },
      {
        question: 'Distributive conditional types distribute over:',
        options: ['Intersections', 'Unions', 'Arrays', 'Objects'],
        correctIndex: 1
      }
    ]
  },
  Python: {
    easy: [
      {
        question: 'Python is:',
        options: ['Compiled only', 'Interpreted', 'Assembly', 'Machine code'],
        correctIndex: 1
      },
      {
        question: 'How do you create a list?',
        options: ['{}', '()', '[]', '<>'],
        correctIndex: 2
      },
      {
        question: 'What does `len()` return?',
        options: ['Type', 'Length', 'Last element', 'First element'],
        correctIndex: 1
      },
      {
        question: 'Which is immutable?',
        options: ['list', 'dict', 'tuple', 'set'],
        correctIndex: 2
      },
      {
        question: '`//` operator does:',
        options: ['Division', 'Floor division', 'Modulo', 'Power'],
        correctIndex: 1
      },
      {
        question: 'f-strings were introduced in Python:',
        options: ['2.7', '3.0', '3.6', '3.10'],
        correctIndex: 2
      }
    ],
    medium: [
      {
        question: 'What is a decorator?',
        options: [
          'A design pattern only',
          'A function that wraps another function',
          'A class method',
          'A variable type'
        ],
        correctIndex: 1
      },
      {
        question: 'List comprehension syntax is:',
        options: [
          '[x for x in list]',
          '{x: x in list}',
          '(x for x in list)',
          '<x for x in list>'
        ],
        correctIndex: 0
      },
      {
        question: '`*args` captures:',
        options: [
          'Keyword arguments',
          'Positional arguments as tuple',
          'All arguments',
          'No arguments'
        ],
        correctIndex: 1
      },
      {
        question: 'GIL stands for:',
        options: [
          'Global Import Lock',
          'Global Interpreter Lock',
          'General Interface Layer',
          'Generic Input Loop'
        ],
        correctIndex: 1
      },
      {
        question: 'What does `yield` create?',
        options: ['A return value', 'A generator', 'An error', 'A class'],
        correctIndex: 1
      }
    ],
    hard: [
      {
        question: 'Metaclasses are:',
        options: [
          'Classes of classes',
          'Abstract classes',
          'Static classes',
          'Inner classes'
        ],
        correctIndex: 0
      },
      {
        question: '`__slots__` is used to:',
        options: [
          'Create methods',
          'Restrict attributes and save memory',
          'Define constructors',
          'Enable inheritance'
        ],
        correctIndex: 1
      },
      {
        question: 'What is the descriptor protocol?',
        options: [
          'Network protocol',
          '__get__, __set__, __delete__',
          'File I/O',
          'Import system'
        ],
        correctIndex: 1
      },
      {
        question: '`asyncio.gather()` runs coroutines:',
        options: [
          'Sequentially',
          'Concurrently',
          'In parallel threads',
          'Synchronously'
        ],
        correctIndex: 1
      },
      {
        question: 'MRO stands for:',
        options: [
          'Multiple Return Objects',
          'Method Resolution Order',
          'Module Resource Object',
          'Main Runtime Operation'
        ],
        correctIndex: 1
      }
    ],
    expert: [
      {
        question: 'CPython reference counting + which collector?',
        options: [
          'Mark-and-sweep',
          'Generational garbage collector',
          'Concurrent',
          'None'
        ],
        correctIndex: 1
      },
      {
        question: 'What is a coroutine frame?',
        options: [
          'A UI element',
          'The suspended state of a coroutine',
          'A call stack',
          'An event loop'
        ],
        correctIndex: 1
      },
      {
        question: '`sys._getframe()` returns:',
        options: [
          'Current exception',
          'Current stack frame',
          'System info',
          'Memory usage'
        ],
        correctIndex: 1
      },
      {
        question: 'PEP 703 proposes:',
        options: [
          'Pattern matching',
          'Removing the GIL',
          'Type unions',
          'Structural typing'
        ],
        correctIndex: 1
      },
      {
        question: '`__init_subclass__` is called when:',
        options: [
          'Instance created',
          'Class is subclassed',
          'Module imported',
          'Method called'
        ],
        correctIndex: 1
      }
    ]
  }
};

// Fallback generic questions for languages without specific banks
const genericQuestions: Record<Difficulty, QuestionTemplate[]> = {
  easy: [
    {
      question: 'What is a variable?',
      options: [
        'A constant',
        'A named storage for data',
        'A function',
        'An operator'
      ],
      correctIndex: 1
    },
    {
      question: 'What is a loop?',
      options: [
        'A condition',
        'A repeated execution block',
        'A function call',
        'A data type'
      ],
      correctIndex: 1
    },
    {
      question: 'What is an array?',
      options: [
        'A single value',
        'An ordered collection',
        'A function',
        'A class'
      ],
      correctIndex: 1
    },
    {
      question: 'What does a function return?',
      options: [
        'Nothing always',
        'A value or undefined',
        'An error',
        'A class'
      ],
      correctIndex: 1
    },
    {
      question: 'What is a string?',
      options: [
        'A number',
        'A sequence of characters',
        'A boolean',
        'An array'
      ],
      correctIndex: 1
    },
    {
      question: 'What is a boolean?',
      options: ['A number type', 'True or false', 'A string', 'An object'],
      correctIndex: 1
    }
  ],
  medium: [
    {
      question: 'What is recursion?',
      options: [
        'A loop type',
        'A function calling itself',
        'A class pattern',
        'Error handling'
      ],
      correctIndex: 1
    },
    {
      question: 'Time complexity O(n log n) is typical for:',
      options: ['Linear search', 'Merge sort', 'Bubble sort', 'Hash lookup'],
      correctIndex: 1
    },
    {
      question: 'A hash map provides average lookup of:',
      options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
      correctIndex: 1
    },
    {
      question: 'Stack follows which principle?',
      options: ['FIFO', 'LIFO', 'Random', 'Priority'],
      correctIndex: 1
    },
    {
      question: 'Binary search requires data to be:',
      options: ['Unsorted', 'Sorted', 'Unique', 'Integer'],
      correctIndex: 1
    }
  ],
  hard: [
    {
      question: 'What is memoization?',
      options: [
        'A sorting technique',
        'Caching computed results',
        'A design pattern',
        'Memory allocation'
      ],
      correctIndex: 1
    },
    {
      question: 'A balanced BST has height:',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
      correctIndex: 1
    },
    {
      question: 'Dijkstra fails with:',
      options: [
        'Large graphs',
        'Negative edge weights',
        'Undirected graphs',
        'Sparse graphs'
      ],
      correctIndex: 1
    },
    {
      question: 'Red-black trees guarantee:',
      options: [
        'Perfect balance',
        'Approximate balance',
        'No balance',
        'Full balance'
      ],
      correctIndex: 1
    },
    {
      question: 'Amortized O(1) means:',
      options: [
        'Always O(1)',
        'Average O(1) over many operations',
        'Sometimes O(1)',
        'Never O(1)'
      ],
      correctIndex: 1
    }
  ],
  expert: [
    {
      question: 'P vs NP asks if:',
      options: [
        'All problems are solvable',
        'Verification = solving in polynomial time',
        'Computers are fast enough',
        'Memory is sufficient'
      ],
      correctIndex: 1
    },
    {
      question: 'A Bloom filter can produce:',
      options: ['False negatives', 'False positives', 'Both', 'Neither'],
      correctIndex: 1
    },
    {
      question: 'Skip lists provide:',
      options: [
        'O(1) search',
        'O(log n) probabilistic search',
        'O(n) search',
        'O(n log n) search'
      ],
      correctIndex: 1
    },
    {
      question: 'CRDTs are used for:',
      options: [
        'Compression',
        'Conflict-free distributed data',
        'Cache management',
        'Compilation'
      ],
      correctIndex: 1
    },
    {
      question: 'The CAP theorem says you can have at most:',
      options: ['1 of 3', '2 of 3', '3 of 3', 'None'],
      correctIndex: 1
    }
  ]
};

// Generate 5 random questions for a language + difficulty
export function generateQuestions(
  language: string,
  difficulty: Difficulty
): CWQuestion[] {
  const langBank = questionBank[language];
  const pool = langBank?.[difficulty] ?? genericQuestions[difficulty];

  // Shuffle and pick 5
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map((q, i) => ({
    id: i + 1,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex
  }));
}

// XP reward by difficulty
export const xpByDifficulty: Record<Difficulty, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
  expert: 350
};
