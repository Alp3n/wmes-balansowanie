import React, { useState } from 'react';

import { Box, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';

const ActiveOrder = () => {
  return (
    <Box round='small' margin='medium' background='white' elevation='small'>
      <Box direction='row' justify='between'>
        <Text size='large' margin='small' weight='bold'>
          Aktualne zlecenie
        </Text>
        <Button icon={<Edit color='signifyGreen' />} />
      </Box>
      <Text size='large' margin={{ horizontal: 'small', bottom: 'small' }}>
        32173862167
      </Text>
    </Box>
  );
};

export default ActiveOrder;
