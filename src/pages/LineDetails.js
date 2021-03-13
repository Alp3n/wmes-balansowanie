import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';

import { URL_PRODSHIFTORDER, HEADERS } from '../utils/consts';
import Balancing from '../components/lineDetails/Balancing';

import { LineContext } from '../contexts/lineContext';

const LineDetails = () => {
  const { lineId } = useParams();
  const { state } = useLocation();
  const {
    lineData,
    addToStations,
    clearStations,
    changeLineId,
    changeOrderId,
  } = useContext(LineContext);

  useEffect(() => {
    if (state.prodShiftOrder !== null) {
      fetch(`${URL_PRODSHIFTORDER}/${state.prodShiftOrder}`, {
        headers: HEADERS,
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          changeOrderId(data.orderId);
        });
    } else if (state.prodShiftOrder === null) {
      changeOrderId(null);
    }
    changeLineId(lineId);
  }, [state.prodShiftOrder]);

  useEffect(() => {
    if (lineData.lineId !== lineId) {
      clearStations();
      for (let i = 1; i < 7; i++) {
        let newItem = {
          station: `${i}`,
          startedAt: null,
          finishedAt: null,
          comment: null,
          isFinished: false,
        };
        addToStations(newItem);
      }
    }
  }, []);

  console.log(lineData);
  return (
    <Layout pageName={lineData.lineId}>
      <ActiveOrder
        orderNumber={
          lineData.orderId ? lineData.orderId : 'Brak aktywnego zlecenia'
        }
      />
      {lineData.orderId && <Balancing list={lineData.stations} />}
    </Layout>
  );
};

export default LineDetails;
