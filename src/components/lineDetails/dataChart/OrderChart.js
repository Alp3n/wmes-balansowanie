import React, { useContext } from 'react';
// import data from './data.json';
import { Box, DataChart, Text } from 'grommet';

// import strings from '../../../utils/strings.json';
import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';
import { useFetch } from '../../../hooks/useFetch';

import { LineContext } from '../../../contexts/lineContext';
import Loading from '../../Loading';

// const {
//   LINE_DETAILS_addStation,
//   LINE_DETAILS_maxStations,
// } = strings.lineDetailsPage;

const labelFormatter = (value) => {
  return <Text>{value.toFixed(1)}s</Text>;
};

const OrderChart = ({ firstDate, secondDate }) => {
  const { lineData } = useContext(LineContext);
  const { orderId } = lineData;
  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);

  const { status, data } = useFetch(URL_FETCH);

  return (
    <Box overflow='hidden' background='white'>
      {status === 'fetched' ? (
        data.stations[0].avg !== null ? (
          <DataChart
            // style={{ width: '860px' }}
            bounds='align'
            size={{ width: '375px', height: 'medium' }}
            data={data?.stations}
            series={[
              {
                label: 'Minimum',
                property: 'min',
                render: (value) => {
                  return labelFormatter(value);
                },
              },
              {
                label: 'Maximum',
                property: 'max',
                render: (value) => {
                  return labelFormatter(value);
                },
              },
              {
                label: 'Średnia',
                property: 'avg',
                render: (value) => {
                  return labelFormatter(value);
                },
              },
              {
                label: 'Mediana',
                property: 'med',
                render: (value) => {
                  return labelFormatter(value);
                },
              },
              {
                label: 'Takt Time',
                property: 'stt',
                render: (value) => {
                  return labelFormatter(value);
                },
              },
            ]}
            chart={[
              {
                property: 'max',
                color: 'chart-gray',
                type: 'bar',
                thickness: 'medium',
              },
              {
                property: 'avg',
                color: 'chart-green',
                type: 'bar',
                thickness: 'medium',
              },
              {
                property: 'med',
                color: 'chart-orange',
                type: 'bar',
                thickness: 'medium',
              },

              {
                property: 'min',
                color: 'chart-blue',
                type: 'bar',
                thickness: 'medium',
              },
              {
                property: 'stt',
                type: 'line',
                thickness: 'xsmall',
                opacity: 'strong',
                color: 'chart-purple',
              },
              {
                property: 'stt',
                type: 'point',
                thickness: 'small',
                color: 'chart-purple',
              },
            ]}
            axis={{
              x: { granularity: 'fine' },
              // y: { granularity: 'fine' },
            }}
            guide={{ y: { granularity: 'fine' } }}
            legend
            detail
            alignSelf='stretch'
          />
        ) : (
          <Text alignSelf='center' margin='medium' weight='bold' size='large'>
            Brak danych
          </Text>
        )
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default OrderChart;
