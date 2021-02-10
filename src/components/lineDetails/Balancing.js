import React from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import PositionCard from '../positionList/PositionCard';

const Balancing = ({ list, removeFromList, addToList }) => {
  return (
    <Box>
      <Box margin='medium'>
        <Text size='large' weight='bold'>
          Balansowanie
        </Text>
      </Box>
      <Box margin='medium'>
        {list.map((position, index) => (
          <PositionCard
            key={position.name}
            position={position}
            index={index}
            removeFromList={removeFromList}
            onClick={{}}
          />
        ))}
        {list.length < 10 ? (
          <Button
            icon={<AddCircle />}
            label='Dodaj stanowisko'
            margin={{ vertical: 'small' }}
            size='large'
            primary
            onClick={() => {
              addToList();
            }}
          />
        ) : (
          <Text alignSelf='center'>Maksymalna liczba stanowisk</Text>
        )}
      </Box>
    </Box>
  );
};

export default Balancing;
