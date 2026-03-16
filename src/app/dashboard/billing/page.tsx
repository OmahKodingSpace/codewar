import PageContainer from '@/components/layout/page-container';

export default function BillingPage() {
  return (
    <PageContainer
      pageTitle='Billing & Plans'
      pageDescription='Billing feature coming soon'
    >
      <div className='flex min-h-[400px] items-center justify-center'>
        <p className='text-muted-foreground'>
          Billing feature is not yet available.
        </p>
      </div>
    </PageContainer>
  );
}
