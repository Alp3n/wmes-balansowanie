import React, { useContext } from 'react';
import { Box, Stack } from 'grommet';

import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';
import { useFetch } from '../../../hooks/useFetch';

import { LineContext } from '../../../contexts/lineContext';
import Loading from '../../Loading';
import StationChart from './StationChart';

const NewOrderChart = ({ firstDate, secondDate }) => {
  const { lineData } = useContext(LineContext);
  const { orderId } = lineData;
  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);

  const { status, data } = useFetch(URL_FETCH);

  return (
    <Box flex>
      <Stack guidingChild='last'>
        <Box background='white' direction='row' justify='evenly'>
          {status === 'fetched' ? (
            data.stations[0].avg !== null ? (
              data.stations.map((station) => (
                <StationChart key={station.no} data={station} />
              ))
            ) : (
              'Brak danych'
            )
          ) : (
            <Loading />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default NewOrderChart;
