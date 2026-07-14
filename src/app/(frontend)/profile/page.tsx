'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  IconFlame,
  IconCode,
  IconTrophy,
  IconCalendar,
  IconMail,
  IconSettings,
  IconLogout
} from '@tabler/icons-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';

interface UserStats {
  totalXp: number;
  level: number;
  challengesSolved: number;
  streak: number;
  rank: number;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading || statsLoading) {
    return <div className='py-8 text-center'>Loading...</div>;
  }

  if (!user) {
    return <div className='py-8 text-center'>Not authenticated</div>;
  }

  const xpToNextLevel = 500;
  const xpInLevel = (stats?.totalXp || 0) % xpToNextLevel;
  const xpProgress = (xpInLevel / xpToNextLevel) * 100;
  const joinDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  return (
    <div className='space-y-6'>
      {/* Profile Header */}
      <div className='flex flex-col items-center text-center'>
        <Avatar className='size-24 ring-4 ring-violet-200 dark:ring-violet-800'>
          <AvatarFallback className='text-2xl'>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className='mt-3 text-xl font-bold'>{user.username}</h1>
        <p className='text-muted-foreground text-sm'>@{user.username}</p>
        <Badge className='mt-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'>
          Level {stats?.level || 1} Warrior
        </Badge>
        <p className='text-muted-foreground mt-3 max-w-xs text-sm'>
          Coding enthusiast solving challenges
        </p>
      </div>

      {/* Level Progress */}
      <div className='rounded-xl border p-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-medium'>Level {stats?.level || 1}</span>
          <span className='text-muted-foreground'>
            {xpInLevel}/{xpToNextLevel} XP
          </span>
        </div>
        <Progress value={xpProgress} className='mt-2 h-2.5' />
        <p className='text-muted-foreground mt-1.5 text-xs'>
          Total: {(stats?.totalXp || 0).toLocaleString()} XP
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30'>
            <IconTrophy className='size-5 text-yellow-600 dark:text-yellow-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>#{stats?.rank || 0}</p>
            <p className='text-muted-foreground text-xs'>Rank</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
            <IconCode className='size-5 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>{stats?.challengesSolved || 0}</p>
            <p className='text-muted-foreground text-xs'>Solved</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30'>
            <IconFlame className='size-5 text-orange-600 dark:text-orange-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>{stats?.streak || 0}</p>
            <p className='text-muted-foreground text-xs'>Day Streak</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30'>
            <IconTrophy className='size-5 text-green-600 dark:text-green-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>0</p>
            <p className='text-muted-foreground text-xs'>Badges</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className='space-y-3 rounded-xl border p-4'>
        <div className='flex items-center gap-3 text-sm'>
          <IconMail className='text-muted-foreground size-4' />
          <span className='text-muted-foreground'>Not available yet</span>
        </div>
        <div className='flex items-center gap-3 text-sm'>
          <IconCode className='text-muted-foreground size-4' />
          <span className='text-muted-foreground'>Not available yet</span>
        </div>
        <div className='flex items-center gap-3 text-sm'>
          <IconCalendar className='text-muted-foreground size-4' />
          <span>Joined {joinDate}</span>
        </div>
      </div>

      {/* Recent Badges */}
      <section>
        <h2 className='mb-3 font-semibold'>Recent Badges</h2>
        <div className='flex items-center justify-center rounded-xl border p-6'>
          <p className='text-muted-foreground text-sm'>Coming soon</p>
        </div>
      </section>

      {/* Actions */}
      <div className='space-y-2'>
        <Button
          variant='outline'
          className='h-11 w-full justify-start rounded-xl'
        >
          <IconSettings className='mr-2 size-4' />
          Settings
        </Button>
        <Link href='/logout' className='block'>
          <Button
            variant='outline'
            className='h-11 w-full justify-start rounded-xl text-red-500 hover:text-red-600'
          >
            <IconLogout className='mr-2 size-4' />
            Sign out
          </Button>
        </Link>
      </div>
    </div>
  );
}
