import {
  useEffect, useState, useMemo,
} from 'react';

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  /*  IntersectionObserver is a browser API that allows us to know if an element is in the viewport.
    * The constructor takes a function that gets called with an array of entries
    * the entries are the elements that are being observed
    * we only care about the first element in the array, so we destructure it
    * we use the isIntersecting property to know if the element is in the viewport
    * each entry describes how much of a given element is intersecting with the root element (the document).
    * Every time the element enters the viewport or exists the viewport,
    * the function we passed to the IntersectionObserver() constructor gets called and we update the state.
    */
  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)),
    [],
  );

  useEffect(() => {
    // need to call observe() on the observer to watch it
    observer.observe(ref.current);
    // clean up function
    return () => {
      // we use the disconnect method to stop observing the element
      observer.disconnect();
    };
  }, [ref, observer]);

  // true if the element is in the viewport, false otherwise
  return isIntersecting;
};

export default useIsInViewport;
