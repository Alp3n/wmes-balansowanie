import React, { useState, useEffect /* useContext */ } from 'react';
import { Box, Button } from 'grommet';
import { PlayFill, StopFill, Refresh } from 'grommet-icons';
import TimerButton from './TimerButton';
import TimerCounter from './TimerCounter';
// import { LineContext } from '../../contexts/lineContext';

const Timer = ({
  setStation,
  setTimeSub,
  handlePost,
  handleDelete,
  isTimeSub,
  startDate,
  finishDate,
  finished,
}) => {
  // const { lineData } = useContext(LineContext);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(finished);
  // const [isFinished, setIsFinished] = useState(false);
  const [startedAt, setStartedAt] = useState(startDate);
  const [finishedAt, setFinishedAt] = useState(finishDate);
  const [seconds, setSeconds] = useState();
  const [milSeconds, setMilSeconds] = useState();

  const handleStopWatch = (s, ms) => {
    setSeconds(s);
    setMilSeconds(ms);
  };

  const handleStart = () => {
    setIsRunning(true);
    setStartedAt(new Date().toISOString());
  };

  const handleStop = async () => {
    setFinishedAt(new Date().toISOString());
    setIsRunning(false);
    setIsFinished(true);
  };

  const handleFinished = async () => {
    setIsFinished(false);
    setTimeSub(false);
  };

  /* useEffect(() => {
    setStation((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
      isFinished: isFinished,
    }));
  }, [finishedAt, setStation, isFinished, startedAt]); */
  useEffect(() => {
    setStation((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
      isTimeSub: true,
      isFinished: isFinished,
      stopWatch: {
        ...prevState.stopWatch,
        seconds: seconds,
        milSeconds: milSeconds,
      },
    }));
  }, [
    finishedAt,
    setStation,
    isFinished,
    startedAt,
    isTimeSub,
    seconds,
    milSeconds,
  ]);

  return (
    <>
      <Box
        background='white'
        justify='center'
        align='center'
        border={{ side: 'horizontal', color: 'light-4' }}
        pad={{ vertical: 'large' }}
      >
        {/* Timer component responsible for displaying circles and counter */}
        <TimerCounter
          isFinished={isFinished}
          isRunning={isRunning}
          handleStopWatch={handleStopWatch}
        />
        {isFinished ? (
          <TimerButton
            background='dark-3'
            icon={<Refresh size='large' color='white' />}
            onClick={handleFinished}
            isRunning={isRunning}
          />
        ) : isRunning ? (
          <TimerButton
            background='status-error'
            icon={<StopFill size='large' color='white' />}
            onClick={handleStop}
            isRunning={isRunning}
            isFinished={isFinished}
          />
        ) : (
          <TimerButton
            background='status-ok'
            icon={<PlayFill size='large' color='white' />}
            onClick={handleStart}
            isRunning={isRunning}
          />
        )}
      </Box>
      {isTimeSub
        ? null
        : isFinished && (
            <Button
              label='Zatwierdź czas'
              primary
              color='signifyGreen'
              margin='small'
              size='large'
              onClick={() => handlePost()}
            />
          )}
    </>
  );
};

export default Timer;
