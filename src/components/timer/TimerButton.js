import React from 'react';
import { Box } from 'grommet';

const TimerButton = ({ onClick, icon, background }) => {
  return (
    <Box
      justify='center'
      align='center'
      background={background}
      width='xsmall'
      height='xsmall'
      round='50%'
      margin='medium'
      elevation='small'
      onClick={onClick}
    >
      {icon}
    </Box>
  );
};

export default TimerButton;
