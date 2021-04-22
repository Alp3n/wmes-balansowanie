import React from 'react';
import { Box, Text } from 'grommet';

const round = (value, point) => {
  let mult = Math.pow(10, point || 0);
  return Math.round(value * mult) / mult;
};

const noData = 'Brak danych';

const Detail = ({ label, value, color }) => {
  return (
    <Box
      direction='row'
      pad='small'
      justify='between'
      width='medium'
      background={color}
    >
      <Box direction='row'>
        <Text weight='bold' margin={{ left: 'xsmall' }}>
          {label}:
        </Text>
      </Box>
      <Text margin={{ right: 'xsmall' }}>
        {value === undefined ? noData : `${round(value, 1).toFixed(1)}s`}
      </Text>
    </Box>
  );
};

const StationResults = ({ data, noColor }) => {
  return (
    <Box alignSelf='center'>
      <Detail
        label={'Minimum'}
        value={data?.min}
        color={noColor ? null : 'chart-blue'}
      />
      <Detail
        label={'Maksimum'}
        value={data?.max}
        color={noColor ? null : 'chart-gray'}
      />
      <Detail
        label={'Średnia'}
        value={data?.avg}
        color={noColor ? null : 'chart-green'}
      />
      <Detail
        label={'Mediana'}
        value={data?.med}
        color={noColor ? null : 'chart-orange'}
      />
      <Detail
        label={'Takt Time (SAP)'}
        value={data?.stt}
        color={noColor ? null : 'chart-purple'}
      />
    </Box>
  );
};

export default StationResults;
