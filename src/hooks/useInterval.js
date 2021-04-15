import { useEffect, useRef } from 'react';

// useInterval custom hook for displaying stopwatch digits
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let id;
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
