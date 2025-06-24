import InputAutoComplete from '@/components/input/InputAutoComplete';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type InputAutoCompleteContainerProps = {
  placeholder?: string;
};

export default function InputAutoCompleteContainer({
  placeholder,
}: InputAutoCompleteContainerProps) {
  return (
    <ErrorBoundary fallback={<>something error happen</>}>
      <Suspense fallback={<div>Loading...</div>}>
        <InputAutoComplete placeholder={placeholder} />
      </Suspense>
    </ErrorBoundary>
  );
}
