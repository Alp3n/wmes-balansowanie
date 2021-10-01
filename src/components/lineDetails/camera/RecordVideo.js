import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, Grid, Text } from 'grommet';
import { ClearOption, Pin, Refresh } from 'grommet-icons';

import { lightTheme } from '../../../myTheme';
import { CameraContext } from '../../../contexts/cameraContext';
import RecordButton from './RecordButton';

const RecordVideo = ({
  previewStream,
  startRecording,
  stopRecording,
  status,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isAdded, setIsAdded] = useState('no');
  const { cameraData, addMarker, cleanCamera } = useContext(CameraContext);
  const videoRef = useRef(null);

  const handleStart = () => {
    setCurrentTime(new Date());
    startRecording();
  };
  const handleStop = () => {
    stopRecording();
  };

  const handleAddMarker = () => {
    setIsAdded('yes');
    addMarker(currentTime);
  };

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  useEffect(() => {
    if (isAdded === 'yes') {
      setTimeout(() => {
        setIsAdded('no');
      }, 500);
    }
  }, [isAdded]);

  if (!previewStream) {
    console.log('No media stream');
    return (
      <StyledWrapper>
        <p>Brak pozwolenia na użycie kamery i mikrofonu.</p>
        <p>Zmień pozwolenie w ustawieniach przeglądarki.</p>
      </StyledWrapper>
    );
  }

  console.log(cameraData);

  return (
    <>
      <Box background={status === 'recording' ? 'red' : 'white'}>
        <Text
          margin='small'
          size='large'
          color={status === 'recording' ? 'white' : null}
          weight={status === 'recording' ? 'bold' : 'normal'}
        >
          {status === 'recording' ? 'Nagrywanie' : 'Nagrywaj'}
        </Text>
      </Box>

      <StyledVideo
        ref={videoRef}
        autoPlay
        playsInline
        webkit-playsInline
        controlsList={'download'}
      />
      <Box width='100%' height='100%'>
        <Box border={{ side: 'bottom', color: 'border' }} direction='row'>
          <Text size='large' margin='small'>
            Dodane znaczniki
          </Text>
          <Counter size='large' margin='small' isAdded={isAdded} weight='bold'>
            {cameraData.markers.length}
          </Counter>
        </Box>
      </Box>

      <RecordControlBox pad='large' background='signifyDark'>
        <Grid
          rows={['xxsmall']}
          columns={['1/3', '1/3', '1/3']}
          areas={[
            { name: 'clean', start: [0, 0], end: [1, 0] },
            { name: 'rec', start: [1, 0], end: [2, 0] },
            { name: 'pin', start: [2, 0], end: [3, 0] },
          ]}
          align='center'
          justify='center'
        >
          <Button icon={<Refresh />} onClick={cleanCamera} />
          {status === 'recording' ? (
            <RecordButton onClick={handleStop} color='red' />
          ) : (
            <RecordButton onClick={handleStart} color='white' />
          )}

          <Box
            width='52px'
            height='52px'
            round='100%'
            background={status === 'recording' ? 'signifyGreen' : 'light-4'}
            focusIndicator={false}
            align='center'
            justify='center'
            onClick={status === 'recording' ? handleAddMarker : null}
            gridArea='pin'
          >
            <Pin color='white' />
          </Box>
        </Grid>
      </RecordControlBox>
    </>
  );
};

export default RecordVideo;

const StyledVideo = styled.video`
  width: 100%;
  z-index: 1;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${lightTheme.global.colors['light-4']};
`;

const RecordControlBox = styled(Box)`
  position: fixed;
  position: -webkit-fixed;
  overflow: hidden;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 2;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  z-index: 1;

  p {
    padding: 3%;
  }
`;

const Counter = styled(Text)`
  animation: ${(props) =>
    props.isAdded === 'yes' ? 'fade 0.5s linear 0s' : null};

  @keyframes fade {
    from {
      color: ${lightTheme.global.colors.signifyGreen};
      transform: scale(1.5);
    }
    to {
      color: none;
      transform: scale(1);
    }
  }
`;
