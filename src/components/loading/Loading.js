import React from 'react';
import { Box, Spinner, Text } from 'grommet';

const Loading = ({ text, size = 'large' }) => {
  const defaultText = 'Pobieram dane...';
  return (
    <Box justify='center' align='center' margin='large'>
      <Spinner size={size} />
      <Text margin='small'>{text ? text : defaultText}</Text>
    </Box>
  );
};

export default Loading;
