import React, { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import useInterval from '../../hooks/useInterval';
// import { useStopwatch } from 'react-use-precision-timer';
// import { getTimeV2 } from './timerFuncs';

//TODO use Date.now()

const TimerCounter = ({ isRunning, isFinished, seconds, milseconds }) => {
  const delay = 100;
  const [currentDate, setCurrentDate] = useState();
  const [duration, setDuration] = useState(0.0);
  // const [millSecCount, setMillSecCount] = useState(isFinished ? milseconds : 0);
  // const [secCount, setSecCount] = useState(isFinished ? seconds : 0);

  // useInterval custom hook for displaying stopwatch digits
  useInterval(
    () => {
      let diff = currentDate - new Date();
      setDuration(-(diff / 1000));

      // setMillSecCount(millSecCount + 1);
      // if (millSecCount >= 9) {
      //   setMillSecCount(0);
      //   setSecCount(secCount + 1);
      // }
    },
    isRunning ? delay : null
  );

  // Listening to isFinished and setting state seconds and millseconds count in TimerCounter
  useEffect(() => {
    if (isRunning) {
      setCurrentDate(new Date());
    }
    if (isFinished === false) {
      // setSecCount(0);
      // setMillSecCount(0);
      setDuration(0.0);
    }
  }, [isFinished, isRunning]);

  const showTimer = () => {
    // show = duration < 10 && duration.toFixed(1);
    if (duration < 10) {
      return `0${duration.toFixed(1).toString()}`;
    } else {
      return `${duration.toFixed(1)}`;
    }
  };

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
          color={isFinished ? 'white' : 'dark-1'}
          className={isRunning ? 'running' : null}
          direction='row'
        >
          {isFinished & (seconds + milseconds > 1)
            ? `${seconds.toString().padStart(2, '0')}.${milseconds}`
            : showTimer()}
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
