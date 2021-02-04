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
} from 'grommet-icons';

const PositionCard = ({ position }) => {
  const [background, setBackground] = useState('status-unknown');
  return (
    <Card margin={{ bottom: 'medium' }}>
      <CardHeader justify='center' background='status-unknown' pad='small'>
        <Text size='large' weight='bold'>
          {position.name}
        </Text>
      </CardHeader>
      <CardBody direction='row' justify='between' align='center'>
        <Button icon={<Chat />} />
        <Text size='large'>00:00s</Text>
        <Button icon={<Next />} />
      </CardBody>
    </Card>
  );
};

export default PositionCard;
