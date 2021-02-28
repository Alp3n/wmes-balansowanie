import React, { useState, useEffect } from 'react';
import { Box, Button } from 'grommet';
import { PlayFill, StopFill, Like, Refresh } from 'grommet-icons';
import TimerButton from './TimerButton';
import TimerCounter from './TimerCounter';

const Timer = ({ setPosition, setTimeSub, handleClick, isTimeSub }) => {
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

  useEffect(() => {
    setPosition((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
    }));
  }, [startedAt, finishedAt, setPosition]);

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
        <Box direction='row' fill='horizontal' justify='evenly'>
          <TimerButton
            background='dark-3'
            icon={<Refresh size='large' color='white' />}
            onClick={handleFinished}
            isRunning={isRunning}
          />
          {/*  <TimerButton
            background='status-ok'
            icon={<Like size='large' color='white' />}
            isFinished={isFinished}
          /> */}
        </Box>
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
      {isFinished === true ? (
        <Button
          label='Zatwierdź czas'
          primary
          color='signifyGreen'
          margin='small'
          size='large'
          onClick={handleClick}
        />
      ) : isTimeSub ? null : (
        <Button
          label='Zatwierdź czas'
          primary
          color='signifyGreen'
          margin='small'
          size='large'
          onClick={handleClick}
        />
      )}
    </Box>
  );
};

export default Timer;
