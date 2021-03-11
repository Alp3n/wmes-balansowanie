import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text, Card, CardBody, CardHeader } from 'grommet';
import { Chat, Next, Close } from 'grommet-icons';

const PositionCard = ({ index, removeFromList, lineId, orderId, position }) => {
  const history = useHistory();
  // const positionData = {
  //   station: position.station,
  //   line: lineId,
  //   order: orderId,
  //   startedAt: position.startedAt,
  //   finishedAt: position.finishedAt,
  //   comment: position.comment,
  // };
  // console.log(positionData);
  return (
    <Card margin={{ bottom: 'medium' }}>
      <CardHeader background='status-unknown' pad='medium'>
        <Text size='large' weight='bold'>
          ST-{position.station}
        </Text>
        <Button
          icon={<Close size='medium' />}
          onClick={() => removeFromList(index)}
          plain
        />
      </CardHeader>
      <CardBody
        direction='row'
        justify='between'
        align='center'
        background='white'
      >
        <Button
          icon={<Chat />}
          onClick={() => {
            console.log('I PRESSED MESSAGE EDITION');
          }}
        />
        <Text size='large'>{position.time}</Text>
        <Button
          icon={<Next />}
          onClick={() => {
            history.push(`/lines/${lineId}/${position.station}`);
          }}
        />
      </CardBody>
    </Card>
  );
};

export default PositionCard;
