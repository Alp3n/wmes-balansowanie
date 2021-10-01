import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import { CameraContext } from '../../../contexts/cameraContext';
import VideoControlBox from './VideoControlBox';

const MyVideoPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { cameraData, addMarker } = useContext(CameraContext);
  const vidRef = useRef(null);

  const handlePlay = () => {
    vidRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    vidRef.current.pause();
    setIsPlaying(false);
  };

  const handleFullscreen = () => {
    if (vidRef.current) {
      vidRef.current.requestFullscreen();
    }
  };

  // handling events for video element
  useEffect(() => {
    vidRef.current.currentTime = currentTime;
    // vidRef.current.play();

    vidRef.current.addEventListener('started', handlePlay);
    vidRef.current.addEventListener('ended', handlePause);

    return () => {
      // vidRef.current.removeEventListener('started', handleStarted);
      // vidRef.current.removeEventListener('ended', handleEnded);
    };
  }, [currentTime]);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrentTime(vidRef?.current?.currentTime);
  //   }, 1);
  // }, [currentTime]);
  console.log('RECORDED', cameraData);
  return (
    <>
      <Box background='white'>
        <Text margin='small' size='large' weight='bold'>
          Przejrzyj nagranie
        </Text>
      </Box>
      <StyledVideo
        ref={vidRef}
        src={src}
        playsInline
        webkit-playsInline
        muted
        controls
        // controls
      />
      <VideoControlBox
        status={isPlaying}
        handlePause={handlePause}
        handlePlay={handlePlay}
        handleFullscreen={handleFullscreen}
        // markers={markers}
      />
    </>
  );
};

export default MyVideoPlayer;

const StyledVideo = styled.video`
  background-color: gray;
  aspect-ratio: 16/9;
  width: 100%;
  z-index: 1;
`;
