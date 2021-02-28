import React, { useState, useEffect } from 'react';
import { Box, TextArea, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';

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
      <Box direction='row' align='center' justify='between'>
        <Text margin={'small'} weight='bold' size='large'>
          Komentarz
        </Text>
        <Button icon={<Edit color='signifyGreen' />} />
      </Box>
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
