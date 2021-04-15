import React, { useState } from 'react';
import { Tabs, Tab } from 'grommet';
import Measurment from './Measurment';
import Balancing from './balancing/Balancing';

// Function for setting default dates
import { setDays } from '../../functions/functions';

const TabsWrapper = () => {
  const [firstDate, setFirstDate] = useState(setDays(30, 'sub'));
  const [secondDate, setSecondDate] = useState(setDays(1, 'add'));

  const handleFd = (newDate) => {
    setFirstDate(newDate);
  };

  const handleSd = (newDate) => {
    setSecondDate(newDate);
  };

  return (
    <Tabs>
      {/* Component showing stations card for time measurment */}
      <Tab title='Pomiary'>
        <Measurment />
      </Tab>

      {/* <Tab title='Pomiary'>
        <MeasurmentBeta />
      </Tab> */}

      {/* Component showing history results */}
      <Tab title='Balansowanie'>
        <Balancing
          firstDate={firstDate}
          secondDate={secondDate}
          handleFd={handleFd}
          handleSd={handleSd}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsWrapper;
