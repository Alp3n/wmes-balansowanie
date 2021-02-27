import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { PlayFill, StopFill, Like, Refresh } from 'grommet-icons';
import TimerButton from './TimerButton';

// Stop watch hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Timer = ({ setPosition, position }) => {
  const [millsecDelay, setMillsecDelay] = useState(100);
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
    setSecCount(0);
    setMillSecCount(0);
  };

  useEffect(() => {
    setPosition((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
    }));
  }, [startedAt, finishedAt, setPosition]);

  // useInterval custom hook for displaying stopwatch digits
  const [millSecCount, setMillSecCount] = useState(0);
  const [secCount, setSecCount] = useState(0);

  useInterval(
    () => {
      setMillSecCount(millSecCount + 1);
      if (millSecCount >= 9) {
        setMillSecCount(0);
        setSecCount(secCount + 1);
      }
    },
    isRunning ? millsecDelay : null
  );

  return (
    <Box
      background='white'
      justify='center'
      align='center'
      border={{ side: 'horizontal', color: 'light-4' }}
    >
      <StyledBoxWrapper
        round='50%'
        width='15rem'
        height='15rem'
        justify='center'
        align='center'
        margin='medium'
      >
        <StyledBoxBorder
          width='100%'
          height='100%'
          round='50%'
          className={isRunning ? 'running' : null}
          background={isFinished ? 'signifyGreen' : 'light-3'}
        ></StyledBoxBorder>
        <StyledBoxContent
          width='90%'
          height='90%'
          round='50%'
          background={isFinished ? 'status-ok' : 'light-3'}
          justify='center'
          align='center'
          direction='row'
        >
          <Text
            size='4rem'
            color='dark-1'
            className={isRunning ? 'running' : null}
            direction='row'
          >
            {secCount}
          </Text>
          <Text
            size='4rem'
            color='dark-1'
            className={isRunning ? 'running' : null}
            direction='row'
          >
            :
          </Text>
          <Text
            size='4rem'
            color='dark-1'
            className={isRunning ? 'running' : null}
            direction='row'
          >
            {millSecCount}
          </Text>
        </StyledBoxContent>
      </StyledBoxWrapper>
      {isFinished ? (
        <Box direction='row' fill='horizontal' justify='evenly'>
          <TimerButton
            background='dark-3'
            icon={<Refresh size='large' color='white' />}
            onClick={handleFinished}
            isRunning={isRunning}
          />
          <TimerButton
            background='status-ok'
            icon={<Like size='large' color='white' />}
            isFinished={isFinished}
          />
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
    </Box>
  );
};

export default Timer;

const StyledBoxWrapper = styled(Box)`
  position: relative;
  z-index: 1;
`;

const StyledBoxBorder = styled(Box)`
  position: absolute;
  z-index: 2;

  &.running {
    background-image: linear-gradient(
      45deg,
      rgba(0, 230, 150, 1) 0%,
      rgba(30, 200, 210, 1) 100%
    );
    -webkit-animation: myAnimation 1s linear infinite;
    -moz-animation: myAnimation 1s linear infinite;
    animation: myAnimation 1s linear infinite;
  }

  @-moz-keyframes myAnimation {
    50% {
      -moz-transform: rotate(360deg) scale(1.05);
    }
    100% {
      -moz-transform: rotate(360deg) scale(1);
    }
  }
  @-webkit-keyframes myAnimation {
    50% {
      -moz-transform: rotate(360deg) scale(1.05);
    }
    100% {
      -moz-transform: rotate(360deg) scale(1);
    }
  }
  @keyframes myAnimation {
    50% {
      -webkit-transform: rotate(360deg) scale(1.05);
      transform: rotate(360deg) scale(1.05);
    }
    100% {
      -webkit-transform: rotate(360deg) scale(1);
      transform: rotate(360deg) scale(1);
    }
  }
`;

const StyledBoxContent = styled(Box)`
  position: absolute;
  z-index: 3;
  font-family: monospace;
`;
