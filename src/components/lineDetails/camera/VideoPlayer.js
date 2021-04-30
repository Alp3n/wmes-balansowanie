import React from 'react';
import { Box, Button, Text } from 'grommet';
import { Expand, Play, Stop } from 'grommet-icons';
import styled from 'styled-components';

const VideoPlayer = ({ status, src }) => {
  return (
    <StyledWrapper>
      {/* Video */}
      <StyledVideo src={src} playsInline autoPlay webkit-playsInline />

      {/* Control box */}
      <Box
        fill='horizontal'
        direction='row'
        gap='xsmall'
        height='xxsmall'
        align='center'
        background='signifyDark'
      >
        <Button
          icon={
            status === 'isPlaying' ? (
              <Stop size='small' />
            ) : (
              <Play size='small' />
            )
          }
        />
        <Text size='small'>00:00</Text>
        <Text size='small'>/</Text>
        <Text size='small'>00:10</Text>
        <StyledDuration fill='horizontal' background='white'></StyledDuration>
        <Button icon={<Expand size='small' />} />
      </Box>
    </StyledWrapper>
  );
};

export default VideoPlayer;

const StyledWrapper = styled(Box)`
  position: relative;
  top: 48px;
`;

const StyledVideo = styled.video`
  background-color: gray;
  aspect-ratio: 16/9;

  height: 50vh;
  z-index: 1;
`;

const StyledDuration = styled(Box)`
  z-index: 10;
`;
