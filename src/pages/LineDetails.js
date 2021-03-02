import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import { URL_PRODSHIFTORDER, HEADERS } from '../utils/consts';
import Balancing from '../components/lineDetails/Balancing';

import { LineContext } from '../contexts/lineContext';

const LineDetails = () => {
  // const [list, setList] = useState([]);
  const [order, setOrder] = useState();

  const { lineId } = useParams();
  const { state } = useLocation();
  const {
    lineData,
    addToStations,
    removeFromStations,
    changeLineId,
    clearStations,
  } = useContext(LineContext);

  useEffect(() => {
    if (state.prodShiftOrder !== undefined) {
      fetch(`${URL_PRODSHIFTORDER}/${state.prodShiftOrder}`, {
        headers: HEADERS,
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          setOrder(data);
        });
    } else {
      return null;
    }
    changeLineId(lineId);
  }, [state.prodShiftOrder]);

  useEffect(() => {
    if (lineData.lineId !== lineId) {
      clearStations();
      let tempList = [];
      for (let i = 1; i < 7; i++) {
        let newItem = {
          name: `ST-${i}`,
          station: i,
          time: '00:00',
          comment: null,
        };
        tempList.push(newItem);
        addToStations(newItem);
      }
    }

    // setList((list) => [...list, ...tempList]);
  }, []);

  const addToList = () => {
    // const newItem = {
    //   name: `ST-${list.length + 1}`,
    //   station: list.length + 1,
    //   time: '00:00',
    //   status: 'waiting',
    // };
    // setList((list) => [...list, newItem]);
    const newItem = {
      name: `ST-${lineData.stations.length + 1}`,
      station: lineData.stations.length + 1,
      time: '00:00',
      status: 'waiting',
    };
    addToStations(newItem);
  };

  const removeFromList = (index) => {
    removeFromStations(index);
  };

  console.log('Line Context:', lineData);
  return (
    <Layout pageName={lineId}>
      <ActiveOrder orderNumber={order ? order.orderId : 'Brak zamówienia'} />
      <Balancing
        list={lineData.stations}
        removeFromList={removeFromList}
        addToList={addToList}
        lineId={lineId}
        order={order}
      />
    </Layout>
  );
};

export default LineDetails;
