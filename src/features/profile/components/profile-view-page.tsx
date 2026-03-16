'use client';

import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfileViewPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className='flex w-full flex-col items-center gap-6 p-8'>
      <Avatar className='h-24 w-24'>
        <AvatarFallback className='text-2xl'>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>{user.username}</h2>
      </div>
    </div>
  );
}
