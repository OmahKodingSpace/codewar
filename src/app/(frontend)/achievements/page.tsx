import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { achievementsData, badgesData } from '@/constants/mock-codewar';
import { cn } from '@/lib/utils';
import { IconCheck, IconLock } from '@tabler/icons-react';

const achievementEmoji: Record<string, string> = {
  sword: '🗡️',
  flame: '🔥',
  shield: '🛡️',
  brain: '🧠',
  bolt: '⚡',
  globe: '🌍',
  moon: '🌙',
  trophy: '🏆',
  calendar: '📅',
  crown: '👑'
};

export default function AchievementsPage() {
  const unlocked = achievementsData.filter((a) => a.unlockedAt !== null);
  const locked = achievementsData.filter((a) => a.unlockedAt === null);
  const totalXp = unlocked.reduce((sum, a) => sum + a.xpReward, 0);

  const earnedBadges = badgesData.filter((b) => b.earned);
  const unearnedBadges = badgesData.filter((b) => !b.earned);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Achievements & Badges</h1>
        <p className='text-muted-foreground text-sm'>Collect them all!</p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-3 gap-2.5'>
        <div className='rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 p-3 text-center dark:from-green-900/30 dark:to-emerald-900/20'>
          <p className='text-2xl font-bold text-green-700 dark:text-green-400'>
            {unlocked.length}
          </p>
          <p className='text-muted-foreground text-[10px]'>Unlocked</p>
        </div>
        <div className='rounded-xl bg-gradient-to-br from-violet-100 to-purple-50 p-3 text-center dark:from-violet-900/30 dark:to-purple-900/20'>
          <p className='text-2xl font-bold text-violet-700 dark:text-violet-400'>
            {earnedBadges.length}
          </p>
          <p className='text-muted-foreground text-[10px]'>Badges</p>
        </div>
        <div className='rounded-xl bg-gradient-to-br from-amber-100 to-yellow-50 p-3 text-center dark:from-amber-900/30 dark:to-yellow-900/20'>
          <p className='text-2xl font-bold text-amber-700 dark:text-amber-400'>
            {totalXp}
          </p>
          <p className='text-muted-foreground text-[10px]'>XP Earned</p>
        </div>
      </div>

      {/* Badges Section */}
      <section>
        <h2 className='mb-3 font-semibold'>Badges</h2>
        <div className='grid grid-cols-3 gap-2.5 sm:grid-cols-4'>
          {earnedBadges.map((b) => (
            <div
              key={b.id}
              className='flex flex-col items-center gap-1.5 rounded-xl border border-violet-200 bg-gradient-to-b from-violet-50 to-white p-3 dark:border-violet-800 dark:from-violet-950/30 dark:to-transparent'
            >
              <span className='text-3xl'>{b.emoji}</span>
              <span className='text-center text-[11px] leading-tight font-semibold'>
                {b.title}
              </span>
              <span className='text-muted-foreground text-center text-[9px] leading-tight'>
                {b.description}
              </span>
              <Badge
                variant='secondary'
                className='mt-0.5 px-1.5 text-[9px] capitalize'
              >
                {b.category}
              </Badge>
            </div>
          ))}
          {unearnedBadges.map((b) => (
            <div
              key={b.id}
              className='flex flex-col items-center gap-1.5 rounded-xl border p-3 opacity-50'
            >
              <span className='text-3xl grayscale'>{b.emoji}</span>
              <span className='text-center text-[11px] leading-tight font-semibold'>
                {b.title}
              </span>
              <span className='text-muted-foreground text-center text-[9px] leading-tight'>
                {b.description}
              </span>
              <Badge
                variant='outline'
                className='mt-0.5 px-1.5 text-[9px] capitalize'
              >
                {b.category}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Unlocked Achievements */}
      <section>
        <h2 className='mb-3 flex items-center gap-2 font-semibold'>
          <IconCheck className='size-4 text-green-500' />
          Unlocked
        </h2>
        <div className='space-y-2.5'>
          {unlocked.map((a) => (
            <div
              key={a.id}
              className='flex items-center gap-3 rounded-xl border border-green-200 bg-green-50/50 p-3.5 dark:border-green-900/40 dark:bg-green-950/20'
            >
              <span className='text-2xl'>
                {achievementEmoji[a.icon] || '🏅'}
              </span>
              <div className='flex-1'>
                <p className='font-semibold'>{a.title}</p>
                <p className='text-muted-foreground text-xs'>{a.description}</p>
              </div>
              <Badge className='bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'>
                +{a.xpReward}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* In Progress */}
      <section>
        <h2 className='mb-3 flex items-center gap-2 font-semibold'>
          <IconLock className='text-muted-foreground size-4' />
          In Progress
        </h2>
        <div className='space-y-2.5'>
          {locked.map((a) => {
            const pct = (a.progress / a.maxProgress) * 100;
            return (
              <div
                key={a.id}
                className={cn('rounded-xl border p-3.5 opacity-90')}
              >
                <div className='flex items-center gap-3'>
                  <span className='text-2xl grayscale'>
                    {achievementEmoji[a.icon] || '🏅'}
                  </span>
                  <div className='flex-1'>
                    <p className='font-semibold'>{a.title}</p>
                    <p className='text-muted-foreground text-xs'>
                      {a.description}
                    </p>
                  </div>
                  <span className='text-muted-foreground text-xs font-medium'>
                    +{a.xpReward}
                  </span>
                </div>
                <div className='mt-3 space-y-1'>
                  <div className='flex justify-between text-xs'>
                    <span className='text-muted-foreground'>
                      {a.progress}/{a.maxProgress}
                    </span>
                    <span className='font-medium'>{Math.round(pct)}%</span>
                  </div>
                  <Progress value={pct} className='h-2' />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
