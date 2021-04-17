import React from 'react';
import styled from 'styled-components';
import { Box, TextInput, Button } from 'grommet';
import { Search, Close } from 'grommet-icons';

const StyledBox = styled(Box)`
  position: fixed;
  top: 52px;
  background: white;
  border-bottom: 1px solid 'dark-4';
  width: 100%;
  z-index: 999;
`;

const SearchBox = ({ search, onChange, onClear, text }) => {
  return (
    <StyledBox
      border={{ side: 'bottom', color: 'light-4' }}
      overflow='hidden'
      style={{ top: 'small' }}
    >
      <Box
        direction='row'
        align='center'
        border
        round='small'
        pad={{ horizontal: 'medium' }}
        margin={{ horizontal: 'medium', vertical: 'small' }}
        onClick={() => {}}
      >
        <Search />
        <TextInput
          type='text'
          value={search}
          onChange={onChange}
          placeholder={text}
          plain={true}
          focusIndicator={false}
        />
        {search !== '' && (
          <Button icon={<Close />} onClick={() => onClear()} plain />
        )}
      </Box>
    </StyledBox>
  );
};

export default SearchBox;
