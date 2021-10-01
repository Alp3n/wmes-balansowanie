import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Text, Card, CardBody, CardHeader } from 'grommet';
import { Trash, Camera, Clock } from 'grommet-icons';

import { LineContext } from '../../../contexts/lineContext';
import strings from '../../../utils/strings.json';

// Formating two ISOstrings to get difference in time MM-SS
import { durationFromISOFormatter } from '../../../functions/functions';
// import StationChart from './lineDetails/dataChart/StationChart';

// import data from './lineDetails/dataChart/data.json';

const { STATION_CARD_station } = strings.stationCard;

const StationCard = ({ station, last }) => {
  const { lineData, removeFromStations } = useContext(LineContext);
  const { lineId } = lineData;

  const history = useHistory();

  // Handling routing and passing station state
  const handleStopwatch = () => {
    history.push(`/lines/${lineId}/${station.station}`, station);
  };

  const handleCamera = () => {
    history.push(`/lines/${lineId}/${station.station}/camera`, station);
  };

  return (
    <Card margin={{ bottom: 'large' }}>
      <CardHeader
        background={station.isTimeSub ? 'status-ok' : 'status-unknown'}
        pad='medium'
      >
        <Text size='large' weight='bold'>
          {STATION_CARD_station}
          {station.station}
        </Text>
        {last && (
          <Button
            icon={<Trash size='medium' />}
            onClick={() => removeFromStations(station.station)}
            plain
          />
        )}
      </CardHeader>
      <CardBody
        direction='row'
        justify='between'
        align='center'
        background='white'
      >
        <Button icon={<Camera />} onClick={handleCamera} />
        <Text size='large'>
          {station.startedAt && station.finishedAt !== null
            ? `${durationFromISOFormatter(
                station.startedAt,
                station.finishedAt
              )}`
            : '0s'}
        </Text>
        <Button icon={<Clock />} onClick={handleStopwatch} />
      </CardBody>
    </Card>
  );
};

export default StationCard;
