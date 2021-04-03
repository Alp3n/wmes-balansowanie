import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import PositionCard from '../positionList/PositionCard';
import { LineContext } from '../../contexts/lineContext';

const Balancing = ({ title, buttonText, infoText }) => {
  const { lineData, addToStations } = useContext(LineContext);

  const stationsLength = lineData.stations.length;

  return (
    <Box background='white' border={{ side: 'horizontal', color: 'light-4' }}>
      <Box margin='medium'>
        <Text size='large' weight='bold'>
          {title}
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
            label={buttonText}
            margin={{ vertical: 'small' }}
            size='large'
            primary
            onClick={() => {
              addToStations();
            }}
          />
        ) : (
          <Text alignSelf='center'>{infoText}</Text>
        )}
      </Box>
    </Box>
  );
};

export default Balancing;
