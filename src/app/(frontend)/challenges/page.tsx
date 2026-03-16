'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  IconSwords,
  IconCheck,
  IconX,
  IconLock,
  IconArrowLeft,
  IconArrowRight,
  IconConfetti,
  IconFlame,
  IconLoader2,
  IconCalendar
} from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  expert:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

const xpByDifficulty: Record<string, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
  expert: 350
};

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
type Phase = 'loading' | 'select' | 'quiz' | 'result';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

interface ChallengeData {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  xpReward: number;
}

const diffEmoji: Record<string, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
  expert: '🟣'
};

export default function ChallengesPage() {
  const [language, setLanguage] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
  const [phase, setPhase] = useState<Phase>('loading');
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

  // Check if user already completed today's challenge
  const checkToday = useCallback(async () => {
    try {
      const res = await fetch('/api/challenges/today');
      if (!res.ok) {
        setPhase('select');
        return;
      }
      const data = await res.json();
      if (data.attempt) {
        // Already completed today — show result
        setChallenge({
          id: data.attempt.challengeId,
          title: data.attempt.title,
          description: '',
          language: data.attempt.language,
          difficulty: data.attempt.difficulty,
          xpReward: data.attempt.xpReward
        });
        setQuestions(data.attempt.questions);
        setAnswers(data.attempt.answers);
        setLanguage(data.attempt.language);
        setDifficulty(data.attempt.difficulty as Difficulty);
        setPhase('result');
      } else {
        setPhase('select');
      }
    } catch {
      setPhase('select');
    }
  }, []);

  useEffect(() => {
    // Load languages and check today's status in parallel
    Promise.all([
      fetch('/api/languages')
        .then((res) => res.json())
        .then((data) => {
          setAvailableLanguages(
            data.languages?.map((l: { name: string }) => l.name) ?? []
          );
        })
        .catch(() => {}),
      checkToday()
    ]);
  }, [checkToday]);

  async function startChallenge() {
    if (!language || !difficulty) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/challenges?language=${encodeURIComponent(language)}&difficulty=${difficulty}`
      );
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to load challenge');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setChallenge(data.challenge);
      setQuestions(data.questions);
      setAnswers(Array.from({ length: data.questions.length }, () => null));
      setCurrentQ(0);
      setPhase('quiz');
    } catch {
      toast.error('Failed to load challenge');
    }
    setLoading(false);
  }

  function selectAnswer(i: number) {
    const next = [...answers];
    next[currentQ] = i;
    setAnswers(next);
  }

  async function finishQuiz() {
    if (!challenge) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/challenges/${challenge.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      if (!res.ok) {
        toast.error('Failed to submit');
        setSubmitting(false);
        return;
      }
      setPhase('result');
    } catch {
      toast.error('Failed to submit');
    }
    setSubmitting(false);
  }

  // --- LOADING ---
  if (phase === 'loading') {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <IconLoader2 className='text-muted-foreground size-8 animate-spin' />
      </div>
    );
  }

  // --- SELECT PHASE ---
  if (phase === 'select') {
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>Daily Challenge</h1>
          <p className='text-muted-foreground text-sm'>
            Pick your weapon and difficulty — one challenge per day!
          </p>
        </div>

        {/* Language Selection */}
        <section>
          <h2 className='text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase'>
            Programming Language
          </h2>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'rounded-xl border-2 p-3 text-left text-sm font-medium transition-all active:scale-[0.97]',
                  language === lang
                    ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-950/30'
                    : 'bg-muted/50 border-transparent hover:border-violet-200 dark:hover:border-violet-800'
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty Selection */}
        <section>
          <h2 className='text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase'>
            Difficulty
          </h2>
          <div className='grid grid-cols-2 gap-2'>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl border-2 p-3.5 text-left transition-all active:scale-[0.97]',
                  difficulty === diff
                    ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-950/30'
                    : 'bg-muted/50 border-transparent hover:border-violet-200 dark:hover:border-violet-800'
                )}
              >
                <span className='text-lg'>{diffEmoji[diff]}</span>
                <div>
                  <p className='font-semibold capitalize'>{diff}</p>
                  <p className='text-muted-foreground text-xs'>
                    +{xpByDifficulty[diff]} XP
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Start Button */}
        {language && difficulty && (
          <div className='rounded-xl border border-dashed border-violet-300 bg-violet-50 p-4 text-center dark:border-violet-800 dark:bg-violet-950/30'>
            <p className='text-sm font-medium'>
              5 AI-generated {language} questions await!
            </p>
            <p className='text-muted-foreground mt-1 text-xs'>
              Difficulty:{' '}
              <span className='font-semibold capitalize'>{difficulty}</span> |
              Up to{' '}
              <span className='font-bold text-green-600 dark:text-green-400'>
                +{xpByDifficulty[difficulty as Difficulty]} XP
              </span>
            </p>
            <Button
              className='mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-base font-bold text-white shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-fuchsia-600'
              onClick={startChallenge}
              disabled={loading}
            >
              {loading ? (
                <IconLoader2 className='mr-2 size-5 animate-spin' />
              ) : (
                <IconSwords className='mr-2 size-5' />
              )}
              {loading ? 'Generating Challenge...' : 'Start Daily Challenge'}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // --- QUIZ PHASE ---
  if (phase === 'quiz') {
    const q = questions[currentQ];
    const selected = answers[currentQ];
    const allAnswered = answers.every((a) => a !== null);
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
              {language}
            </p>
            <p className='text-sm font-semibold'>
              Question {currentQ + 1} of {questions.length}
            </p>
          </div>
          <Badge
            variant='secondary'
            className={cn('capitalize', difficultyColors[difficulty as string])}
          >
            {difficulty}
          </Badge>
        </div>

        <div className='bg-muted h-2 overflow-hidden rounded-full'>
          <div
            className='h-full rounded-full bg-violet-500 transition-all'
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className='flex justify-center gap-2'>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={cn(
                'size-3 rounded-full transition-all',
                i === currentQ
                  ? 'scale-125 bg-violet-500'
                  : answers[i] !== null
                    ? 'bg-violet-300 dark:bg-violet-700'
                    : 'bg-muted'
              )}
            />
          ))}
        </div>

        <div className='rounded-2xl border-2 border-violet-200 bg-gradient-to-b from-violet-50 to-white p-5 dark:border-violet-900 dark:from-violet-950/30 dark:to-transparent'>
          <p className='text-lg leading-snug font-semibold'>{q.question}</p>
        </div>

        <div className='space-y-2.5'>
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98]',
                selected === i
                  ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-950/30'
                  : 'bg-muted/50 border-transparent hover:border-violet-200 dark:hover:border-violet-800'
              )}
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                  selected === i
                    ? 'bg-violet-500 text-white'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className='font-medium'>{option}</span>
            </button>
          ))}
        </div>

        <div className='flex items-center justify-between gap-3'>
          <Button
            variant='outline'
            className='rounded-xl'
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
          >
            <IconArrowLeft className='mr-1 size-4' />
            Prev
          </Button>
          {currentQ < questions.length - 1 ? (
            <Button
              className='rounded-xl'
              onClick={() => setCurrentQ(currentQ + 1)}
              disabled={selected === null}
            >
              Next
              <IconArrowRight className='ml-1 size-4' />
            </Button>
          ) : (
            <Button
              className='rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-bold text-white hover:from-green-600 hover:to-emerald-600'
              onClick={finishQuiz}
              disabled={!allAnswered || submitting}
            >
              {submitting ? (
                <IconLoader2 className='mr-1 size-4 animate-spin' />
              ) : (
                <IconLock className='mr-1 size-4' />
              )}
              {submitting ? 'Submitting...' : 'Submit & Lock'}
            </Button>
          )}
        </div>
        {!allAnswered && currentQ === questions.length - 1 && (
          <p className='text-muted-foreground text-center text-xs'>
            Answer all questions to submit
          </p>
        )}
      </div>
    );
  }

  // --- RESULT PHASE ---
  const correctCount = answers.reduce<number>(
    (c, a, i) => c + (a === questions[i]?.correctIndex ? 1 : 0),
    0
  );
  const xpPerQ = challenge
    ? Math.floor(challenge.xpReward / questions.length)
    : 0;
  const totalXpEarned = correctCount * xpPerQ;

  return (
    <div className='space-y-6'>
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-6 text-center text-white'>
        <div className='absolute -top-8 -right-8 size-32 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          {correctCount === questions.length ? (
            <>
              <IconConfetti className='mx-auto size-12' />
              <h1 className='mt-2 text-2xl font-bold'>Perfect Score!</h1>
            </>
          ) : correctCount >= questions.length * 0.6 ? (
            <>
              <IconFlame className='mx-auto size-12' />
              <h1 className='mt-2 text-2xl font-bold'>Nice Work!</h1>
            </>
          ) : (
            <>
              <IconSwords className='mx-auto size-12' />
              <h1 className='mt-2 text-2xl font-bold'>Keep Practicing!</h1>
            </>
          )}
          <p className='mt-1 text-sm text-white/80'>
            {language} | {difficulty} | {correctCount} of {questions.length}{' '}
            correct
          </p>
          <div className='mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-lg font-bold'>
            +{totalXpEarned} XP earned
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 text-center'>
        <div className='rounded-xl border p-3'>
          <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
            {correctCount}
          </p>
          <p className='text-muted-foreground text-[10px]'>Correct</p>
        </div>
        <div className='rounded-xl border p-3'>
          <p className='text-2xl font-bold text-red-600 dark:text-red-400'>
            {questions.length - correctCount}
          </p>
          <p className='text-muted-foreground text-[10px]'>Wrong</p>
        </div>
        <div className='rounded-xl border p-3'>
          <p className='text-2xl font-bold text-violet-600 dark:text-violet-400'>
            {Math.round((correctCount / questions.length) * 100)}%
          </p>
          <p className='text-muted-foreground text-[10px]'>Score</p>
        </div>
      </div>

      <div>
        <div className='mb-3 flex items-center gap-2'>
          <IconLock className='text-muted-foreground size-4' />
          <h2 className='font-semibold'>Answers Locked</h2>
        </div>
        <div className='space-y-3'>
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.id}
                className={cn(
                  'rounded-xl border-2 p-4',
                  isCorrect
                    ? 'border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20'
                    : 'border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20'
                )}
              >
                <div className='flex items-start gap-2'>
                  <span
                    className={cn(
                      'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    )}
                  >
                    {isCorrect ? (
                      <IconCheck className='size-4' />
                    ) : (
                      <IconX className='size-4' />
                    )}
                  </span>
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{q.question}</p>
                    <div className='mt-2 space-y-1.5'>
                      {q.options.map((opt, j) => (
                        <div
                          key={j}
                          className={cn(
                            'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm',
                            j === q.correctIndex &&
                              'bg-green-100 font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300',
                            j === userAnswer &&
                              j !== q.correctIndex &&
                              'bg-red-100 font-medium text-red-800 line-through dark:bg-red-900/40 dark:text-red-300',
                            j !== q.correctIndex &&
                              j !== userAnswer &&
                              'text-muted-foreground'
                          )}
                        >
                          <span className='text-xs font-bold'>
                            {String.fromCharCode(65 + j)}.
                          </span>
                          {opt}
                          {j === q.correctIndex && (
                            <IconCheck className='ml-auto size-3.5 text-green-600' />
                          )}
                          {j === userAnswer && j !== q.correctIndex && (
                            <IconX className='ml-auto size-3.5 text-red-600' />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className='mt-2 text-right'>
                      <span
                        className={cn(
                          'text-xs font-bold',
                          isCorrect
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-muted-foreground'
                        )}
                      >
                        {isCorrect ? `+${xpPerQ} XP` : '+0 XP'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Come back tomorrow */}
      <div className='rounded-xl border border-dashed border-violet-300 bg-violet-50/50 p-4 text-center dark:border-violet-800 dark:bg-violet-950/20'>
        <IconCalendar className='mx-auto size-8 text-violet-500' />
        <p className='mt-2 text-sm font-semibold'>Come back tomorrow!</p>
        <p className='text-muted-foreground mt-1 text-xs'>
          A fresh AI-generated challenge awaits you every day.
        </p>
      </div>
    </div>
  );
}
