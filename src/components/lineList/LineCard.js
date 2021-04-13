import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Text } from 'grommet';
import { Next } from 'grommet-icons';

const LineCard = ({ line }) => {
  const history = useHistory();

  const handleOpen = () => {
    history.push(`/lines/${line._id}`, line);
  };

  return (
    <Card
      margin={{ vertical: 'small', horizontal: 'medium' }}
      onClick={() => handleOpen()}
    >
      <CardHeader background='white' pad='medium' border={{ side: 'bottom' }}>
        <Text size='large' weight='bold'>
          {line._id}
        </Text>
      </CardHeader>
      <CardBody
        direction='row'
        background='white'
        justify='between'
        align='center'
        pad='medium'
      >
        <Text size='small'>{line.description}</Text>
        <Next />
      </CardBody>
    </Card>
  );
};

export default LineCard;
