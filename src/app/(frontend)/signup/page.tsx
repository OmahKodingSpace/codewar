'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IconBrandGithub, IconSwords } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/');
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
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>First name</Label>
              <Input
                id='firstName'
                placeholder='Alex'
                className='h-11 rounded-xl'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Last name</Label>
              <Input
                id='lastName'
                placeholder='Johnson'
                className='h-11 rounded-xl'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              placeholder='codehero'
              className='h-11 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='warrior@codewar.dev'
              className='h-11 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' className='h-11 rounded-xl' />
          </div>
          <Button
            type='submit'
            className='h-11 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600'
          >
            Start Your Journey
          </Button>
        </form>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className={cn('bg-background text-muted-foreground px-2')}>
              or
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          className='h-11 w-full rounded-xl'
          onClick={() => router.push('/')}
        >
          <IconBrandGithub className='mr-2 size-5' />
          Continue with GitHub
        </Button>

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
