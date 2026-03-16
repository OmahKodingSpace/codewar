'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { IconLogout, IconSwords } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center'>
      <div className='w-full max-w-xs space-y-6 text-center'>
        <div className='mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30'>
          <IconLogout className='size-9 text-red-500' />
        </div>
        <div>
          <h1 className='text-xl font-bold'>Leaving so soon?</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            Your streak will miss you!
          </p>
        </div>
        <div className='space-y-3'>
          <Button
            variant='destructive'
            className='h-11 w-full rounded-xl'
            onClick={() => logout()}
          >
            Sign Out
          </Button>
          <Button
            variant='outline'
            className='h-11 w-full rounded-xl'
            onClick={() => router.back()}
          >
            Stay & Play
          </Button>
        </div>
        <div className='text-muted-foreground flex items-center justify-center gap-1.5 pt-2 text-xs'>
          <IconSwords className='size-3.5' />
          CodeWar
        </div>
      </div>
    </div>
  );
}
