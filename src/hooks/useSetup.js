/* import React, { useEffect } from 'react';
TODO custom hook
const useSetup = (status) => {
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
          // console.log('DIFFERENT ORDER THE SAME LINE');
          setNewOrder(true);
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
};

export default useSetup;
 */
