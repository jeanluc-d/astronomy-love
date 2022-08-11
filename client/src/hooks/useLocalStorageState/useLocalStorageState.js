import { useState, useEffect } from 'react';

function useLocalStorageState(key, defaultValue) {
  /* use callback to avoid reading from localStorage every time 
   * avoid performance issues
  */
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
