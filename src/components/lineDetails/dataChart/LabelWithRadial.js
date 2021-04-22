import React from 'react';
import { Box, Text } from 'grommet';

const LabelWithRadial = ({ color, label }) => {
  return (
    <Box direction='row' align='center' margin={{ left: 'small' }}>
      <Box height='12px' width='12px' background={color} round />
      <Text size='xsmall' margin={{ left: '4px' }}>
        {label}
      </Text>
    </Box>
  );
};

export default LabelWithRadial;
