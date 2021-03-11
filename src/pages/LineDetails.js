import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import { URL_PRODSHIFTORDER, HEADERS } from '../utils/consts';
import Balancing from '../components/lineDetails/Balancing';

import { LineContext } from '../contexts/lineContext';
import PositionCard from '../components/positionList/PositionCard';

const LineDetails = () => {
  const [orderId, setOrderId] = useState();

  const { lineId } = useParams();
  const { state } = useLocation();
  const {
    lineData,
    addToStations,
    removeFromStations,
    clearStations,
    changeLineId,
    changeOrderId,
  } = useContext(LineContext);

  useEffect(() => {
    if (state.prodShiftOrder !== undefined) {
      fetch(`${URL_PRODSHIFTORDER}/${state.prodShiftOrder}`, {
        headers: HEADERS,
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('response order: ', data);
          setOrderId(data.orderId);
        });
    }
    changeLineId(lineId);
    changeOrderId(orderId);
  }, [state.prodShiftOrder]);

  console.log(lineData);
  
  useEffect(() => {
    if (lineData.lineId !== lineId) {
      clearStations();
      let tempList = [];
      for (let i = 1; i < 7; i++) {
        let newItem = {
          station: i,
          time: '0s',
          startedAt: null,
          finishedAt: null,
          comment: null,
        };
        tempList.push(newItem);
        addToStations(newItem);
      }
    }
  }, []);

  const addToList = () => {
    const newItem = {
      station: lineData.stations.length + 1,
      time: '0s',
      startedAt: null,
      finishedAt: null,
      comment: null,
    };
    addToStations(newItem);
  };

  const removeFromList = (index) => {
    removeFromStations(index);
  };

  // console.log('Line Context:', lineData);
  console.log(state);
  return (
    <Layout pageName={lineId}>
      <ActiveOrder
        orderNumber={orderId ? orderId : 'Brak aktywnego zlecenia'}
      />
      <Balancing
        list={lineData.stations}
        removeFromList={removeFromList}
        addToList={addToList}
        lineId={lineId}
        order={orderId}
      >
        {lineData.stations.map((position, index) => (
          <PositionCard
            key={position.name}
            index={index}
            lineId={lineId}
            orderId={orderId}
            position={position}
            removeFromList={removeFromList}
          />
        ))}
      </Balancing>
    </Layout>
  );
};

export default LineDetails;
