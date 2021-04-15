import React, { useState, useContext } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { LineContext } from '../../../contexts/lineContext';

import { Box } from 'grommet';
import ResultsTable from './ResultsTable';

import { URL_BALANCING } from '../../../utils/consts';

import DateFilter from './DateFilter';
import Loading from '../../Loading';

// Function for setting default dates
// import { setDays } from '../../../functions/functions';

const Balancing = ({firstDate, secondDate, handleFd, handleSd}) => {
  // const [firstDate, setFirstDate] = useState(setDays(30, 'sub'));
  // const [secondDate, setSecondDate] = useState(setDays(1, 'add'));

  const { lineData } = useContext(LineContext);
  const orderId = lineData.orderId;

  const params = `?sort(-startedAt)&limit(100)&startedAt=ge=${Date.parse(
    firstDate
  )}&startedAt=lt=${Date.parse(secondDate)}&order._id=string:${orderId}`;

  const FETCH_URL = URL_BALANCING + params;

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
