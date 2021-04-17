import React, { useContext } from 'react';
import { Box, Text, Button, ResponsiveContext } from 'grommet';
import { Previous /* Menu */ } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Layout = ({ children, pageName, firstPage }) => {
  const size = useContext(ResponsiveContext);
  const history = useHistory();
  return (
    <Box background='background' fill='horizontal'>
      <Topbar
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
        elevation='small'
        background='signifyDark'
        overflow='hidden'
      >
        {firstPage ? null : (
          <Button
            icon={<Previous color='white' />}
            onClick={() => history.goBack()}
          />
        )}
        <Box margin={{ horizontal: 'medium', vertical: 'medium' }}>
          <TopbarHeading size='large' weight='bold'>
            {pageName}
          </TopbarHeading>
        </Box>
        {/* <Button icon={<Menu color='white' />} /> */}
        <Button plain margin='small' disabled />
      </Topbar>
      <BoxChildren>{children}</BoxChildren>
    </Box>
  );
};

export default Layout;

const TopbarHeading = styled(Text)`
  background: linear-gradient(
    45deg,
    rgba(0, 230, 150, 1) 0%,
    rgba(30, 200, 210, 1) 100%
  );
  background: -moz-linear-gradient(
    45deg,
    rgba(0, 230, 150, 1) 0%,
    rgba(30, 200, 210, 1) 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(0, 230, 150, 1) 0%,
    rgba(30, 200, 210, 1) 100%
  );
  background-clip: text;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Topbar = styled(Box)`
  position: fixed;
  top: 0;
  z-index: 999;
`;

const BoxChildren = styled(Box)`
  position: relative;
  top: 52px;
`;
