import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { rewardsData, currentUser } from '@/constants/mock-codewar';
import { cn } from '@/lib/utils';
import { IconCheck, IconCoin } from '@tabler/icons-react';

const rewardEmoji: Record<string, string> = {
  badge: '🎖️',
  palette: '🎨',
  lightbulb: '💡',
  rocket: '🚀',
  frame: '🖼️',
  shield: '🛡️',
  spotlight: '✨',
  review: '📝'
};

export default function RewardsPage() {
  const categories = Array.from(new Set(rewardsData.map((r) => r.category)));
  const totalClaimed = rewardsData.filter((r) => r.claimed).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Rewards Shop</h1>
        <p className='text-muted-foreground text-sm'>
          Spend your hard-earned XP
        </p>
      </div>

      {/* Balance Card */}
      <div className='rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-5 text-white shadow-lg shadow-amber-500/20 dark:from-amber-600 dark:via-yellow-600 dark:to-orange-600'>
        <p className='text-sm font-medium text-white/80'>Your Balance</p>
        <div className='mt-1 flex items-center gap-2'>
          <IconCoin className='size-7' />
          <span className='text-3xl font-bold'>
            {currentUser.xp.toLocaleString()}
          </span>
          <span className='text-sm text-white/80'>XP</span>
        </div>
        <p className='mt-2 text-xs text-white/70'>
          {totalClaimed} of {rewardsData.length} rewards claimed
        </p>
      </div>

      {/* Rewards by Category */}
      {categories.map((category) => (
        <section key={category}>
          <h2 className='mb-3 font-semibold'>{category}</h2>
          <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
            {rewardsData
              .filter((r) => r.category === category)
              .map((reward) => {
                const canAfford = currentUser.xp >= reward.cost;
                return (
                  <div
                    key={reward.id}
                    className={cn(
                      'rounded-xl border p-4 transition-colors',
                      reward.claimed &&
                        'border-green-300 bg-green-50/50 dark:border-green-900/40 dark:bg-green-950/20'
                    )}
                  >
                    <div className='flex items-start gap-3'>
                      <span className='text-2xl'>
                        {rewardEmoji[reward.icon] || '🎁'}
                      </span>
                      <div className='flex-1'>
                        <p className='font-semibold'>{reward.title}</p>
                        <p className='text-muted-foreground mt-0.5 text-xs'>
                          {reward.description}
                        </p>
                      </div>
                    </div>
                    <div className='mt-3 flex items-center justify-between'>
                      <div className='flex items-center gap-1 text-sm font-semibold'>
                        <IconCoin className='size-4 text-amber-500' />
                        {reward.cost.toLocaleString()}
                      </div>
                      {reward.claimed ? (
                        <Badge className='bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'>
                          <IconCheck className='mr-1 size-3' />
                          Claimed
                        </Badge>
                      ) : (
                        <Button
                          size='sm'
                          disabled={!canAfford}
                          className={cn(
                            'h-8 rounded-lg text-xs font-semibold',
                            canAfford
                              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600'
                              : ''
                          )}
                        >
                          {canAfford ? 'Claim' : 'Need more XP'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
