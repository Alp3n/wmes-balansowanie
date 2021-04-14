import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { Box } from 'grommet';
import ResultsTable from './ResultsTable';

import { URL_BALANCING } from '../../../utils/consts';

import DateFilter from './DateFilter';
import Loading from '../../Loading';

// Fake data for tests
// import data from './data.json';

// Function for setting default dates
import { setDays } from '../../../functions/functions';

const Balancing = ({ orderId }) => {
  const [firstDate, setFirstDate] = useState(setDays(30, 'sub'));
  const [secondDate, setSecondDate] = useState(setDays(1, 'add'));

  const params = `?sort(-startedAt)&limit(100)&startedAt=ge=${Date.parse(
    firstDate
  )}&startedAt=lt=${Date.parse(secondDate)}&order._id=string:${orderId}`;
  const FETCH_URL = URL_BALANCING + params;

  const handleFd = (newDate) => {
    setFirstDate(newDate);
  };

  const handleSd = (newDate) => {
    setSecondDate(newDate);
  };

  // TODO 403 Forbiden cookies i guess
  const { status, data } = useFetch(FETCH_URL);
  //TODO add chart
  return (
    <Box>
      <DateFilter
        fd={firstDate}
        sd={secondDate}
        handleFd={handleFd}
        handleSd={handleSd}
      />
      {status === 'fetched' ? (
        <ResultsTable data={data.collection} />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Balancing;
