import React, { useState, useEffect } from 'react';
import { Box, Button } from 'grommet';
import { PlayFill, StopFill, Refresh } from 'grommet-icons';
import TimerButton from './TimerButton';
import TimerCounter from './TimerCounter';

const Timer = ({ setStation, setTimeSub, handlePost, isTimeSub }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startedAt, setStartedAt] = useState();
  const [finishedAt, setFinishedAt] = useState();

  const handleStart = () => {
    setIsRunning(true);
    setStartedAt(new Date().toISOString());
  };

  const handleStop = () => {
    setFinishedAt(new Date().toISOString());
    setIsRunning(false);
    setIsFinished(true);
  };

  const handleFinished = () => {
    setIsFinished(false);
    setTimeSub(false);
  };

  // const difference =
  //   (Date.parse(station.finishedAt) - Date.parse(station.startedAt)) / 1000;

  // const time = difference.toString().split('.');

  useEffect(() => {
    setStation((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
      isFinished: isFinished,
    }));
  }, [startedAt, finishedAt, setStation, isFinished]);

  return (
    <Box
      background='white'
      justify='center'
      align='center'
      border={{ side: 'horizontal', color: 'light-4' }}
      pad={{ vertical: 'large' }}
    >
      {/* Timer component responsible for displaying circles and counter */}
      <TimerCounter isFinished={isFinished} isRunning={isRunning} />
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
    </Box>
  );
};

export default Timer;
