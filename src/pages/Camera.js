import React, { useState, useRef, useEffect } from 'react';
import {
  useReactMediaRecorder,
  ReactMediaRecorder,
} from 'react-media-recorder';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { useUserMedia } from '../hooks/useUserMedia';
import { Previous } from 'grommet-icons';
import PreviewVideo from '../components/lineDetails/camera/PreviewVideo';
import RecordButton from '../components/lineDetails/camera/RecordButton';

const MEDIA_TRACK_CONSTRAINTS = {
  video: {
    facingMode: { exact: 'environment' },
    frameRate: { min: 24, max: 30 },
    width: { min: 1280, max: 1920 },
    height: { min: 720, max: 1080 },
  },
};

const Camera = () => {
  // const videoRef = useRef();
  // const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder(MEDIA_TRACK_CONSTRAINTS);

  const history = useHistory();
  const { state } = useLocation();

  // if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
  //   videoRef.current.srcObject = mediaStream;
  // }

  // useEffect(() => {
  //   videoRef.current.onloadedmetadata = () => {
  //     videoRef.current.play();
  //   };
  // }, []);

  return (
    <CameraWrapper>
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

      {status === 'stopped' ? (
        <StyledVideo
          src={mediaBlobUrl}
          controls
          playsInline
          webkit-playsInline
        />
      ) : (
        <PreviewVideo mediaStream={previewStream} />
      )}

      <ControlBox
        fill='horizontal'
        direction='row'
        justify='center'
        pad='medium'
      >
        {status === 'idle' ? (
          <RecordButton
            onClick={startRecording}
            color='white'
            status={status}
          />
        ) : status === 'recording' ? (
          <RecordButton onClick={stopRecording} color='red' status={status} />
        ) : null}
      </ControlBox>
    </CameraWrapper>
  );
};

export default Camera;

const CameraWrapper = styled(Box)`
  position: relative;
`;

const ControlBox = styled(Box)`
  position: absolute;
  bottom: 3%;
  z-index: 2;
`;

const NavigationHeader = styled(Box)`
  position: absolute;
  top: 0;
  z-index: 999;
`;

const StyledVideo = styled.video`
  position: relative;
  height: 100vh;
  z-index: 1;
  padding: 0 !important;
  margin: 0 !important;
`;
