import React, { useState, useContext, useRef, useEffect } from 'react';
import { LineContext } from '../../contexts/lineContext';
import { Box, Text, TextInput, Button } from 'grommet';
import { Edit, Refresh, Checkmark } from 'grommet-icons';

const ActiveOrder = ({ orderNumber, text, handleRefresh, newOrder }) => {
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(orderNumber);
  const { changeOrderId } = useContext(LineContext);

  const textInput = useRef(null);

  const handleEdit = async () => {
    await setDisabled(false);
    textInput.current.focus();
  };
  const handleSubmit = async () => {
    await changeOrderId(input);
    setDisabled(true);
  };

  useEffect(() => {
    setInput(orderNumber);
  }, [orderNumber]);

  return (
    <Box
      background='white'
      border={{ side: 'bottom', color: 'light-4' }}
      margin={{ bottom: 'small' }}
    >
      <Box direction='row' align='center' pad='medium'>
        <Text size='large' weight='bold'>
          {text}
        </Text>
        {newOrder === 'newOrder' ? (
          <Button
            icon={<Refresh color='signifyGreen' />}
            plain
            margin={{ left: 'small' }}
            onClick={() => handleRefresh()}
          />
        ) : newOrder === 'error' ? null : disabled ? (
          <Button
            icon={<Edit color='signifyGreen' />}
            plain
            margin={{ left: 'small' }}
            onClick={() => handleEdit()}
          />
        ) : (
          <Button
            icon={<Checkmark color='signifyGreen' />}
            plain
            margin={{ left: 'small' }}
            onClick={() => handleSubmit()}
          />
        )}
      </Box>
      <Box
        direction='row'
        align='center'
        pad={{ horizontal: 'medium', bottom: 'medium' }}
        width='auto'
      >
        <TextInput
          size='large'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          plain='full'
          disabled={disabled}
          ref={textInput}
          maxLength='9'
        />
      </Box>
    </Box>
  );
};

export default ActiveOrder;
