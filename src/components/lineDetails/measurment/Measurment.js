import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import strings from '../../../utils/strings.json';
import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';

import StationCard from './StationCard';

import { LineContext } from '../../../contexts/lineContext';
import { useFetch } from '../../../hooks/useFetch';
import Loading from '../../Loading';

const {
  LINE_DETAILS_addStation,
  LINE_DETAILS_maxStations,
} = strings.lineDetailsPage;

const Measurment = ({ firstDate, secondDate }) => {
  const [results, setResults] = useState();
  const { lineData, addToStations } = useContext(LineContext);
  const orderId = lineData.orderId;

  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);
  const { status, data } = useFetch(URL_FETCH, orderId);

  const stationsArray = lineData.stations;
  const stationsLength = stationsArray.length;

  const resultsArray = data.stations;

  useEffect(() => {
    if (status === 'fetched') {
      setResults(
        ...[
          stationsArray
            .map((station) => {
              let item = resultsArray.find(
                (item) => item.no === Number(station.station)
              );
              if (item) {
                return item;
              }
              return item;
            })
            .filter((item) => item !== undefined),
        ]
      );
    }
  }, [resultsArray, stationsArray, status]);

  // Checking if there is result matching station number
  const getResult = (results, station) => {
    return results.find((r) => r.no === Number(station.station));
  };

  return (
    <Box background='white' border={{ side: 'horizontal', color: 'light-4' }}>
      <Box margin='medium' pad={{ top: 'small' }}>
        {results ? (
          lineData.stations
            .sort((a, b) => a.station - b.station)
            .map((station, index) => (
              <StationCard
                key={station.station}
                station={station}
                last={stationsLength - 1 === index}
                data={getResult(results, station)}
              />
            ))
        ) : (
          <Loading />
        )}

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

export default Measurment;
