import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '../components/Loading';
import Layout from '../components/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';
import Measurment from '../components/lineDetails/Measurment';

import strings from '../utils/strings.json';
import { URL_PRODSHIFTORDER } from '../utils/consts';

import { LineContext } from '../contexts/lineContext';
import { useFetch, STATUS_TYPES, ORDER_TYPES } from '../hooks/useFetch';
import { Tabs, Tab } from 'grommet';
import Balancing from '../components/balancing/Balancing';

const { LINE_DETAILS_noOrder } = strings.lineDetailsPage;

const LineDetails = () => {
  const [newOrder, setNewOrder] = useState(ORDER_TYPES.same);
  const { state } = useLocation();
  const { lineData, setupStations } = useContext(LineContext);

  const { _id, prodShiftOrder } = state;

  const fetchURL = `${URL_PRODSHIFTORDER}/${prodShiftOrder}`;

  // status and data from fetch response
  const { status, data } = useFetch(fetchURL);

  const handleRefresh = () => {
    setupStations(data.prodLine, data.orderId);
    setNewOrder(ORDER_TYPES.same);
  };

  console.log(lineData);
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
          setNewOrder(ORDER_TYPES.new);
        } else {
          console.log('NOTHING CHANGED');
        }
        break;
      case STATUS_TYPES.error:
        if (!data.orderId) {
          setNewOrder(ORDER_TYPES.error);
          console.log('NO ORDER');
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
              newOrder={newOrder}
              handleRefresh={handleRefresh}
            />

            <Tabs>
              <Tab title='Pomiary'>
                <Measurment />
              </Tab>
              <Tab title='Balansowanie'>
                <Balancing />
              </Tab>
            </Tabs>
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
