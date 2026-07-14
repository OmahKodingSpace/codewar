import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  ...(process.env.OPENAI_BASE_URL && {
    baseURL: process.env.OPENAI_BASE_URL
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
  console.log(
    'Generating challenge for',
    language,
    difficulty,
    recentChallenges
  );

  const difficultyGuide: Record<string, string> = {
    easy: 'beginner-friendly concepts, basic syntax, simple logic',
    medium: 'intermediate concepts, common patterns, moderate complexity',
    hard: 'advanced concepts, complex algorithms, optimization techniques',
    expert:
      'expert-level topics, system design, advanced data structures, obscure language features'
  };

  const prompt = `Generate a coding challenge quiz for ${language} at ${difficulty} difficulty level.

Difficulty guide: ${difficultyGuide[difficulty] || difficultyGuide.medium}

CRITICAL: Return ONLY valid JSON with EXACTLY this structure (no markdown, code fences, or extra text):
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

MANDATORY REQUIREMENTS (failure means invalid response):
- Generate EXACTLY 5 questions
- EVERY question MUST have EXACTLY 4 options (no more, no less)
- Each option must be a complete, non-empty string (minimum 5 characters)
- correctIndex MUST be 0, 1, 2, or 3 (0-based)
- All questions must be specific to ${language} programming
- Questions must test understanding, not memorization
- Mix conceptual, practical, and code-reading questions
- Adjust complexity for ${difficulty} difficulty level

STRICT FORMATTING:
- Output ONLY valid JSON
- NO markdown, code fences, backticks, or explanatory text
- NO text before or after the JSON object
- NO incomplete options
${recentChallenges.length > 0 ? `\nIMPORTANT: Do NOT repeat these recent challenges. Generate something completely different:\n${recentChallenges.map((t, i) => `${i + 1}. ${t}`).join('\n')}` : ''}`;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    max_tokens: 8192,
    response_format: { type: 'json_object' },
    messages: [{ role: 'user', content: prompt }]
  });

  console.log('Completion:', completion);

  if (completion.choices[0]?.finish_reason === 'length') {
    throw new Error(
      'AI response truncated (hit max_tokens) — raise max_tokens'
    );
  }

  const text = completion.choices[0]?.message?.content ?? '';

  // Strip reasoning-model <think> blocks and code fences, then grab the JSON object
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  const jsonStr =
    start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned;

  console.log('JSON string:', jsonStr);

  const parsed = JSON.parse(jsonStr) as GeneratedChallenge;

  console.log('Parsed:', parsed);

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
