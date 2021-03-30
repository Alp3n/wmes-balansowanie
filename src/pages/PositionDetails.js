import React, { useState, useContext, useRef } from 'react';

import { Button } from 'grommet';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/comment/Comment';
import { HEADERS, URL_BALANCING } from '../utils/consts';
import { LineContext } from '../contexts/lineContext';

const PositionDetails = () => {
  const { state } = useLocation();
  const stationId = state.station;
  const { lineData, editStation } = useContext(LineContext);

  const [isTimeSub, setTimeSub] = useState(false);
  const [isCommentSub, setCommentSub] = useState(false);
  const [response, setResponse] = useState();

  const contextState = lineData.stations.filter(
    (station) => station.station === stationId
  );

  const [station, setStation] = useState(...contextState);

  console.log('STATE:', station, 'ID:', stationId);

  const textArea = useRef(null);

  const postData = {
    line: lineData.lineId,
    order: lineData.orderId,
    station: station.station,
    startedAt: station.startedAt,
    finishedAt: station.finishedAt,
    comment: station.comment,
  };

  const handlePost = async () => {
    await fetch(URL_BALANCING, {
      method: 'POST',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setTimeSub(true);
      });
    editStation(stationId, station);
  };

  const handlePut = async () => {
    await fetch(`${URL_BALANCING}/${response._id}`, {
      method: 'PUT',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        console.log(response);
        setCommentSub(true);
      });
    editStation(stationId, station);
  };

  const handleCommentEdit = () => {
    setCommentSub(false);
    textArea.current.focus();
  };

  return (
    <Layout pageName={`ST-${stationId}`}>
      <Timer
        setStation={setStation}
        setResponse={setResponse}
        setTimeSub={setTimeSub}
        handlePost={handlePost}
        isTimeSub={isTimeSub}
      />
      {isTimeSub && (
        <>
          <Comment
            setStation={setStation}
            isCommentSub={isCommentSub}
            handleCommentEdit={handleCommentEdit}
            textArea={textArea}
          />
          {isCommentSub ? null : (
            <Button
              label='Zatwierdź komentarz'
              primary
              color='signifyGreen'
              margin={{ horizontal: 'small', bottom: 'small' }}
              size='large'
              onClick={() => handlePut()}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default PositionDetails;
