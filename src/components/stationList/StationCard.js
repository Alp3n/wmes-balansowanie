import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text, Card, CardBody, CardHeader } from 'grommet';
import { Chat, Next, Trash } from 'grommet-icons';
import { LineContext } from '../../contexts/lineContext';

const StationCard = ({ station, last }) => {
  const { lineData, removeFromStations } = useContext(LineContext);
  const { lineId } = lineData;

  const history = useHistory();

  const getSeconds = (start, end) => {
    let seconds;
    if (start || end !== null) {
      seconds = Math.round((Date.parse(end) - Date.parse(start)) / 1000);
    }
    return seconds;
  };

  return (
    <Card margin={{ bottom: 'large' }}>
      <CardHeader
        background={station.isTimeSub ? 'status-ok' : 'status-unknown'}
        pad='medium'
      >
        <Text size='large' weight='bold'>
          ST-{station.station}
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
          icon={<Chat color={station.comment ? 'status-ok' : null} />}
          disabled={station.finishedAt ? false : true}
          onClick={() => {
            console.log('I PRESSED MESSAGE EDITION');
          }}
        />
        <Text size='large'>
          {station.startedAt && station.finishedAt !== null
            ? `${getSeconds(station.startedAt, station.finishedAt)}s`
            : '0s'}
        </Text>
        <Button
          icon={<Next />}
          onClick={() => {
            history.push(`/lines/${lineId}/${station.station}`, station);
          }}
        />
      </CardBody>
    </Card>
  );
};

export default StationCard;
