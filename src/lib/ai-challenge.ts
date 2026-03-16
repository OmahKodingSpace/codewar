import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  ...(process.env.ANTHROPIC_BASE_URL && {
    baseURL: process.env.ANTHROPIC_BASE_URL
  })
});

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface GeneratedChallenge {
  title: string;
  description: string;
  category: string;
  tags: string[];
  questions: GeneratedQuestion[];
}

const XP_BY_DIFFICULTY: Record<string, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
  expert: 350
};

export function getXpReward(difficulty: string): number {
  return XP_BY_DIFFICULTY[difficulty] ?? 50;
}

export async function generateChallenge(
  language: string,
  difficulty: string,
  recentChallenges: string[] = []
): Promise<GeneratedChallenge> {
  const difficultyGuide: Record<string, string> = {
    easy: 'beginner-friendly concepts, basic syntax, simple logic',
    medium: 'intermediate concepts, common patterns, moderate complexity',
    hard: 'advanced concepts, complex algorithms, optimization techniques',
    expert:
      'expert-level topics, system design, advanced data structures, obscure language features'
  };

  const prompt = `Generate a coding challenge quiz for ${language} at ${difficulty} difficulty level.

Difficulty guide: ${difficultyGuide[difficulty] || difficultyGuide.medium}

Return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "title": "Short challenge title (2-5 words)",
  "description": "One sentence describing what this challenge tests",
  "category": "One of: Arrays, Strings, Trees, Graphs, Dynamic Programming, Stacks, Linked Lists, Design, Sorting, Recursion",
  "tags": ["tag1", "tag2"],
  "questions": [
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0
    }
  ]
}

Rules:
- Generate exactly 5 multiple-choice questions
- Each question must have exactly 4 options
- correctIndex is 0-based (0, 1, 2, or 3)
- Questions should be specific to ${language} programming
- Questions should test understanding, not just memorization
- Make questions varied — mix conceptual, practical, and code-reading questions
- For ${difficulty} difficulty, adjust complexity accordingly
- Do NOT include any markdown formatting, code fences, or explanation — only the JSON object
${recentChallenges.length > 0 ? `\nIMPORTANT: Do NOT repeat these recent challenges. Generate something completely different:\n${recentChallenges.map((t, i) => `${i + 1}. ${t}`).join('\n')}` : ''}`;

  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }]
  });

  const text =
    message.content[0].type === 'text' ? message.content[0].text : '';

  // Parse JSON from response (handle potential wrapping)
  const jsonStr = text
    .trim()
    .replace(/^```json?\n?/, '')
    .replace(/\n?```$/, '');
  const parsed = JSON.parse(jsonStr) as GeneratedChallenge;

  // Validate structure
  if (
    !parsed.title ||
    !parsed.questions ||
    parsed.questions.length !== 5 ||
    !parsed.questions.every(
      (q) =>
        q.question &&
        q.options?.length === 4 &&
        typeof q.correctIndex === 'number' &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3
    )
  ) {
    throw new Error('Invalid challenge structure from AI');
  }

  return parsed;
}
