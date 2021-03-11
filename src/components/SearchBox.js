import React from 'react';
import styled from 'styled-components';
import { Box, TextInput, Button, Text } from 'grommet';
import { Search, Close } from 'grommet-icons';

const StyledBox = styled(Box)`
  position: sticky;
  top: 56px;
  background: white;
  border-bottom: 1px solid 'dark-4';
`;

const SearchBox = ({ search, onChange, onClear }) => {
  return (
    <StyledBox border={{ side: 'bottom', color: 'light-4' }}>
      <Box
        direction='row'
        align='center'
        border
        round='small'
        pad={{ horizontal: 'small', vertical: 'xxsmall' }}
        margin='medium'
        onClick={() => {}}
      >
        <Search />
        <TextInput
          type='text'
          value={search}
          onChange={onChange}
          plain
          placeholder='Wyszukaj linię...'
        />
        {search !== '' && (
          <Button icon={<Close />} onClick={() => onClear()} plain />
        )}
      </Box>
    </StyledBox>
  );
};

export default SearchBox;
