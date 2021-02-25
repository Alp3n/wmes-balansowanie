import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import { URL_PRODSHIFTORDER, HEADERS } from '../utils/consts';
import Balancing from '../components/lineDetails/Balancing';

const balancingModel = {
  line: 'line',
  order: 'order',
  station: 'station',
  comment: 'comment',
  startedAt: Date.now(),
  finishedAt: Date.now(),
};

const LineDetails = () => {
  const [list, setList] = useState([]);
  const [order, setOrder] = useState();

  const { id } = useParams();
  const { state } = useLocation();

  // console.log(state);
  // console.log(`${URL_PRODSHIFTORDER}/${state.prodShiftOrder}`);
  const getOrder = async () => {
    const response = await fetch(
      `${URL_PRODSHIFTORDER}/${state.prodShiftOrder}`,
      {
        headers: HEADERS,
      }
    );
    const data = await response.json();
    setOrder(data);
  };

  useEffect(() => {
    if (state.prodShiftOrder !== undefined) {
      getOrder();
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    let tempList = [];
    for (let i = 1; i < 7; i++) {
      let newItem = {
        name: `ST-${i}`,
        station: i,
        time: '00:00',
        status: 'waiting',
      };
      tempList.push(newItem);
    }
    setList((list) => [...list, ...tempList]);
  }, []);

  const addToList = () => {
    const newItem = {
      name: `ST-${list.length + 1}`,
      station: list.length + 1,
      time: '00:00',
      status: 'waiting',
    };
    setList((list) => [...list, newItem]);
  };

  const removeFromList = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <Layout pageName={id}>
      <ActiveOrder orderNumber={order ? order.orderId : 'Brak zamówienia'} />
      <Balancing
        list={list}
        removeFromList={removeFromList}
        addToList={addToList}
        // id={order.orderId}
      />
    </Layout>
  );
};

export default LineDetails;
