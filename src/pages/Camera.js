import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { useUserMedia } from '../hooks/useUserMedia';
import { Previous } from 'grommet-icons';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: { exact: 'environment' },
    width: { min: 1280, max: 1920 },
    height: { min: 720, max: 1080 },
  },
};

const Camera = () => {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  const history = useHistory();
  const { state } = useLocation();
  console.log(state);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  useEffect(() => {
    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
    };
  }, []);

  return (
    <CameraWrapper>
      {/* Header */}
      <NavigationHeader
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
      >
        <Button
          icon={<Previous color='signifyGreen' />}
          onClick={() => history.goBack()}
        />
        <Text color='brand' weight='bold' size='large'>
          ST-{state.station}
        </Text>
        <Button plain margin='medium' disabled />
      </NavigationHeader>

      {/* Camera view */}
      <CameraCanvas
        ref={videoRef}
        autoPlay
        muted
        webkit-playsinline
        playsInline
      ></CameraCanvas>

      {/* Control bar */}
      <ControlBox
        fill='horizontal'
        direction='row'
        justify='between'
        // pad='medium'
      >
        <StyledButton size='medium' label='Komentarz' />
        <Button
          size='medium'
          label='Nagrywaj'
          primary
          // margin={{ horizontal: 'small' }}
        />
      </ControlBox>
    </CameraWrapper>
  );
};

export default Camera;

const CameraWrapper = styled(Box)`
  position: relative;
`;

const CameraCanvas = styled.video`
  position: relative;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  border: 3px red solid;
  padding: none;
  margin: none;
`;

const ControlBox = styled(Box)`
  position: absolute;
  bottom: 0;
  z-index: 999;
`;

const NavigationHeader = styled(Box)`
  position: absolute;
  top: 0;
  z-index: 999;
`;

const StyledButton = styled(Button)`
  background-color: white;
  border: none;
`;
