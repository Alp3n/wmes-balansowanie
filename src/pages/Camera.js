import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

import RecordVideo from '../components/lineDetails/camera/RecordVideo';
import VideoPlayer from '../components/lineDetails/camera/VideoPlayer';

const MEDIA_TRACK_CONSTRAINTS = {
  video: {
    facingMode: { exact: 'environment' },
    frameRate: { min: 30, ideal: 60, max: 60 },
    height: { ideal: 1920 },
    width: { ideal: 1080 },
    aspectRatio: 9 / 16,
  },
};

const Camera = () => {
  const {
    status,
    startRecording,
    stopRecording,
    previewStream,
    mediaBlobUrl,
  } = useReactMediaRecorder(MEDIA_TRACK_CONSTRAINTS);
  const { state } = useLocation();

  /* 
  1.acquiring_media
  2.idle
  3.recording
  4.stopped
  */

  const switchRender = (status) => {
    switch (status) {
      case 'acquiring_media':
        return <Loading />;
      case 'idle':
      case 'recording':
        return (
          <RecordVideo
            previewStream={previewStream}
            startRecording={startRecording}
            stopRecording={stopRecording}
            status={status}
          />
        );
      case 'stopped':
        return <VideoPlayer src={mediaBlobUrl} />;
      default:
        break;
    }
  };

  return (
    <Layout pageName={`ST-${state.station}`} transparent>
      {switchRender(status)}
    </Layout>
  );
};

export default Camera;
