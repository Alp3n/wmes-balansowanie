import React, { useState } from 'react';
import { Box, Select } from 'grommet';
import PositionCard from './PositionCard';

const PositionList = ({ options }) => {
  const [value, setValue] = useState();
  return (
    <Box margin='medium'>
      <Select
        id='select'
        name='select'
        placeholder='Wybierz zestaw zadań'
        labelKey='name'
        valueKey={{ key: 'id', reduce: false }}
        value={value}
        options={options}
        onChange={({ value: nextValue }) => {
          setValue(nextValue);
          console.log(value);
        }}
      />

      {value != null &&
        value.positions.map((position) => (
          <PositionCard key={position.name} position={position.name} />
        ))}
    </Box>
  );
};

export default PositionList;
