import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Text, Card, CardBody, CardHeader, CardFooter } from 'grommet';
import { Up, LineChart, Next, Trash } from 'grommet-icons';

import { LineContext } from '../contexts/lineContext';
import strings from '../utils/strings.json';

// Formating two ISOstrings to get difference in time MM-SS
import { durationFromISOFormatter } from '../functions/functions';
// import StationChart from './lineDetails/dataChart/StationChart';

// import data from './lineDetails/dataChart/data.json';
import StationResults from './lineDetails/dataChart/StationResults';

const { STATION_CARD_station } = strings.stationCard;

const StationCard = ({ station, last, data }) => {
  const [isOpen, setOpen] = useState(false);
  const { lineData, removeFromStations } = useContext(LineContext);
  const { lineId } = lineData;

  const history = useHistory();

  // Handling routing and passing station state
  const handleClick = () => {
    history.push(`/lines/${lineId}/${station.station}`, station);
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
        <Button
          icon={isOpen ? <Up /> : <LineChart />}
          onClick={() => setOpen((prevState) => !prevState)}
        />
        <Text size='large'>
          {station.startedAt && station.finishedAt !== null
            ? `${durationFromISOFormatter(
                station.startedAt,
                station.finishedAt
              )}`
            : '0s'}
        </Text>
        <Button icon={<Next />} onClick={handleClick} />
      </CardBody>
      {isOpen && (
        <CardFooter border={{ side: 'top', color: 'light-4' }} justify='center'>
          {/* <StationChart data={data} /> */}
          <StationResults data={data} />
        </CardFooter>
      )}
    </Card>
  );
};

export default StationCard;
