import React from 'react';
import { Box, Text } from 'grommet';
import { Radial } from 'grommet-icons';

const labels = [
  {
    label: 'Minimum',
    color: 'lightblue',
  },
  {
    label: 'Maksimum',
    color: 'grey',
  },
  {
    label: 'Średnia',
    color: 'green',
  },
  {
    label: 'Mediana',
    color: 'orange',
  },
  {
    label: 'Takt Time',
    color: 'purple',
  },
];

const LabelWithRadial = ({ color, label }) => {
  return (
    <Box direction='row' align='center'>
      <Radial
        size='8px'
        color={color}
        style={{
          background: color,
          borderRadius: 100,
        }}
      />
      <Text size='xsmall' margin={{ left: '4px' }}>
        {label}
      </Text>
    </Box>
  );
};

export default LabelWithRadial;
