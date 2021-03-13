import React, { createContext, useState } from 'react';

export const LineContext = createContext();

const LineContextProvider = (props) => {
  const [lineData, setLineData] = useState({
    lineId: null,
    orderId: null,
    stations: [],
  });

  const changeLineId = (id) => {
    setLineData((prevState) => ({ ...prevState, lineId: id }));
  };

  const changeOrderId = (id) => {
    setLineData((prevState) => ({ ...prevState, orderId: id }));
  };

  const addToStations = (item) => {
    setLineData((prevState) => ({
      ...prevState,
      stations: [...prevState.stations, item],
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
      }}
    >
      {props.children}
    </LineContext.Provider>
  );
};

export default LineContextProvider;
