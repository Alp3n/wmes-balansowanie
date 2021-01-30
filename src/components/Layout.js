import React from 'react';
import { Box, Heading, Button } from 'grommet';
import { Previous, Menu } from 'grommet-icons';

const boxStyle = {
  position: 'relative',
};
const navBoxStyle = { position: 'sticky', top: 0 };

const Layout = ({ children, pageName, firstPage }) => {
  return (
    <Box style={boxStyle}>
      <Box
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
        round='none'
        elevation='small'
        background='brand'
        style={navBoxStyle}
      >
        {firstPage ? null : (
          <Button
            icon={<Previous color='black' />}
            margin={{ left: 'small' }}
            plain
          />
        )}
        <Heading level='2' margin='medium'>
          {pageName}
        </Heading>
        <Button
          icon={<Menu color='white' />}
          margin={{ right: 'small' }}
          plain
        />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
