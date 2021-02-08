import React, { useState } from 'react';
import { Box, Button, Text, Card, CardBody, CardHeader } from 'grommet';
import {
  PlayFill,
  Play,
  StopFill,
  Stop,
  Like,
  Chat,
  Next,
  Close,
} from 'grommet-icons';

const PositionCard = ({ position, index, removeFromList }) => {
  const [background, setBackground] = useState('status-unknown');
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
        <Button icon={<Chat />} />
        <Text size='large'>00:00s</Text>
        <Button icon={<Next />} />
      </CardBody>
    </Card>
  );
};

export default PositionCard;
