import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Button, Form, Text, TextArea } from 'grommet';
import { Edit, Checkmark } from 'grommet-icons';
import { LineContext } from '../contexts/lineContext';

const EditableInput = ({ _id, comment, title }) => {
  const [isDisabled, setDisabled] = useState(true);
  const [input, setInput] = useState(comment);

  const { commentPut } = useContext(LineContext);
  const editableInput = useRef(null);

  const handleEdit = async () => {
    await setDisabled(false);
    editableInput.current.focus();
  };

  const handleSubmit = (commentPut, _id, input) => {
    commentPut(_id, { comment: input });
    setDisabled(true);
  };

  useEffect(() => {
    setInput(comment);
  }, [comment]);

  return (
    <Form>
      <Box direction='row' align='center'>
        <Text weight='bold' margin={{ right: 'small' }}>
          {title}
        </Text>
        {isDisabled ? (
          <Button
            plain
            icon={<Edit onClick={() => handleEdit()} color='signifyGreen' />}
            margin='xsmall'
          />
        ) : (
          <Button
            plain
            icon={
              <Checkmark
                onClick={() => handleSubmit(commentPut, _id, input)}
                color='signifyGreen'
              />
            }
            margin='xsmall'
          />
        )}
      </Box>

      <Box round='small' background='background'>
        <TextArea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          // plain='full'
          disabled={isDisabled}
          ref={editableInput}
          style={{ fontWeight: 'normal' }}
          resize={false}
          onFocus={(value) => value.length}
        />
      </Box>
    </Form>
  );
};

export default EditableInput;
