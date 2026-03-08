'use client';

import { cn } from '@/lib/utils';
import {
  IconHome,
  IconSwords,
  IconTrophy,
  IconMedal,
  IconUser
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/challenges', label: 'Battle', icon: IconSwords },
  { href: '/leaderboard', label: 'Ranks', icon: IconTrophy },
  { href: '/achievements', label: 'Badges', icon: IconMedal },
  { href: '/profile', label: 'Me', icon: IconUser }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className='bg-background/80 fixed bottom-0 left-0 z-50 w-full border-t backdrop-blur-xl md:hidden'>
      <div className='flex items-center justify-around py-2'>
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground'
              )}
            >
              <link.icon
                className={cn('size-5', isActive && 'text-primary')}
                stroke={isActive ? 2.5 : 1.5}
              />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
