import {
  useEffect, useState, useMemo,
} from 'react';

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // intersectionObserver is a browser API that allows us to know if an element is in the viewport
  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);
    // clean up function
    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};

export default useIsInViewport;
