import React from 'react';
import { Box, Chart, Text } from 'grommet';

const StationChart = ({ data }) => {
  return (
    <Box align='center'>
      <Chart
        bounds={[
          [0, 3],
          [0, 500],
        ]}
        values={[
          { value: [0, data.min], color: 'chart-blue' },
          { value: [1, data.max], color: 'chart-gray' },
          { value: [2, data.avg], color: 'chart-green' },
          { value: [3, data.med], color: 'chart-orange' },
        ]}
        size={{ width: '30px' }}
        thickness='xsmall'
        animate
        alignSelf='center'
      />
      <Text size='xsmall'>{data.no === 0 ? 'All' : `ST-${data.no}`}</Text>
    </Box>
  );
};

export default StationChart;
