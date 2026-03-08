'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  leaderboardFullData,
  programmingLanguages,
  currentUser
} from '@/constants/mock-codewar';
import { cn } from '@/lib/utils';
import {
  IconTrophy,
  IconMedal,
  IconAward,
  IconFilter
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';

type TimePeriod = 'all' | 'month' | 'week' | 'today';
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'expert';

export default function LeaderboardPage() {
  const [language, setLanguage] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [showFilters, setShowFilters] = useState(false);

  const ranked = useMemo(() => {
    let entries = leaderboardFullData.map((entry) => {
      let score = entry.xp;

      // Apply time filter
      if (timePeriod === 'today') score = entry.todayXp;
      else if (timePeriod === 'week') score = entry.weekXp;
      else if (timePeriod === 'month') score = entry.monthXp;

      // Apply difficulty filter
      if (difficulty === 'easy') score = entry.easyScore;
      else if (difficulty === 'medium') score = entry.mediumScore;
      else if (difficulty === 'hard') score = entry.hardScore;
      else if (difficulty === 'expert') score = entry.expertScore;

      return { ...entry, displayScore: score };
    });

    // Apply language filter
    if (language !== 'all') {
      entries = entries.filter((e) => e.primaryLanguage === language);
    }

    // Sort by score descending
    entries.sort((a, b) => b.displayScore - a.displayScore);

    // Re-rank
    return entries.map((e, i) => ({ ...e, displayRank: i + 1 }));
  }, [language, difficulty, timePeriod]);

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const activeFilterCount =
    (language !== 'all' ? 1 : 0) +
    (difficulty !== 'all' ? 1 : 0) +
    (timePeriod !== 'all' ? 1 : 0);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Leaderboard</h1>
          <p className='text-muted-foreground text-sm'>Who reigns supreme?</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'relative flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
            showFilters
              ? 'border-violet-400 bg-violet-50 text-violet-700 dark:border-violet-600 dark:bg-violet-950/30 dark:text-violet-300'
              : 'hover:bg-accent'
          )}
        >
          <IconFilter className='size-4' />
          Filters
          {activeFilterCount > 0 && (
            <span className='flex size-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white'>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className='space-y-4 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-4 dark:border-violet-800 dark:bg-violet-950/20'>
          {/* Time Period */}
          <div>
            <p className='mb-2 text-xs font-semibold tracking-wider text-violet-600 uppercase dark:text-violet-400'>
              Time Period
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {(
                [
                  ['all', 'All Time'],
                  ['month', 'Month'],
                  ['week', 'Week'],
                  ['today', 'Today']
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setTimePeriod(val)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    timePeriod === val
                      ? 'bg-violet-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-violet-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-violet-900/40'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <p className='mb-2 text-xs font-semibold tracking-wider text-violet-600 uppercase dark:text-violet-400'>
              Difficulty
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {(
                [
                  ['all', 'All'],
                  ['easy', 'Easy'],
                  ['medium', 'Medium'],
                  ['hard', 'Hard'],
                  ['expert', 'Expert']
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setDifficulty(val)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    difficulty === val
                      ? 'bg-violet-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-violet-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-violet-900/40'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <p className='mb-2 text-xs font-semibold tracking-wider text-violet-600 uppercase dark:text-violet-400'>
              Language
            </p>
            <div className='flex flex-wrap gap-1.5'>
              <button
                onClick={() => setLanguage('all')}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  language === 'all'
                    ? 'bg-violet-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-violet-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-violet-900/40'
                )}
              >
                All
              </button>
              {programmingLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    language === lang
                      ? 'bg-violet-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-violet-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-violet-900/40'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Podium - only show if we have at least 3 */}
      {top3.length >= 3 && (
        <div className='flex items-end justify-center gap-3 px-2'>
          {/* 2nd Place */}
          <div className='flex flex-1 flex-col items-center'>
            <Avatar className='size-14 ring-2 ring-gray-300'>
              <AvatarImage src={top3[1].avatar} alt={top3[1].name} />
              <AvatarFallback>{top3[1].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className='mt-1.5 text-center text-sm leading-tight font-semibold'>
              {top3[1].name.split(' ')[0]}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[1].displayScore.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-20 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-gray-200 to-gray-100 pt-3 dark:from-gray-800 dark:to-gray-700'>
              <IconMedal className='size-6 text-gray-500' />
            </div>
          </div>

          {/* 1st Place */}
          <div className='flex flex-1 flex-col items-center'>
            <div className='relative'>
              <Avatar className='size-16 ring-2 ring-yellow-400'>
                <AvatarImage src={top3[0].avatar} alt={top3[0].name} />
                <AvatarFallback>{top3[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className='absolute -top-2 -right-2 text-xl'>👑</span>
            </div>
            <p className='mt-1.5 text-center text-sm leading-tight font-bold'>
              {top3[0].name.split(' ')[0]}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[0].displayScore.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-28 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-yellow-300 to-yellow-100 pt-3 dark:from-yellow-700 dark:to-yellow-600'>
              <IconTrophy className='size-7 text-yellow-600 dark:text-yellow-300' />
            </div>
          </div>

          {/* 3rd Place */}
          <div className='flex flex-1 flex-col items-center'>
            <Avatar className='size-14 ring-2 ring-amber-500'>
              <AvatarImage src={top3[2].avatar} alt={top3[2].name} />
              <AvatarFallback>{top3[2].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className='mt-1.5 text-center text-sm leading-tight font-semibold'>
              {top3[2].name.split(' ')[0]}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[2].displayScore.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-14 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-amber-300 to-amber-100 pt-3 dark:from-amber-800 dark:to-amber-700'>
              <IconAward className='size-5 text-amber-700 dark:text-amber-300' />
            </div>
          </div>
        </div>
      )}

      {/* Rest of rankings */}
      {rest.length > 0 ? (
        <div className='space-y-2'>
          {rest.map((entry) => (
            <div
              key={entry.userId}
              className={cn(
                'hover:bg-accent/50 flex items-center gap-3 rounded-xl border p-3.5 transition-colors',
                entry.userId === currentUser.id &&
                  'border-violet-400/40 bg-violet-50/50 dark:bg-violet-950/20'
              )}
            >
              <span className='bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                {entry.displayRank}
              </span>
              <Avatar className='size-9'>
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <p className='text-sm font-medium'>
                  {entry.name}
                  {entry.userId === currentUser.id && (
                    <Badge
                      variant='secondary'
                      className='ml-1.5 px-1.5 text-[10px]'
                    >
                      you
                    </Badge>
                  )}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {entry.primaryLanguage}
                </p>
              </div>
              <div className='text-right'>
                <p className='text-sm font-bold'>
                  {entry.displayScore.toLocaleString()}
                </p>
                <p className='text-muted-foreground text-[10px]'>
                  Lvl {entry.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        top3.length < 3 && (
          <div className='rounded-xl border-2 border-dashed p-8 text-center'>
            <p className='text-muted-foreground text-sm'>
              No warriors found with these filters
            </p>
          </div>
        )
      )}
    </div>
  );
}
