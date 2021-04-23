import React, { useContext } from 'react';
import { Box, Text, Button, Layer } from 'grommet';
import { Previous /* Menu */ } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ModalContext } from '../contexts/modalContext';

const Layout = ({ children, pageName, firstPage }) => {
  const history = useHistory();
  const { showModal, modal, closeModal } = useContext(ModalContext);
  return (
    <Box background='background' fill='horizontal'>
      <Topbar
        fill='horizontal'
        direction='row'
        align='center'
        justify='between'
        elevation='small'
        background='signifyDark'
        // overflow='hidden'
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
      {showModal && (
        <Layer
          plain
          onClickOutside={closeModal}
          onEsc={closeModal}
          // animation='slide'
        >
          {modal}
        </Layer>
      )}
    </Box>
  );
};

export default Layout;

const Topbar = styled(Box)`
  position: fixed;
  top: 0;
  z-index: 2;
`;

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

const BoxChildren = styled(Box)`
  position: relative;
  top: 52px;
`;
