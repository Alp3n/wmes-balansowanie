import React, { createContext, useState } from 'react';

export const LineContext = createContext();

const LineContextProvider = (props) => {
  const [lineData, setLineData] = useState({
    lineId: '',
    orderId: '',
    stations: [],
  });

  const changeLineId = (id) => {
    setLineData((prevState) => ({ ...prevState, lineId: id }));
  };

  const changeOrderId = (id) => {
    setLineData((prevState) => ({ ...prevState, orderId: id }));
  };

  const addToStations = () => {
    const newStation = {
      station: `${lineData.stations.length + 1}`,
      startedAt: null,
      finishedAt: null,
      comment: null,
      isFinished: false,
    };

    setLineData((prevState) => ({
      ...prevState,
      stations: [...prevState.stations, newStation],
    }));
  };

  const removeFromStations = (id) => {
    setLineData((prevState) => ({
      ...prevState,
      stations: prevState.stations.filter((station) => station.station !== id),
    }));
  };

  const clearStations = () => {
    setLineData((prevState) => ({
      ...prevState,
      stations: [],
    }));
  };

  const editStation = (id, item) => {
    setLineData((prevState) => ({
      ...prevState,
      stations: [
        ...prevState.stations.filter((station) => station.station !== id),
        item,
      ],
    }));
  };

  const setupStations = (lineId, orderId) => {
    let tempArray = [];
    for (let i = 1; i < 7; i++) {
      let newItem = {
        station: `${i}`,
        startedAt: null,
        finishedAt: null,
        comment: null,
        isFinished: false,
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
      }}
    >
      {props.children}
    </LineContext.Provider>
  );
};

export default LineContextProvider;
