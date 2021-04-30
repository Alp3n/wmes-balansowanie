import React, { useState, useRef, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Grid, Text } from 'grommet';

import { Pin, Previous } from 'grommet-icons';
import PreviewVideo from '../components/lineDetails/camera/PreviewVideo';
import RecordButton from '../components/lineDetails/camera/RecordButton';
import VideoPlayer from '../components/lineDetails/camera/VideoPlayer';

const MEDIA_TRACK_CONSTRAINTS = {
  video: {
    facingMode: { exact: 'environment' },
    frameRate: { min: 24, max: 30 },
    width: { min: 1280, ideal: 1920, max: 1920 },
    height: { min: 720, ideal: 1080, max: 1080 },
    aspectRatio: 1.77,
  },
};

const Camera = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder(MEDIA_TRACK_CONSTRAINTS);

  const history = useHistory();
  const { state } = useLocation();

  return (
    <CameraWrapper>
      <NavigationHeader
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
      >
        <Button
          icon={
            <Previous color={status === 'recording' ? 'red' : 'signifyGreen'} />
          }
          onClick={() => history.goBack()}
        />
        <Text
          color={status === 'recording' ? 'red' : 'signifyGreen'}
          weight='bold'
          size='large'
        >
          ST-{state.station}
        </Text>
        <Button plain margin='medium' disabled />
      </NavigationHeader>

      {status === 'stopped' ? (
        <VideoPlayer status='null' src={mediaBlobUrl} />
      ) : (
        <PreviewVideo mediaStream={previewStream} />
      )}

      <ControlBox
        fill='horizontal'
        rows={['xxsmall']}
        columns={['1/3', '1/3', '1/3']}
        areas={[
          { name: 'preview', start: [0, 0], end: [1, 0] },
          { name: 'rec', start: [1, 0], end: [2, 0] },
          { name: 'pin', start: [2, 0], end: [3, 0] },
        ]}
        align='center'
        justify='center'
        pad='medium'
      >
        <Button gridArea='preview' />
        {status === 'idle' ? (
          <RecordButton
            onClick={startRecording}
            color='white'
            status={status}
          />
        ) : status === 'recording' ? (
          <RecordButton onClick={stopRecording} color='red' status={status} />
        ) : status === 'stopped' ? (
          <RecordButton onClick={stopRecording} color='gray' status={status} />
        ) : null}
        <Button
          icon={<StyledPin color='signifyGreen' />}
          gridArea='pin'
          disabled={status === 'recording' ? false : true}
          onClick={() => alert(new Date())}
        />
      </ControlBox>
    </CameraWrapper>
  );
};

export default Camera;

const CameraWrapper = styled(Box)`
  height: 100vh;
`;

const ControlBox = styled(Grid)`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const StyledPin = styled(Pin)`
  fill: green;
`;

const NavigationHeader = styled(Box)`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const StyledVideo = styled.video`
  position: relative;
  height: 50vh;
  z-index: 1;
  padding: 0 !important;
  margin: 0 !important;
`;
