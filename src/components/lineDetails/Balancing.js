import React from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import PositionCard from '../positionList/PositionCard';

const Balancing = ({
  list,
  removeFromList,
  addToList,
  lineId,
  order,
  children,
}) => {
  return (
    <Box background='white' border={{ side: 'top', color: 'light-4' }}>
      <Box margin='medium'>
        <Text size='large' weight='bold'>
          Balansowanie
        </Text>
      </Box>
      <Box margin='medium'>
        {/* list.map((position, index) => (
          <PositionCard
            key={position.name}
            positionName={position.name}
            positionId={position.station}
            index={index}
            removeFromList={removeFromList}
            lineId={lineId}
            order={order}
            time={position.time}
            position={position}
          />
        )) */}
        {children}
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
