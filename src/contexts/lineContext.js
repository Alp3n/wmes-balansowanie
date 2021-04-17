import React, { createContext, useState } from 'react';

import { HEADERS, URL_PCES } from '../utils/consts';

export const LineContext = createContext();

const LineContextProvider = (props) => {
  // Default state of the context
  const [lineData, setLineData] = useState({
    lineId: '',
    orderId: '',
    stations: [],
  });

  // Changes line ID
  const changeLineId = (id) => {
    setLineData((prevState) => ({ ...prevState, lineId: id }));
  };

  // Changes order ID
  const changeOrderId = (id) => {
    setLineData((prevState) => ({ ...prevState, orderId: id }));
  };

  // Adds one station to stations array
  const addToStations = () => {
    const newStation = {
      station: `${lineData.stations.length + 1}`,
      startedAt: '',
      finishedAt: '',
      isTimeSub: false,
      comment: '',
      isCommentSub: false,
      responseId: '',
    };

    setLineData((prevState) => ({
      ...prevState,
      stations: [...prevState.stations, newStation],
    }));
  };

  // Removes station from stations array
  const removeFromStations = (id) => {
    setLineData((prevState) => ({
      ...prevState,
      stations: prevState.stations.filter((station) => station.station !== id),
    }));
  };

  // Clears stations
  const clearStations = () => {
    setLineData((prevState) => ({
      ...prevState,
      stations: [],
    }));
  };

  // Returns one station by id
  const filterStation = (id) => {
    let filteredStation = lineData.stations.filter(
      (station) => station.station === id
    );
    let [station] = filteredStation;
    return station;
  };

  // Edit function for any keys
  const editStation = (id, keys) => {
    let filteredStation = filterStation(id);

    // Destructuring prev state object and new object into new edited one
    let editedStation = {
      ...filteredStation,
      ...keys,
    };

    setLineData((prevState) => ({
      ...prevState,
      stations: [
        // Filtering all stations that are not the one edited
        ...prevState.stations.filter((station) => station.station !== id),
        // Inseting edited station
        editedStation,
      ],
    }));
  };

  // Clean station

  const cleanStation = (stationId) => {
    const cleanStation = {
      station: stationId,
      startedAt: '',
      finishedAt: '',
      isTimeSub: false,
      comment: '',
      isCommentSub: false,
      responseId: '',
    };
    editStation(stationId, cleanStation);
  };

  // Setup of stations for a line and order
  const setupStations = (lineId, orderId) => {
    let tempArray = [];
    // 6 sations default
    for (let i = 1; i < 7; i++) {
      let newItem = {
        station: `${i}`,
        startedAt: '',
        finishedAt: '',
        isTimeSub: false,
        comment: '',
        isCommentSub: false,
        responseId: '',
      };
      tempArray.push(newItem);
    }
    setLineData((prevState) => ({
      ...prevState,
      lineId: lineId,
      orderId: orderId,
      stations: [...tempArray],
    }));
  };

  // POST data function and edits station state
  const handlePost = async (stationId, editData, postData) => {
    await fetch(URL_PCES, {
      method: 'POST',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        let responseData = {
          ...editData,
          isTimeSub: true,
          responseId: data._id,
        };

        editStation(stationId, responseData);
      });
  };

  // PUT data function and edits station state
  const handlePut = async (stationId, responseId, putData) => {
    await fetch(`${URL_PCES}/${responseId}`, {
      method: 'PUT',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(putData),
    })
      .then((response) => response.json())
      .then((data) => {
        let responseData = {
          ...putData,
          responseId: data?._id,
          isCommentSub: true,
        };
        editStation(stationId, responseData);
      });
  };

  // PUT data function for comment
  const commentPut = async (responseId, putData) => {
    await fetch(`${URL_PCES}/${responseId}`, {
      method: 'PUT',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(putData),
    }).then((response) => response.json());
  };

  // const handleDelete = async () => {
  //   await fetch(`${URL_PCES}/${response._id}`, {
  //     method: 'DELETE',
  //     headers: HEADERS,
  //     mode: 'cors',
  //     credentials: 'include',
  //     body: JSON.stringify(response._id),
  //   }).then((response) => response.json());
  // };

  return (
    <LineContext.Provider
      value={{
        lineData,
        addToStations,
        removeFromStations,
        clearStations,
        changeLineId,
        changeOrderId,
        editStation,
        setupStations,
        handlePost,
        handlePut,
        commentPut,
        cleanStation,
        filterStation,
      }}
    >
      {props.children}
    </LineContext.Provider>
  );
};

export default LineContextProvider;
