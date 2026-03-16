'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { IconSwords } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignupPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await register(username, password);
    if (result.error) {
      toast.error(result.error);
    }
    setLoading(false);
  }

  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center'>
      <div className='w-full max-w-sm space-y-6'>
        {/* Logo */}
        <div className='flex flex-col items-center gap-2'>
          <div className='flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25'>
            <IconSwords className='size-7 text-white' />
          </div>
          <h1 className='bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-2xl font-bold text-transparent dark:from-violet-400 dark:to-fuchsia-400'>
            Join CodeWar
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create your warrior account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              placeholder='codehero'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              className='h-11 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='Create a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
              className='h-11 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirm-password'>Confirm Password</Label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
              className='h-11 rounded-xl'
            />
          </div>
          <Button
            type='submit'
            disabled={loading}
            className='h-11 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600'
          >
            {loading ? 'Creating account...' : 'Start Your Journey'}
          </Button>
        </form>

        <p className='text-muted-foreground text-center text-sm'>
          Already a warrior?{' '}
          <Link
            href='/login'
            className='font-semibold text-violet-500 hover:text-violet-600'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
