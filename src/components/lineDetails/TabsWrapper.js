import React, { useState } from 'react';
import { Tabs, Tab } from 'grommet';
import Measurment from './measurment/Measurment';
import LineResults from './results/LineResults';

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

      <Tab title='Balansowanie'>{/* <MeasurmentBeta /> */}</Tab>
    </Tabs>
  );
};

export default TabsWrapper;
