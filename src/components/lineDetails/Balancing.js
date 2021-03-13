import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import PositionCard from '../positionList/PositionCard';
import { LineContext } from '../../contexts/lineContext';

const Balancing = () => {
  const { lineData, addToStations } = useContext(LineContext);

  const stationsLength = lineData.stations.length;

  const addToList = () => {
    const newItem = {
      station: `${lineData.stations.length + 1}`,
      startedAt: null,
      finishedAt: null,
      comment: null,
    };
    addToStations(newItem);
  };

  return (
    <Box background='white' border={{ side: 'top', color: 'light-4' }}>
      <Box margin='medium'>
        <Text size='large' weight='bold'>
          Balansowanie
        </Text>
      </Box>
      <Box margin='medium'>
        {lineData.stations
          .sort((a, b) => a.station - b.station)
          .map((station, index) => (
            <PositionCard
              key={station.station}
              station={station}
              last={stationsLength - 1 === index}
            />
          ))}
        {stationsLength < 10 ? (
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
