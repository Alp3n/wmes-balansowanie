import React, { useState } from 'react';
import { Box, Button, DateInput, Text } from 'grommet';
import { Filter, Down, Up } from 'grommet-icons';

import strings from '../../../utils/strings.json';

const { BALANCING_filter } = strings.balancing;

const DateFilter = ({ fd, sd, handleFd, handleSd }) => {
  const [isOpen, setOpen] = useState(false);

  const handleFilterOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      direction='column'
      justify='evenly'
      background='light-3'
      border='bottom'
    >
      <Box direction='row' align='center' pad='small'>
        <Filter />
        <Text margin='small' weight='bold'>
          {BALANCING_filter}
        </Text>
        {isOpen ? (
          <Button
            icon={<Up size='small' />}
            margin='xsmall'
            onClick={handleFilterOpen}
          />
        ) : (
          <Button
            icon={<Down size='small' />}
            margin='xsmall'
            onClick={handleFilterOpen}
          />
        )}
      </Box>

      {isOpen && (
        <Box direction='row' align='center'>
          <Box width='small' margin='small' background='white' round='small'>
            <DateInput format='dd/mm/yyyy' value={fd} onChange={handleFd} />
          </Box>
          <Box width='small' margin='small' background='white' round='small'>
            <DateInput format='dd/mm/yyyy' value={sd} onChange={handleSd} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DateFilter;
