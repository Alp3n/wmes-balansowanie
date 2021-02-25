import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Text, Card, CardBody, CardHeader } from 'grommet';
import { Chat, Next, Close } from 'grommet-icons';

const PositionCard = ({ position, index, removeFromList, id }) => {
  const history = useHistory();
  return (
    <Card margin={{ bottom: 'medium' }}>
      <CardHeader background='status-unknown' pad='small'>
        <Box margin={{ left: 'small' }}>
          <Text size='large' weight='bold'>
            {position.name}
          </Text>
        </Box>
        <Button
          icon={<Close size='small' />}
          onClick={() => removeFromList(index)}
        />
      </CardHeader>
      <CardBody
        direction='row'
        justify='between'
        align='center'
        background='white'
      >
        <Button
          icon={<Chat />}
          onClick={() => {
            console.log('I PRESSED MESSAGE EDITION');
          }}
        />
        <Text size='large'>00:00s</Text>
        <Button
          icon={<Next />}
          onClick={() => {
            history.push(`/lines/${id}/${position.id}`);
          }}
        />
      </CardBody>
    </Card>
  );
};

export default PositionCard;
