import React from 'react';
import { Box, Text } from 'grommet';

const round = (value, point) => {
  let mult = Math.pow(10, point || 0);
  return Math.round(value * mult) / mult;
};

const Detail = ({ label, value, color }) => {
  return (
    <Box
      direction='row'
      pad='small'
      justify='between'
      width='medium'
      background={color}
    >
      <Text weight='bold' margin={{ left: 'xsmall' }}>
        {label}:
      </Text>
      <Text margin={{ right: 'xsmall' }}>{round(value, 1).toFixed(1)}s</Text>
    </Box>
  );
};

const StationResults = ({ data }) => {
  return (
    <Box alignSelf='center'>
      <Detail label={'Minimum'} value={data?.min} color='lightblue' />
      <Detail label={'Maksimum'} value={data?.max} color='light-4' />
      <Detail label={'Średnia'} value={data?.avg} color='lightgreen' />
      <Detail label={'Mediana'} value={data?.med} color='orange' />
      <Detail label={'Mediana'} value={data?.med} color='mediumpurple' />
    </Box>
  );
};

export default StationResults;
