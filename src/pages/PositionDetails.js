import React, { useState, useContext } from 'react';

import { Box, Button, Text } from 'grommet';
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/comment/Comment';
import { HEADERS, URL_BALANCING } from '../utils/consts';

const PositionDetails = () => {
  const { lineId, positionId } = useParams();
  const { state } = useLocation();
  const [isTimeSub, setTimeSub] = useState(false);
  const [isCommentSub, setCommentSub] = useState(false);
  const [response, setResponse] = useState();
  const [position, setPosition] = useState({
    line: lineId,
    order: state.orderId,
    station: positionId,
    startedAt: null,
    finishedAt: null,
    comment: '',
  });

  //TODO fix POST PUT (Post on stop button, put on zatwierdź)

  const handlePost = async () => {
    await fetch(URL_BALANCING, {
      method: 'POST',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(position),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setTimeSub(true);
      });
  };

  const handlePut = async () => {
    await fetch(`${URL_BALANCING}/${response._id}`, {
      method: 'PUT',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(position),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        console.log(response);
        setCommentSub(true);
      });
  };

  // const handleClick = async () => {
  //   if (position.comment !== '') {
  //     await fetch(`${URL_BALANCING}/${response._id}`, {
  //       method: 'PUT',
  //       headers: HEADERS,
  //       mode: 'cors',
  //       credentials: 'include',
  //       body: JSON.stringify(position),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setResponse(data);
  //         console.log(response);
  //         setCommentSub(true);
  //       });
  //   } else {
  //     await fetch(URL_BALANCING, {
  //       method: 'POST',
  //       headers: HEADERS,
  //       mode: 'cors',
  //       credentials: 'include',
  //       body: JSON.stringify(position),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setResponse(data);
  //         setTimeSub(true);
  //       });
  //   }
  // };
  console.log(response);
  console.log(state[1]);
  return (
    <Layout pageName={`ST-${positionId}`}>
      {/* <Box
        pad='medium'
        background='white'
        margin={{ bottom: 'small' }}
        border={{ side: 'bottom', color: 'light-4' }}
      >
        <Text weight='bold' size='large'>
          Nazwa stanowiska
        </Text>
        <Text>ST-{positionId}</Text>
      </Box> */}
      <Timer
        setPosition={setPosition}
        position={position}
        setResponse={setResponse}
        setTimeSub={setTimeSub}
        handleClick={handlePost}
        isTimeSub={isTimeSub}
      />
      {isTimeSub ? (
        <>
          <Comment setPosition={setPosition} />
          {isCommentSub ? null : (
            <Button
              label='Zatwierdź komentarz'
              primary
              color='signifyGreen'
              margin='small'
              size='large'
              onClick={() => handlePut()}
            />
          )}
        </>
      ) : null}
    </Layout>
  );
};

export default PositionDetails;
