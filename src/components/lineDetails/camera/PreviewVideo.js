import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const PreviewVideo = ({ mediaStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  if (!mediaStream) {
    console.log('No media stream');
    return (
      <StyledWrapper>
        <p>Brak pozwolenia na użycie kamery i mikrofonu.</p>
        <p>Zmień pozwolenie w ustawieniach przeglądarki.</p>
      </StyledWrapper>
    );
  }

  return <StyledVideo ref={videoRef} autoPlay playsInline webkit-playsInline />;
};

export default PreviewVideo;

const StyledVideo = styled.video`
  position: relative;
  height: 100vh;
  z-index: 1;
  padding: 0 !important;
  margin: 0 !important;
`;

const StyledWrapper = styled.div`
  position: relative;
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
