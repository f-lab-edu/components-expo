import { useEffect, useRef, useCallback } from 'react';

export function useDebounce(callback: (...args: string[]) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debounced = useCallback(
    (...args: string[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay, callback]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}

// export function useDebounceInput(value: string, delay: number) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }
