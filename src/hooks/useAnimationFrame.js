import { useEffect, useState } from 'react';

const useAnimationFrame = (isRunning) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isRunning) {
      let timerId;

      const f = () => {
        setCount((x) => x + 1);
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);

      return () => cancelAnimationFrame(timerId);
    }
  }, [isRunning]);

  return { count };
};

export default useAnimationFrame;
