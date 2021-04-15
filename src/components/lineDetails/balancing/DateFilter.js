import React, { useState } from 'react';
import { Box, Button, DateInput, Text } from 'grommet';
import { Filter, Down, Up } from 'grommet-icons';

import strings from '../../../utils/strings.json';

const { BALANCING_filter, BALANCING_start, BALANCING_end } = strings.balancing;

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
          <Box pad='small'>
            <Text margin={{ bottom: 'xsmall' }}>{BALANCING_start}</Text>
            <Box width='small'>
              <DateInput
                format='dd/mm/yyyy'
                value={fd}
                onChange={(event) => handleFd(event.value)}
              />
            </Box>
          </Box>
          <Box pad='small'>
            <Text margin={{ bottom: 'xsmall' }}>{BALANCING_end}</Text>
            <Box width='small'>
              <DateInput
                format='dd/mm/yyyy'
                value={sd}
                onChange={(event) => handleSd(event.value)}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DateFilter;
