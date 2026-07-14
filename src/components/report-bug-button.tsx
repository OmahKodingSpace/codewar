'use client';

import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { Bug } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Floating "Report a bug" button that opens Sentry's User Feedback widget.
 * Attaches to the configured `feedbackIntegration` (autoInject: false) on mount.
 */
export function ReportBugButton() {
  const [feedback, setFeedback] = useState<ReturnType<
    typeof Sentry.getFeedback
  > | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Read getFeedback on the client only, to avoid hydration errors during SSR.
  useEffect(() => {
    setFeedback(Sentry.getFeedback() ?? null);
  }, []);

  useEffect(() => {
    if (feedback && buttonRef.current) {
      return feedback.attachTo(buttonRef.current);
    }
  }, [feedback]);

  // Feedback disabled (Sentry off / integration missing) — render nothing.
  if (!feedback) return null;

  return (
    <Button
      ref={buttonRef}
      type='button'
      variant='outline'
      size='sm'
      className='fixed right-4 bottom-4 z-50 shadow-md'
    >
      <Bug />
      Report a bug
    </Button>
  );
}
