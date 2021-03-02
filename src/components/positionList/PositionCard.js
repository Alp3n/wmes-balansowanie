import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Text, Card, CardBody, CardHeader } from 'grommet';
import { Chat, Next, Close } from 'grommet-icons';

const PositionCard = ({
  positionName,
  positionId,
  index,
  removeFromList,
  lineId,
  order,
  time,
  position,
}) => {
  const history = useHistory();
  return (
    <Card margin={{ bottom: 'medium' }}>
      <CardHeader background='status-unknown' pad='small'>
        <Box margin={{ left: 'small' }}>
          <Text size='large' weight='bold'>
            {positionName}
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
        <Text size='large'>{time}</Text>
        <Button
          icon={<Next />}
          onClick={() => {
            history.push(`/lines/${lineId}/${positionId}`, [order, position]);
          }}
        />
      </CardBody>
    </Card>
  );
};

export default PositionCard;
