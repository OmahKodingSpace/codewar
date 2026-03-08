import BottomNav from '@/components/frontend/bottom-nav';
import TopNav from '@/components/frontend/top-nav';

export default function FrontendLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
      <TopNav />
      <main className='mx-auto max-w-5xl px-4 pt-4 pb-24 md:pt-6 md:pb-8'>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
