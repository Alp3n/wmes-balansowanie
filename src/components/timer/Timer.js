import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { PlayFill, StopFill, Like, Refresh } from 'grommet-icons';
import TimerButton from './TimerButton';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
    // setIsFinished(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsFinished(true);
  };

  const handleFinished = () => {
    setIsFinished(false);
  };

  return (
    <Box
      background='white'
      justify='center'
      align='center'
      border={{ side: 'horizontal', color: 'light-4' }}
    >
      <StyledBoxWrapper
        // elevation='small'
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
          // background={isFinished ? 'signifyGreen' : 'dark-4'}
        ></StyledBoxBorder>
        <StyledBoxContent
          width='90%'
          height='90%'
          round='50%'
          background={isFinished ? 'status-ok' : 'light-3'}
          // background={isFinished ? 'status-ok' : 'dark-4'}
          justify='center'
          align='center'
        >
          <Text
            size='4rem'
            color='dark-1'
            className={isRunning ? 'running' : null}
          >
            00:00
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
`;
