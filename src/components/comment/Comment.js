import React, { useState, useEffect } from 'react';
import { Box, TextArea, Text } from 'grommet';

const Comment = ({ setPosition }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setPosition((prevState) => ({
      ...prevState,
      comment: value,
    }));
  }, [value, setPosition]);

  return (
    <Box
      background='white'
      margin={{ vertical: 'small' }}
      height='small'
      border={{ vertical: 'small', color: 'light-4' }}
    >
      <Text margin={'small'} weight='bold' size='large'>
        Komentarz
      </Text>
      <TextArea
        placeholder={'Wpisz komentarz...'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        resize={false}
        fill
        plain
      />
    </Box>
  );
};
export default Comment;
