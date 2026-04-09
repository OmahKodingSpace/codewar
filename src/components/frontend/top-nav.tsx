'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';
import { IconSwords, IconUser, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/rewards', label: 'Rewards' }
];

export default function TopNav() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

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
          {!isAuthPage && (loading || user) && (
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
          )}
        </div>
        <div className='flex items-center gap-3'>
          {!isAuthPage && loading ? (
            <div className='bg-accent size-8 animate-pulse rounded-full' />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Avatar className='size-8'>
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem asChild>
                  <Link
                    href='/profile'
                    className='flex cursor-pointer items-center gap-2'
                  >
                    <IconUser className='size-4 text-emerald-500' />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className='flex cursor-pointer items-center gap-2 text-red-500 focus:text-red-500'
                >
                  <IconLogout className='size-4' />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : pathname === '/signup' ? (
            <Link href='/login'>
              <Button
                size='sm'
                className='rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href='/signup'>
              <Button
                size='sm'
                className='rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
              >
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
