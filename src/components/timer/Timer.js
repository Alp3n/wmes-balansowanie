import React, { useState, useEffect, useContext } from 'react';
import { Box, Button } from 'grommet';
import { PlayFill, StopFill, Refresh } from 'grommet-icons';

import TimerButton from './TimerButton';
import TimerCounter from './TimerCounter';

import { LineContext } from '../../contexts/lineContext';
import { getTime, handleStart, handleStop, handleFinished } from './timerFuncs';

import strings from '../../utils/strings.json';

const { TIMER_confirmTime } = strings.timer;

const TYPES = {
  seconds: 'seconds',
  milliseconds: 'milseconds',
};

const Timer = ({ stationId, isFinished, setIsFinished }) => {
  const { lineData, filterStation, handlePost } = useContext(LineContext);
  const [isRunning, setIsRunning] = useState(false);

  const [startedAt, setStartedAt] = useState();
  const [finishedAt, setFinishedAt] = useState();

  const [postData, setPostData] = useState({
    line: lineData.lineId,
    order: lineData.orderId,
    station: stationId,
  });

  const filteredStation = filterStation(stationId);
  const status = filteredStation.isTimeSub;

  const editData = {
    startedAt: postData.startedAt,
    finishedAt: postData.finishedAt,
  };

  useEffect(() => {
    setPostData((prevState) => ({
      ...prevState,
      startedAt: startedAt,
      finishedAt: finishedAt,
    }));
  }, [finishedAt, startedAt]);

  const switchRender = (status) => {
    switch (status) {
      case true:
        return (
          <TimerCounter
            isFinished={filteredStation.isTimeSub}
            seconds={getTime(
              filteredStation?.startedAt,
              filteredStation?.finishedAt,
              TYPES.seconds
            )}
            milseconds={getTime(
              filteredStation?.startedAt,
              filteredStation?.finishedAt,
              TYPES.milliseconds
            )}
          />
        );
      case false:
        return (
          <>
            <TimerCounter
              isFinished={isFinished}
              isRunning={isRunning}
              stationId={stationId}
            />
            {isFinished ? (
              <TimerButton
                background='dark-3'
                icon={<Refresh size='large' color='white' />}
                onClick={() => handleFinished(setIsFinished)}
                isRunning={isRunning}
              />
            ) : isRunning ? (
              <TimerButton
                background='status-error'
                icon={<StopFill size='large' color='white' />}
                onClick={() =>
                  handleStop(setFinishedAt, setIsRunning, setIsFinished)
                }
                isRunning={isRunning}
                isFinished={isFinished}
              />
            ) : (
              <TimerButton
                background='status-ok'
                icon={<PlayFill size='large' color='white' />}
                onClick={() => handleStart(setIsRunning, setStartedAt)}
                isRunning={isRunning}
              />
            )}
          </>
        );
      default:
        break;
    }
  };

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
        {switchRender(status)}
      </Box>
      {filteredStation?.isTimeSub
        ? null
        : isFinished && (
            <Button
              label={TIMER_confirmTime}
              primary
              color='signifyGreen'
              margin='small'
              size='large'
              onClick={() => handlePost(stationId, editData, postData)}
            />
          )}
    </>
  );
};

export default Timer;
