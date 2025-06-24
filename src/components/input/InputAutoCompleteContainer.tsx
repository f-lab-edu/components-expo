import InputAutoComplete from '@/components/input/InputAutoComplete';
import { Suspense } from 'react';
import * as Sentry from '@sentry/react';

type InputAutoCompleteContainerProps = {
  placeholder?: string;
};

export default function InputAutoCompleteContainer({
  placeholder,
}: InputAutoCompleteContainerProps) {
  return (
    <Sentry.ErrorBoundary fallback={<>something error happen</>}>
      <Suspense fallback={<div>Loading...</div>}>
        <InputAutoComplete placeholder={placeholder} />
      </Suspense>
    </Sentry.ErrorBoundary>
  );
}
