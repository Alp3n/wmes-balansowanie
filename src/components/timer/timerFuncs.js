export const getTime = (startedAt, finishedAt, type) => {
  const result = (Date.parse(finishedAt) - Date.parse(startedAt)) / 1000;
  const show = result.toString().split('.');
  if (type === 'seconds') {
    return show[0];
  } else if (type === 'milseconds') {
    return show[1].slice(0, 1);
  }
};

export const handleStart = (setIsRunning, setStartedAt) => {
  setIsRunning(true);
  setStartedAt(new Date().toISOString());
};

export const handleStop = (setFinishedAt, setIsRunning, setIsFinished) => {
  setFinishedAt(new Date().toISOString());
  setIsRunning(false);
  setIsFinished(true);
};

export const handleFinished = (setIsFinished) => {
  setIsFinished(false);
};
