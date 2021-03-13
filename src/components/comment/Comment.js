import React, { useState, useEffect } from 'react';
import { Box, TextArea, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';

const Comment = ({ setStation, isCommentSub, handleCommentEdit, textArea }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setStation((prevState) => ({
      ...prevState,
      comment: value,
    }));
  }, [value, setStation]);

  return (
    <Box
      background='white'
      margin={{ vertical: 'small' }}
      pad={{ vertical: 'small' }}
      height='small'
      border={{ vertical: 'small', color: 'light-4' }}
    >
      <Box direction='row' align='center' justify='between'>
        <Text
          margin={{ vertical: 'medium', horizontal: 'small' }}
          weight='bold'
          size='large'
        >
          Komentarz
        </Text>
        {isCommentSub && (
          <Button
            icon={<Edit color='signifyGreen' />}
            onClick={() => handleCommentEdit()}
          />
        )}
      </Box>
      <TextArea
        placeholder={'Wpisz komentarz...'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        resize={false}
        fill
        plain
        ref={textArea}
      />
    </Box>
  );
};
export default Comment;
