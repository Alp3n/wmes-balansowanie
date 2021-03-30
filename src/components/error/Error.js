import React from 'react';
import { Box, Text } from 'grommet';

const ErrorMsg = ({ text }) => {
  return (
    <Box margin='medium' align='center' justify='center'>
      <Text color='status-error'>{text}</Text>
    </Box>
  );
};

export default ErrorMsg;
