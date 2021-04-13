import React, { useState, useContext, useRef, useEffect } from 'react';
import { LineContext } from '../../contexts/lineContext';
import { Box, Text, TextInput, Button, Form } from 'grommet';
import { Edit, Refresh, Checkmark } from 'grommet-icons';
import strings from '../../utils/strings.json';

const {
  LINE_DETAILS_activeOrder,
  LINE_DETAILS_newOrder,
} = strings.lineDetailsPage;

const ActiveOrder = ({ orderNumber, handleRefresh, newOrder }) => {
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(orderNumber);
  const { lineData, changeOrderId, setupStations } = useContext(LineContext);

  const textInput = useRef(null);

  const handleEdit = async () => {
    await setDisabled(false);
    textInput.current.focus();
  };

  const handleSubmit = () => {
    changeOrderId(input);
    if (lineData.orderId !== input) {
      setupStations(lineData.lineId, input);
    }
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
      <Box direction='row' align='center' pad='medium' justify='between'>
        <Text size='large' weight='bold'>
          {LINE_DETAILS_activeOrder}
        </Text>
        {newOrder === 'new' ? (
          <Box
            direction='row'
            align='center'
            onClick={() => handleRefresh()}
            pad='xsmall'
          >
            <Refresh color='signifyGreen' plain />
            <Text size='xsmall' margin={{ left: 'small' }} color='signifyGreen'>
              {LINE_DETAILS_newOrder}
            </Text>
          </Box>
        ) : newOrder === 'error' ? null : disabled ? (
          <Button
            icon={<Edit color='signifyGreen' />}
            onClick={() => handleEdit()}
            plain
          />
        ) : (
          <Button
            icon={<Checkmark color='signifyGreen' />}
            onClick={() => handleSubmit()}
            plain
          />
        )}
      </Box>
      <Box
        direction='row'
        align='center'
        pad={{ horizontal: 'medium', bottom: 'medium' }}
        width='auto'
      >
        <Form>
          {/* TODO Validation min 9 max 9 */}
          <TextInput
            size='large'
            value={input}
            onChange={(event) => setInput(event.target.value)}
            plain='full'
            disabled={disabled}
            ref={textInput}
            maxLength={9}
          />
        </Form>
      </Box>
    </Box>
  );
};

export default ActiveOrder;
