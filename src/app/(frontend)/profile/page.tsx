import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { currentUser, achievementsData } from '@/constants/mock-codewar';
import {
  IconFlame,
  IconCode,
  IconTrophy,
  IconCalendar,
  IconMail
} from '@tabler/icons-react';

export default function ProfilePage() {
  const unlockedAchievements = achievementsData.filter(
    (a) => a.unlockedAt !== null
  );
  const xpToNextLevel = 500;
  const xpInLevel = currentUser.xp % xpToNextLevel;
  const xpProgress = (xpInLevel / xpToNextLevel) * 100;
  const joinDate = new Date(currentUser.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  return (
    <div className='space-y-6'>
      {/* Profile Header */}
      <div className='flex flex-col items-center text-center'>
        <Avatar className='size-24 ring-4 ring-violet-200 dark:ring-violet-800'>
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className='text-2xl'>
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className='mt-3 text-xl font-bold'>{currentUser.name}</h1>
        <p className='text-muted-foreground text-sm'>@{currentUser.username}</p>
        <Badge className='mt-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'>
          Level {currentUser.level} Warrior
        </Badge>
        <p className='text-muted-foreground mt-3 max-w-xs text-sm'>
          {currentUser.bio}
        </p>
      </div>

      {/* Level Progress */}
      <div className='rounded-xl border p-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-medium'>Level {currentUser.level}</span>
          <span className='text-muted-foreground'>
            {xpInLevel}/{xpToNextLevel} XP
          </span>
        </div>
        <Progress value={xpProgress} className='mt-2 h-2.5' />
        <p className='text-muted-foreground mt-1.5 text-xs'>
          Total: {currentUser.xp.toLocaleString()} XP
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30'>
            <IconTrophy className='size-5 text-yellow-600 dark:text-yellow-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>#{currentUser.rank}</p>
            <p className='text-muted-foreground text-xs'>Rank</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
            <IconCode className='size-5 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>{currentUser.challengesSolved}</p>
            <p className='text-muted-foreground text-xs'>Solved</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30'>
            <IconFlame className='size-5 text-orange-600 dark:text-orange-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>{currentUser.streak}</p>
            <p className='text-muted-foreground text-xs'>Day Streak</p>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl border p-3.5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30'>
            <IconTrophy className='size-5 text-green-600 dark:text-green-400' />
          </div>
          <div>
            <p className='text-lg font-bold'>{unlockedAchievements.length}</p>
            <p className='text-muted-foreground text-xs'>Badges</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className='space-y-3 rounded-xl border p-4'>
        <div className='flex items-center gap-3 text-sm'>
          <IconMail className='text-muted-foreground size-4' />
          <span>{currentUser.email}</span>
        </div>
        <div className='flex items-center gap-3 text-sm'>
          <IconCode className='text-muted-foreground size-4' />
          <span>{currentUser.language}</span>
        </div>
        <div className='flex items-center gap-3 text-sm'>
          <IconCalendar className='text-muted-foreground size-4' />
          <span>Joined {joinDate}</span>
        </div>
      </div>

      {/* Recent Badges */}
      <section>
        <h2 className='mb-3 font-semibold'>Recent Badges</h2>
        <div className='flex flex-wrap gap-3'>
          {unlockedAchievements.map((a) => (
            <div
              key={a.id}
              className='flex flex-col items-center gap-1 rounded-xl border p-3'
            >
              <span className='text-2xl'>
                {a.icon === 'sword'
                  ? '🗡️'
                  : a.icon === 'flame'
                    ? '🔥'
                    : a.icon === 'bolt'
                      ? '⚡'
                      : a.icon === 'moon'
                        ? '🌙'
                        : a.icon === 'trophy'
                          ? '🏆'
                          : '🏅'}
              </span>
              <span className='max-w-16 text-center text-[10px] leading-tight font-medium'>
                {a.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
