import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '../components/Loading';
import Layout from '../components/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import { URL_PRODSHIFTORDER } from '../utils/consts';

import { LineContext } from '../contexts/lineContext';
import { useFetch, STATUS_TYPES, ORDER_TYPES } from '../hooks/useFetch';

import TabsWrapper from '../components/lineDetails/TabsWrapper';
import ErrorMsg from '../components/ErrorMsg';

const LineDetails = () => {
  const { state } = useLocation();
  const { _id, prodShiftOrder } = state;
  const [orderStatus, setOrderStatus] = useState(ORDER_TYPES.same);

  const { lineData, setupStations } = useContext(LineContext);

  const fetchURL = `${URL_PRODSHIFTORDER}/${prodShiftOrder}`;

  // status and data from fetch response
  const { status, data } = useFetch(fetchURL, prodShiftOrder);

  const handleRefresh = () => {
    setupStations(data.prodLine, data.orderId);
    setOrderStatus(ORDER_TYPES.same);
  };

  useEffect(() => {
    switch (status) {
      case STATUS_TYPES.fetched:
        if (!lineData.orderId) {
          // console.log('FIRST TIME INITIALIZING');
          setupStations(data.prodLine, data.orderId);
        } else if (
          lineData.orderId !== data.orderId &&
          lineData.lineId === data.prodLine
        ) {
          // console.log('SAME LINE, DIFFERENT ORDER ');
          setOrderStatus(ORDER_TYPES.new);
        } else if (
          lineData.orderId !== data.orderId &&
          lineData.lineId !== data.prodLine
        ) {
          // console.log('DIFFERENT LINE, DIFFERENT ORDER');
          setupStations(data.prodLine, data.orderId);
        }
        break;

      case STATUS_TYPES.empty:
        if (!lineData.lineId && !lineData.orderId) {
          // console.log('TOTALY EMPTY CASE');
          setOrderStatus(ORDER_TYPES.empty);
          setupStations(_id, prodShiftOrder);
        } else if (!lineData.lineId && lineData.orderId) {
          // console.log('THE SAME LINE BUT WITH ORDER ID');
          setOrderStatus(ORDER_TYPES.empty);
        } else if (lineData.lineId !== _id) {
          // console.log('DIFFERENT LINE');
          setupStations(_id, prodShiftOrder);
          setOrderStatus(ORDER_TYPES.empty);
        }
        break;

      case STATUS_TYPES.error:
        if (!data.orderId) {
          // console.log('NO ORDER');
          setOrderStatus(ORDER_TYPES.error);
        }
        break;
      default:
        break;
    }
  }, [
    _id,
    data.orderId,
    data.prodLine,
    lineData.lineId,
    lineData.orderId,
    setupStations,
    prodShiftOrder,
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
              orderStatus={orderStatus}
              handleRefresh={handleRefresh}
            />
            <TabsWrapper />
          </>
        );

      case STATUS_TYPES.empty:
        return (
          <>
            <ActiveOrder
              orderStatus={orderStatus}
              handleRefresh={handleRefresh}
            />
            <TabsWrapper />
          </>
        );

      case STATUS_TYPES.error:
        return (
          <>
            <ErrorMsg text='Wystąpił problem' />
          </>
        );

      default:
        return;
    }
  };

  return <Layout pageName={_id}>{switchRender(status)}</Layout>;
};

export default LineDetails;
