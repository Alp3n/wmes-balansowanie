import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Text } from 'grommet';
import { Next } from 'grommet-icons';

const LineCard = ({ line }) => {
  const history = useHistory();

  const handleOpen = async (e) => {
    history.push(`/lines/${line._id}`, line);
    console.log('MY LINE: ', line);
  };

  return (
    <Card
      margin={{ vertical: 'small', horizontal: 'medium' }}
      onClick={() => handleOpen()}
    >
      <CardHeader background='white' pad='small' border={{ side: 'bottom' }}>
        <Text margin={{ left: 'xsmall' }} size='large' weight='bold'>
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
