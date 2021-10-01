import React, { createContext, useState } from 'react';

import { HEADERS, URL_PCES } from '../utils/consts';

export const CameraContext = createContext();

const VIDEO_TYPE = 'video/mp4';

export const marker = {
  id: null,
  time: null,
  comment: null,
};

const defaultState = {
  orderId: null,
  stationId: null,
  file: {
    date: null,
    folder: null,
    hash: null,
    name: null,
    nc15: null,
    type: VIDEO_TYPE,
    upload: null,
  },
  markers: [],
};

const CameraContextProvider = (props) => {
  // Default state of the context
  const [cameraData, setCameraData] = useState(defaultState);

  // clean camera state

  const cleanCamera = () => {
    setCameraData(defaultState);
  };

  // Add comment to comments array
  const addMarker = (currentTime) => {
    let markerTime = (new Date().getTime() - currentTime.getTime()) / 1000;
    let newMarker = {
      id: cameraData.markers.length + 1,
      time: markerTime,
      comment: '',
    };
    setCameraData((prev) => ({
      ...prev,
      file: {
        ...prev.file,
      },
      markers: [...prev.markers, newMarker],
    }));
  };

  // POST file
  const handlePost = async (stationId, editData, file) => {
    // WMES API payload request format
    const payloadRequest = {
      action: 'addFiles',
      params: {
        files: [{ file }],
      },
    };

    await fetch(URL_PCES, {
      method: 'POST',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(file),
    })
      .then((response) => response.json())
      .then((data) => {
        let responseData = {
          ...editData,
          isTimeSub: true,
          responseId: data._id,
        };
      });
  };

  return (
    <CameraContext.Provider
      value={{ cameraData, cleanCamera, addMarker, handlePost }}
    >
      {props.children}
    </CameraContext.Provider>
  );
};

export default CameraContextProvider;
