import React, { useState } from 'react';
import { Box, Select } from 'grommet';
import PositionCard from './PositionCard';

const PositionList = ({ options }) => {
  const [value, setValue] = useState();
  return (
    <Box margin='medium'>
      {
        value.positions.map((position) => (
          <PositionCard key={position.name} position={position.name} />
        ))}
    </Box>
  );
};

export default PositionList;
