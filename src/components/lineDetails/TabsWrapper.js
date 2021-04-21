import React, { useState, useContext } from 'react';
import { Tabs, Tab } from 'grommet';
import Measurment from './measurment/Measurment';
import LineResults from './results/LineResults';

import { LineContext } from '../../contexts/lineContext';

// Function for setting default dates
import { setDays } from '../../functions/functions';
// import NewOrderChart from './dataChart/NewOrderChart';
import OrderChart from './dataChart/OrderChart';

//TODO play with charts
const TabsWrapper = () => {
  const { lineData } = useContext(LineContext);

  const [firstDate, setFirstDate] = useState(setDays(30, 'sub'));
  const [secondDate, setSecondDate] = useState(setDays(1, 'add'));

  const handleFd = (newDate) => {
    setFirstDate(newDate);
  };

  const handleSd = (newDate) => {
    setSecondDate(newDate);
  };

  return (
    <>
      {lineData.orderId && (
        <Tabs>
          {/* Component showing stations card for time measurment */}
          <Tab title='Pomiary'>
            <Measurment firstDate={firstDate} secondDate={secondDate} />
          </Tab>

          {/* Component showing history results */}
          <Tab title='Rezultaty'>
            <LineResults
              firstDate={firstDate}
              secondDate={secondDate}
              handleFd={handleFd}
              handleSd={handleSd}
            />
          </Tab>

          {/* Component showing chart with the order results for each station */}
          <Tab title='Balansowanie'>
            {<OrderChart firstDate={firstDate} secondDate={secondDate} />}
            {/* <NewOrderChart firstDate={firstDate} secondDate={secondDate} /> */}
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default TabsWrapper;
