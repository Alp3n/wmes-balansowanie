import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Text } from 'grommet';
import { Next } from 'grommet-icons';

const ListCard = ({ item }) => {
  const history = useHistory();

  const handleClick = async (e) => {
    history.push(`/lines/${item._id}`, item);
  };

  return (
    <Card
      margin={{ vertical: 'small', horizontal: 'medium' }}
      onClick={() => handleClick()}
    >
      <CardHeader background='white' pad='small' border={{ side: 'bottom' }}>
        <Text weight='bold'>{item._id}</Text>
      </CardHeader>
      <CardBody
        direction='row'
        background='white'
        justify='between'
        align='center'
        pad='small'
      >
        <Text size='small'>{item.description}</Text>
        <Next />
      </CardBody>
    </Card>
  );
};

export default ListCard;
