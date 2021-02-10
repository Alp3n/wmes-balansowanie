import React from 'react';

import { Box, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';

const ActiveOrder = ({ orderNumber }) => {
  return (
    <Box
      background='white'
      pad='small'
      border={{ side: 'bottom', color: 'light-4' }}
    >
      <Box direction='row'>
        <Text size='large' margin='small' weight='bold'>
          Aktualne zlecenie
        </Text>
        <Button icon={<Edit color='signifyGreen' />} />
      </Box>
      <Text size='large' margin={{ horizontal: 'small', bottom: 'small' }}>
        {orderNumber}
      </Text>
    </Box>
  );
};

export default ActiveOrder;
