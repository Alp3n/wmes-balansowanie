import React, { useState, useContext, useEffect } from 'react';

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
  const [response, setResponse] = useState({});

  const contextState = lineData.stations.filter(
    (station) => station.station === stationId
  );

  const [station, setStation] = useState(...contextState);

  console.log('STATE:', station, 'ID:', stationId);
  console.log('RESPONSE:', response);

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
        setStation((prevState) => ({ ...prevState, responseId: data._id }));
      })
      .then(() => editStation(stationId, station));
  };

  const handleDelete = async () => {
    await fetch(`${URL_BALANCING}/${response._id}`, {
      method: 'DELETE',
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(response._id),
    }).then((response) => response.json());
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
        setCommentSub(true);
      })
      .then(() => editStation(stationId, station));
  };

  const handleComment = () => {
    setCommentSub(false);
  };

  return (
    <Layout pageName={`ST-${stationId}`}>
      <Timer
        setStation={setStation}
        setResponse={setResponse}
        setTimeSub={setTimeSub}
        handlePost={handlePost}
        handleDelete={handleDelete}
        startDate={station.startedAt}
        finishDate={station.finishedAt}
        isTimeSub={isTimeSub}
        finished={station.isFinished}
      />
      {isTimeSub && (
        <Comment
          setStation={setStation}
          isCommentSub={isCommentSub}
          handleComment={handleComment}
          handlePut={handlePut}
        />
      )}
    </Layout>
  );
};

export default PositionDetails;
