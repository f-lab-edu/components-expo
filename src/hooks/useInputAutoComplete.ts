import { useDebounce } from '@/hooks/useDebounceInput';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

const fetchPlaceList = async (query: string) => {
  const _formatted = encodeURIComponent(query);
  const res = await fetch(`/api/places?query=${_formatted}`);
  if (!res.ok) throw new Error('Error on fetching places');
  return res.json();
};

const delay = 800;

export function useInputAutoComplete() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const isComposingRef = useRef<boolean>(false);

  const { data } = useQuery({
    queryKey: ['places', debouncedValue],
    queryFn: () => fetchPlaceList(debouncedValue),
    enabled: debouncedValue.length > 0,
  });

  const handleChange = (value: string) => {
    setInputValue(value);
    if (!isComposingRef.current) {
      handleChangeInput(value);
    }
  };

  const handleChangeInput = useDebounce((value: string) => {
    if (!isComposingRef.current) {
      // trigger API Call
      setDebouncedValue(value);
    }
  }, delay);

  const onCompositionStart = () => {
    isComposingRef.current = true;
  };

  const onCompositionEnd: React.CompositionEventHandler = (e) => {
    isComposingRef.current = false;

    const value = (e.target as HTMLInputElement).value;
    handleChangeInput(value);
  };

  return { data, inputValue, handleChange, onCompositionStart, onCompositionEnd };
}
