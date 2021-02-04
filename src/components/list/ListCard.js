import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text } from 'grommet';
import { Next } from 'grommet-icons';

const ListCard = ({ item, index }) => {
  const history = useHistory();

  const handleClick = async (e) => {
    console.log(item.name);
    history.push(`/lines/${item.name}`);
  };
  return (
    <Box
      round='small'
      direction='row'
      align='center'
      justify='between'
      pad={{ vertical: 'medium', horizontal: 'medium' }}
      margin={{ vertical: 'small', horizontal: 'medium' }}
      elevation='small'
      background='white'
      onClick={() => {
        handleClick();
      }}
    >
      <Text>{item.name}</Text>
      <Next />
    </Box>
  );
};

export default ListCard;
