'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import {
  IconTrophy,
  IconMedal,
  IconAward,
  IconFilter
} from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TimePeriod = 'all' | 'month' | 'week' | 'today';
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'expert';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  level: number;
  primaryLanguage: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [language, setLanguage] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available languages once
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/languages', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Languages API returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const langs = data?.languages;
        setLanguages(
          Array.isArray(langs) ? langs.map((l: { name: string }) => l.name) : []
        );
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Failed to fetch languages:', err);
      });
    return () => controller.abort();
  }, []);

  // Fetch leaderboard when filters change
  const fetchLeaderboard = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          period: timePeriod,
          difficulty,
          language
        });
        const res = await fetch(`/api/leaderboard?${params}`, { signal });
        if (res.ok) {
          const data = await res.json();
          setEntries(Array.isArray(data.entries) ? data.entries : []);
        } else {
          setEntries([]);
        }
        setLoading(false);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setEntries([]);
        setLoading(false);
      }
    },
    [timePeriod, difficulty, language]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchLeaderboard(controller.signal);
    return () => controller.abort();
  }, [fetchLeaderboard]);

  const showPodium = !loading && entries.length >= 3;
  const top3 = useMemo(() => entries.slice(0, 3), [entries]);
  const listEntries = useMemo(
    () => (entries.length >= 3 ? entries.slice(3) : entries),
    [entries]
  );

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
              {languages.map((lang) => (
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

      {/* Loading skeleton */}
      {loading && (
        <div className='space-y-2'>
          <div className='flex items-end justify-center gap-3 px-2'>
            {[14, 28, 14].map((h, i) => (
              <div key={i} className='flex flex-1 flex-col items-center gap-2'>
                <div className='bg-muted size-14 animate-pulse rounded-full' />
                <div className='bg-muted h-3 w-16 animate-pulse rounded' />
                <div
                  className={`bg-muted w-full animate-pulse rounded-t-xl`}
                  style={{ height: `${h * 4}px` }}
                />
              </div>
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='flex items-center gap-3 rounded-xl border p-3.5'
            >
              <div className='bg-muted size-8 animate-pulse rounded-full' />
              <div className='bg-muted size-9 animate-pulse rounded-full' />
              <div className='flex-1 space-y-1.5'>
                <div className='bg-muted h-3 w-24 animate-pulse rounded' />
                <div className='bg-muted h-2.5 w-16 animate-pulse rounded' />
              </div>
              <div className='space-y-1 text-right'>
                <div className='bg-muted ml-auto h-3 w-12 animate-pulse rounded' />
                <div className='bg-muted ml-auto h-2.5 w-8 animate-pulse rounded' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Podium */}
      {showPodium && (
        <div className='flex items-end justify-center gap-3 px-2'>
          {/* 2nd Place */}
          <div className='flex flex-1 flex-col items-center'>
            <Avatar className='size-14 ring-2 ring-gray-300'>
              <AvatarFallback>
                {top3[1].username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className='mt-1.5 text-center text-sm leading-tight font-semibold'>
              {top3[1].username}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[1].score.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-20 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-gray-200 to-gray-100 pt-3 dark:from-gray-800 dark:to-gray-700'>
              <IconMedal className='size-6 text-gray-500' />
            </div>
          </div>

          {/* 1st Place */}
          <div className='flex flex-1 flex-col items-center'>
            <div className='relative'>
              <Avatar className='size-16 ring-2 ring-yellow-400'>
                <AvatarFallback>
                  {top3[0].username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className='absolute -top-2 -right-2 text-xl'>👑</span>
            </div>
            <p className='mt-1.5 text-center text-sm leading-tight font-bold'>
              {top3[0].username}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[0].score.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-28 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-yellow-300 to-yellow-100 pt-3 dark:from-yellow-700 dark:to-yellow-600'>
              <IconTrophy className='size-7 text-yellow-600 dark:text-yellow-300' />
            </div>
          </div>

          {/* 3rd Place */}
          <div className='flex flex-1 flex-col items-center'>
            <Avatar className='size-14 ring-2 ring-amber-500'>
              <AvatarFallback>
                {top3[2].username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className='mt-1.5 text-center text-sm leading-tight font-semibold'>
              {top3[2].username}
            </p>
            <p className='text-muted-foreground text-xs'>
              {top3[2].score.toLocaleString()} XP
            </p>
            <div className='mt-2 flex h-14 w-full items-start justify-center rounded-t-xl bg-gradient-to-t from-amber-300 to-amber-100 pt-3 dark:from-amber-800 dark:to-amber-700'>
              <IconAward className='size-5 text-amber-700 dark:text-amber-300' />
            </div>
          </div>
        </div>
      )}

      {/* Rest of rankings */}
      {!loading && listEntries.length > 0 && (
        <div className='space-y-2'>
          {listEntries.map((entry) => (
            <div
              key={entry.userId}
              className={cn(
                'hover:bg-accent/50 flex items-center gap-3 rounded-xl border p-3.5 transition-colors',
                entry.userId === user?.id &&
                  'border-violet-400/40 bg-violet-50/50 dark:bg-violet-950/20'
              )}
            >
              <span className='bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                {entry.rank}
              </span>
              <Avatar className='size-9'>
                <AvatarFallback>
                  {entry.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <p className='text-sm font-medium'>
                  {entry.username}
                  {entry.userId === user?.id && (
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
                  {entry.score.toLocaleString()}
                </p>
                <p className='text-muted-foreground text-[10px]'>
                  Lvl {entry.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && (
        <div className='rounded-xl border-2 border-dashed p-8 text-center'>
          <p className='text-muted-foreground text-sm'>
            No warriors found with these filters
          </p>
        </div>
      )}
    </div>
  );
}
