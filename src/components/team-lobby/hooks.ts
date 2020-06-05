import { RefObject, useEffect, useRef, useState } from 'react';

export function useElementSize(elRef: RefObject<HTMLElement>): [number, number] {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  const observer = useRef(
    new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element ot be watched
      const { width, height } = entries[0].contentRect;
      setSize([width, height]);
    }),
  );

  useEffect(() => {
    const element = elRef.current;
    const resize = observer.current;

    if (element) {
      resize.observe(element);
    }

    return () => {
      resize && element && resize.unobserve(element);
    };
  }, [observer, elRef]);

  return size;
}
