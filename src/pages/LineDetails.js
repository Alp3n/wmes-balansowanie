import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import strings from '../data/strings.json';
import { URL_PRODSHIFTORDER } from '../utils/consts';
import Balancing from '../components/lineDetails/Balancing';

import { LineContext } from '../contexts/lineContext';
import { useFetch, STATUS_TYPES } from '../hooks/useFetch';
import Loading from '../components/loading/Loading';

const {
  LINE_DETAILS_activeOrder,
  LINE_DETAILS_addStation,
  LINE_DETAILS_balancing,
  LINE_DETAILS_noOrder,
  LINE_DETAILS_maxStations,
} = strings.lineDetailsPage;

const LineDetails = () => {
  const [newOrder, setNewOrder] = useState(false);
  const { state } = useLocation();
  const { lineData, setupStations } = useContext(LineContext);

  const { _id, prodShiftOrder } = state;

  const fetchURL = `${URL_PRODSHIFTORDER}/${prodShiftOrder}`;

  const { status, data } = useFetch(fetchURL);

  const handleRefresh = () => {
    setupStations(data.prodLine, data.orderId);
    setNewOrder(false);
  };

  console.log(('LINEDATA', lineData));
  //TODO extract to custom useSetup hook
  useEffect(() => {
    switch (status) {
      case STATUS_TYPES.fetched:
        if (!lineData.orderId) {
          return setupStations(data.prodLine, data.orderId);
        } else if (
          lineData.orderId !== data.orderId &&
          lineData.lineId !== data.prodLine
        ) {
          console.log('DIFFERENT ORDER AND DIFFERENT LINE');
          return setupStations(data.prodLine, data.orderId);
        } else if (
          lineData.orderId !== data.orderId &&
          lineData.lineId === data.prodLine
        ) {
          console.log('DIFFERENT ORDER THE SAME LINE');
          setNewOrder('newOrder');
          alert('DIFFERENT ORDER THE SAME LINE');
        } else {
          console.log('NOTHING CHANGED');
        }
        break;
      case STATUS_TYPES.error:
        if (!data.orderId) {
          return console.log('NO ORDER');
        }
        break;
      default:
        return;
    }
  }, [
    data.lineId,
    data.orderId,
    data.prodLine,
    lineData.lineId,
    lineData.orderId,
    setupStations,
    status,
  ]);

  const switchRender = (status) => {
    switch (status) {
      case STATUS_TYPES.fetching:
        return <Loading />;

      case STATUS_TYPES.fetched:
        return (
          <>
            <ActiveOrder
              orderNumber={lineData.orderId}
              text={LINE_DETAILS_activeOrder}
              handleRefresh={handleRefresh}
              newOrder={newOrder}
            />

            <Balancing
              title={LINE_DETAILS_balancing}
              buttonText={LINE_DETAILS_addStation}
              infoText={LINE_DETAILS_maxStations}
            />
          </>
        );

      case STATUS_TYPES.error:
        return (
          <ActiveOrder
            newOrder={'error'}
            orderNumber={LINE_DETAILS_noOrder}
            text={LINE_DETAILS_activeOrder}
          />
        );

      default:
        return;
    }
  };

  return <Layout pageName={_id}>{switchRender(status)}</Layout>;
};

export default LineDetails;
