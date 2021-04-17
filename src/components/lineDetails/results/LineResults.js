import React, { useContext } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { LineContext } from '../../../contexts/lineContext';

import { Box } from 'grommet';
import ResultsTable from './ResultsTable';

import { PARAMS_BALANCING, URL_PCES } from '../../../utils/consts';

import DateFilter from './DateFilter';
import Loading from '../../Loading';

const LineResults = ({ firstDate, secondDate, handleFd, handleSd }) => {
  const { lineData } = useContext(LineContext);
  const orderId = lineData.orderId;

  const FETCH_URL = URL_PCES + PARAMS_BALANCING(firstDate, secondDate, orderId);

  const { status, data } = useFetch(FETCH_URL);

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

export default LineResults;
