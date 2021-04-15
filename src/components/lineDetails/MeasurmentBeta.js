import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import StationCard from '../StationCard';
import { LineContext } from '../../contexts/lineContext';
import strings from '../../utils/strings.json';

const {
  LINE_DETAILS_addStation,
  LINE_DETAILS_maxStations,
} = strings.lineDetailsPage;

const MeasurmentBeta = () => {
  const { lineData, addToStations } = useContext(LineContext);

  const stationsLength = lineData.stations.length;

  return (
    <Box background='white' border={{ side: 'horizontal', color: 'light-4' }}>
      <Box margin='medium'>
        {lineData.stations
          .sort((a, b) => a.station - b.station)
          .map((station, index) => (
            <StationCard
              key={station.station}
              station={station}
              last={stationsLength - 1 === index}
            />
          ))}
        {stationsLength < 10 ? (
          <Button
            icon={<AddCircle />}
            label={LINE_DETAILS_addStation}
            margin={{ vertical: 'small' }}
            size='large'
            primary
            onClick={() => {
              addToStations();
            }}
          />
        ) : (
          <Text alignSelf='center'>{LINE_DETAILS_maxStations}</Text>
        )}
      </Box>
    </Box>
  );
};

export default MeasurmentBeta;