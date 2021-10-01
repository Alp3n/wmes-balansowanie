import React, { useState, useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { Expand, Pause, Play } from 'grommet-icons';
import styled from 'styled-components';

import { CameraContext } from '../../../contexts/cameraContext';
import ProgressBar from './ProgressBar';

const VideoControlBox = ({
  status,
  markers,
  handlePlay,
  handlePause,
  handleFullscreen,
  // currentTime,
  // duration,
}) => {
  const [value, setValue] = useState(0);
  const { cameraData } = useContext(CameraContext);

  const goToValue = (newValue) => {
    setValue(newValue);
  };
  const updateProgress = (current, duration) => {
    return (current / duration) * 100;
  };

  return (
    <>
      <Box
        direction='row'
        align='center'
        justify='between'
        background='signifyDark'
      >
        {/* Play/Stop button */}
        {status ? (
          <Button icon={<Pause />} onClick={() => handlePause()} />
        ) : (
          <Button icon={<Play />} onClick={() => handlePlay()} />
        )}
        {/* Duration */}
        <Text size='xsmall' margin={{ horizontal: 'small' }}>
          {/*   {currentTime[0] .padStart(2, '0')}:
          {currentTime[1] .slice(0, 2).padStart(2, '0')} */}
          {value}
        </Text>
        {/* Progress bar */}
        <ProgressBar
          onClick={goToValue}
          value={0}
          markers={cameraData.markers}
        />
        {/* Duration */}
        <Text size='xsmall' margin={{ horizontal: 'small' }}>
          {/* {duration[0] .padStart(2, '0')}:
          {duration[1] .slice(0, 2).padStart(2, '0')} */}
          {value}
        </Text>
        {/* TODO Expand Button later */}
        <Button icon={<Expand />} onClick={() => handleFullscreen()} />
      </Box>
    </>
  );
};

export default VideoControlBox;
