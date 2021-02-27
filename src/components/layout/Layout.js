import React from 'react';
import { Box, Heading, Button } from 'grommet';
import { Previous, Menu } from 'grommet-icons';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const boxStyle = {
  position: 'relative',
};

const TopbarHeading = styled(Heading)`
  background: -webkit-linear-gradient(
    45deg,
    rgba(0, 230, 150, 1) 0%,
    rgba(30, 200, 210, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Topbar = styled(Box)`
  position: sticky;
  top: 0;
  overflow: auto;
  z-index: 999;
`;

const Layout = ({ children, pageName, firstPage }) => {
  const history = useHistory();
  return (
    <Box style={boxStyle} background='background' fill='horizontal'>
      <Topbar
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
        elevation='small'
        background='signifyDark'
      >
        {firstPage ? null : (
          <Button
            icon={<Previous color='white' />}
            margin={{ left: 'small' }}
            plain
            onClick={() => history.goBack()}
          />
        )}
        <TopbarHeading level='2' margin='medium'>
          {pageName}
        </TopbarHeading>
        <Button
          icon={<Menu color='white' />}
          margin={{ right: 'small' }}
          plain
        />
      </Topbar>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
