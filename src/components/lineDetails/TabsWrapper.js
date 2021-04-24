import React, { useState, useContext } from 'react';
import { Tabs, Tab } from 'grommet';
import Measurment from './measurment/Measurment';
import LineResults from './results/LineResults';

import { LineContext } from '../../contexts/lineContext';

// Function for setting default dates
import { setDays } from '../../functions/functions';
// import NewOrderChart from './dataChart/NewOrderChart';
import styled from 'styled-components';
import OrderChart from './dataChart/OrderChart';
import ReactChart from './dataChart/ReactChart';

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
        <StyledTabs>
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
          <Tab title='Wykres'>
            <ReactChart firstDate={firstDate} secondDate={secondDate} />
          </Tab>
        </StyledTabs>
      )}
    </>
  );
};

export default TabsWrapper;

const StyledTabs = styled(Tabs)`
  position: relative;
  bottom: 0;
`;
