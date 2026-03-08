'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  programmingLanguages,
  difficultyColors,
  xpByDifficulty,
  generateQuestions,
  type CWQuestion
} from '@/constants/mock-codewar';
import { cn } from '@/lib/utils';
import {
  IconSwords,
  IconCheck,
  IconX,
  IconLock,
  IconArrowLeft,
  IconArrowRight,
  IconConfetti,
  IconFlame
} from '@tabler/icons-react';
import { useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
type Phase = 'select' | 'quiz' | 'result';

interface DailyResult {
  language: string;
  difficulty: Difficulty;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  answers: (number | null)[];
  questions: CWQuestion[];
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
  const [phase, setPhase] = useState<Phase>('select');
  const [questions, setQuestions] = useState<CWQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [dailyResults, setDailyResults] = useState<DailyResult[]>([]);

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

  // Check if this combo was completed today
  const hasCompleted = (lang: string, diff: string) =>
    dailyResults.some((r) => r.language === lang && r.difficulty === diff);

  const currentResult =
    language && difficulty
      ? dailyResults.find(
          (r) => r.language === language && r.difficulty === difficulty
        )
      : null;

  function startChallenge() {
    if (!language || !difficulty) return;
    const q = generateQuestions(language, difficulty);
    setQuestions(q);
    setAnswers(Array.from({ length: q.length }, () => null));
    setCurrentQ(0);
    setPhase('quiz');
  }

  function selectAnswer(i: number) {
    const next = [...answers];
    next[currentQ] = i;
    setAnswers(next);
  }

  function finishQuiz() {
    const correct = answers.reduce<number>(
      (c, a, i) => c + (a === questions[i].correctIndex ? 1 : 0),
      0
    );
    const xpPerQ = Math.floor(xpByDifficulty[difficulty as Difficulty] / 5);
    const result: DailyResult = {
      language,
      difficulty: difficulty as Difficulty,
      correctCount: correct,
      totalQuestions: questions.length,
      xpEarned: correct * xpPerQ,
      answers,
      questions
    };
    setDailyResults((prev) => [...prev, result]);
    setPhase('result');
  }

  // --- SELECT PHASE ---
  if (phase === 'select') {
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>Challenges</h1>
          <p className='text-muted-foreground text-sm'>
            Pick your weapon and difficulty
          </p>
        </div>

        {/* Language Selection */}
        <section>
          <h2 className='text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase'>
            Programming Language
          </h2>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
            {programmingLanguages.map((lang) => (
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
                {language && hasCompleted(language, diff) && (
                  <IconCheck className='ml-auto size-5 text-green-500' />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Today's completed results */}
        {dailyResults.length > 0 && (
          <section>
            <h2 className='text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase'>
              Today&apos;s Results
            </h2>
            <div className='space-y-2'>
              {dailyResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setLanguage(r.language);
                    setDifficulty(r.difficulty);
                    setQuestions(r.questions);
                    setAnswers(r.answers);
                    setPhase('result');
                  }}
                  className='flex w-full items-center justify-between rounded-xl border bg-green-50/50 p-3.5 text-left transition-colors hover:bg-green-50 dark:bg-green-950/20'
                >
                  <div className='flex items-center gap-3'>
                    <IconCheck className='size-5 text-green-500' />
                    <div>
                      <p className='text-sm font-medium'>
                        {r.language}{' '}
                        <span className='text-muted-foreground capitalize'>
                          ({r.difficulty})
                        </span>
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        {r.correctCount}/{r.totalQuestions} correct
                      </p>
                    </div>
                  </div>
                  <span className='text-sm font-bold text-green-600 dark:text-green-400'>
                    +{r.xpEarned} XP
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Start Button */}
        {language && difficulty && !currentResult && (
          <div className='rounded-xl border border-dashed border-violet-300 bg-violet-50 p-4 text-center dark:border-violet-800 dark:bg-violet-950/30'>
            <p className='text-sm font-medium'>
              🤫 5 surprise {language} questions await!
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
            >
              <IconSwords className='mr-2 size-5' />
              Start Challenge
            </Button>
          </div>
        )}

        {language && difficulty && currentResult && (
          <div className='rounded-xl border border-green-300 bg-green-50/50 p-4 text-center dark:border-green-800 dark:bg-green-950/20'>
            <p className='text-sm font-medium text-green-700 dark:text-green-400'>
              Already completed today!
            </p>
            <p className='text-muted-foreground mt-1 text-xs'>
              Score: {currentResult.correctCount}/{currentResult.totalQuestions}{' '}
              | +{currentResult.xpEarned} XP
            </p>
            <Button
              variant='outline'
              className='mt-3 rounded-xl'
              onClick={() => {
                setQuestions(currentResult.questions);
                setAnswers(currentResult.answers);
                setPhase('result');
              }}
            >
              View Results
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
              disabled={!allAnswered}
            >
              <IconLock className='mr-1 size-4' />
              Submit & Lock
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
    (c, a, i) => c + (a === questions[i].correctIndex ? 1 : 0),
    0
  );
  const xpPerQ = Math.floor(
    xpByDifficulty[difficulty as Difficulty] / questions.length
  );
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

      <Button
        className='h-11 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600'
        onClick={() => {
          setPhase('select');
          setLanguage('');
          setDifficulty('');
        }}
      >
        New Challenge
      </Button>
    </div>
  );
}
