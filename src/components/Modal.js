import React from 'react';
import { Box } from 'grommet';

const Modal = (props) => {
  return (
    <Box
      background={{ color: 'light-4', opacity: 'strong' }}
      fill
      align='center'
      justify='center'
    >
      <Box background='white' pad='large' gap='medium' round>
        {props.children}
      </Box>
    </Box>
  );
};

export default Modal;
