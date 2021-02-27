import React, { useState } from 'react';

import { Box, Button, Text } from 'grommet';
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/comment/Comment';
import { HEADERS, URL_BALANCING } from '../utils/consts';

const PositionDetails = () => {
  const { lineId, positionId } = useParams();
  const { state } = useLocation();
  const [response, setResponse] = useState();
  const [position, setPosition] = useState({
    line: lineId,
    order: state.orderId,
    station: positionId,
    startedAt: null,
    finishedAt: null,
    comment: '',
  });

  // const [isCounting, setIsCounting] = useState(false);
  //TODO fix POST PUT (Post on stop button, put on zatwierdź)
  const handleClick = async () => {
    if (position.comment !== '') {
      await fetch(`${URL_BALANCING}/${response._id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(position),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
          console.log(response);
        });
    } else {
      await fetch(URL_BALANCING, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(position),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
        });
    }
  };
  console.log(response);
  return (
    <Layout pageName={`ST-${positionId}`}>
      <Box
        pad='medium'
        background='white'
        margin={{ bottom: 'small' }}
        border={{ side: 'bottom', color: 'light-4' }}
      >
        <Text weight='bold' size='large'>
          Nazwa stanowiska
        </Text>
        <Text>ST-{positionId}</Text>
      </Box>
      <Timer
        setPosition={setPosition}
        position={position}
        // setIsCounting={setIsCounting}
        setResponse={setResponse}
      />
      <Comment setPosition={setPosition} />
      <Button
        label='Zatwierdź'
        primary
        color='signifyGreen'
        margin='small'
        size='large'
        onClick={() => handleClick()}
      />
    </Layout>
  );
};

export default PositionDetails;
