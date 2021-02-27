import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Text } from 'grommet';
import { Next } from 'grommet-icons';

const LineCard = ({ line }) => {
  const history = useHistory();

  const handleClick = async (e) => {
    history.push(`/lines/${line._id}`, line);
  };
  return (
    <Card
      margin={{ vertical: 'small', horizontal: 'medium' }}
      onClick={() => handleClick()}
    >
      <CardHeader background='white' pad='small' border={{ side: 'bottom' }}>
        <Text weight='bold'>{line._id}</Text>
      </CardHeader>
      <CardBody
        direction='row'
        background='white'
        justify='between'
        align='center'
        pad='small'
      >
        <Text size='small'>{line.description}</Text>
        <Next />
      </CardBody>
    </Card>
  );
};

export default LineCard;
