'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import {
  IconSwords,
  IconHome,
  IconTrophy,
  IconMedal,
  IconGift
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/challenges', label: 'Challenges', icon: IconSwords },
  { href: '/leaderboard', label: 'Leaderboard', icon: IconTrophy },
  { href: '/achievements', label: 'Achievements', icon: IconMedal },
  { href: '/rewards', label: 'Rewards', icon: IconGift }
];

export default function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className='bg-background/80 sticky top-0 z-50 hidden border-b backdrop-blur-xl md:block'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-4'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex items-center gap-2 font-bold'>
            <div className='flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500'>
              <IconSwords className='size-5 text-white' />
            </div>
            <span className='bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-lg text-transparent dark:from-violet-400 dark:to-fuchsia-400'>
              CodeWar
            </span>
          </Link>
          <nav className='flex items-center gap-1'>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className='flex items-center gap-3'>
          {user ? (
            <Link href='/profile'>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Avatar className='size-8'>
                  <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          ) : (
            <Link href='/login'>
              <Button
                size='sm'
                className='rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
