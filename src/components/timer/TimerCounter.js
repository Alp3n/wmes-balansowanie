import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'grommet';
import styled from 'styled-components';

// TODO requestAnimationFrame => setInterval slows down on save battery mode
// useInterval custom hook for displaying stopwatch digits
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

const TimerCounter = ({ isRunning, isFinished, handleStopWatch }) => {
  const millSecDelay = 100;
  const [millSecCount, setMillSecCount] = useState(0);
  const [secCount, setSecCount] = useState(0);

  // useInterval custom hook for displaying stopwatch digits
  console.log('Sec: ', secCount, 'MilSec: ', millSecCount);
  useInterval(
    () => {
      setMillSecCount(millSecCount + 1);
      if (millSecCount >= 9) {
        setMillSecCount(0);
        setSecCount(secCount + 1);
      }
    },
    isRunning ? millSecDelay : null
  );

  // Listening to isFinished and setting state seconds and millseconds count in TimerCounter
  useEffect(() => {
    if (isFinished === false) {
      setSecCount(0);
      setMillSecCount(0);
    }
  }, [isFinished]);

  // Listening to isFinished and setting state for station stopWatch in Timer
  useEffect(() => {
    if (isFinished) {
      handleStopWatch(secCount, millSecCount);
    }
  }, [handleStopWatch, isFinished, millSecCount, secCount]);

  return (
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
        background={isFinished ? 'signifyGreen' : 'dark-5'}
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
  );
};

export default TimerCounter;

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
