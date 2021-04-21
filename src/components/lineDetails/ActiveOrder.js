import React, { useState, useContext, useRef, useEffect } from 'react';
import { LineContext } from '../../contexts/lineContext';
import { Box, Text, TextInput, Button, Form } from 'grommet';
import { Edit, Refresh, Checkmark } from 'grommet-icons';
import strings from '../../utils/strings.json';

const {
  LINE_DETAILS_activeOrder,
  LINE_DETAILS_noActiveOrder,
  LINE_DETAILS_noOrder,
  LINE_DETAILS_refresh,
} = strings.lineDetailsPage;

const ActiveOrder = ({ handleRefresh, orderStatus }) => {
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState('');
  const { lineData, changeOrderId, setupStations } = useContext(LineContext);

  const textInput = useRef(null);

  const handleEdit = async () => {
    await setDisabled(false);
    setInput('');
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
    setInput(!lineData.orderId ? LINE_DETAILS_noOrder : lineData.orderId);
  }, [lineData.orderId, orderStatus]);

  return (
    <Box
      background='white'
      border={{ side: 'bottom', color: 'light-4' }}
      margin={{ bottom: 'small' }}
    >
      <Box direction='row' align='center' pad='medium' justify='between'>
        <Text size='large' weight='bold'>
          {!lineData.orderId
            ? LINE_DETAILS_noActiveOrder
            : LINE_DETAILS_activeOrder}
        </Text>
        {orderStatus === 'new' ? (
          <Button
            icon={<Refresh color='signifyGreen' />}
            label={LINE_DETAILS_refresh}
            onClick={() => handleRefresh()}
            plain
          />
        ) : disabled ? (
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
