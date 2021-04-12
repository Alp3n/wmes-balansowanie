import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '../components/loading/Loading';
import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';
import Balancing from '../components/lineDetails/Balancing';

import strings from '../utils/strings.json';
import { URL_PRODSHIFTORDER } from '../utils/consts';

import { LineContext } from '../contexts/lineContext';
import { useFetch, STATUS_TYPES } from '../hooks/useFetch';

const { LINE_DETAILS_noOrder } = strings.lineDetailsPage;

const LineDetails = () => {
  const [newOrder, setNewOrder] = useState('same');
  const { state } = useLocation();
  const { lineData, setupStations } = useContext(LineContext);

  const { _id, prodShiftOrder } = state;

  const fetchURL = `${URL_PRODSHIFTORDER}/${prodShiftOrder}`;

  const { status, data } = useFetch(fetchURL);

  const handleRefresh = () => {
    setupStations(data.prodLine, data.orderId);
    setNewOrder('same');
  };

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
          // setNewOrder(true);
          alert('Nowe zlecenie na linii');
        } else {
          console.log('NOTHING CHANGED');
        }
        break;
      case STATUS_TYPES.error:
        if (!data.orderId) {
          setNewOrder('error');
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

  // TODO add charts in Tabs (Tab-> Balncing, Tab-> Charts)

  const switchRender = (status) => {
    switch (status) {
      case STATUS_TYPES.fetching:
        return <Loading />;

      case STATUS_TYPES.fetched:
        return (
          <>
            <ActiveOrder
              orderNumber={lineData.orderId}
              handleRefresh={handleRefresh}
              newOrder={newOrder}
            />

            <Balancing />
          </>
        );

      case STATUS_TYPES.error:
        return (
          <ActiveOrder newOrder={newOrder} orderNumber={LINE_DETAILS_noOrder} />
        );

      default:
        return;
    }
  };

  return <Layout pageName={_id}>{switchRender(status)}</Layout>;
};

export default LineDetails;
