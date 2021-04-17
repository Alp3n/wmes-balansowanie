import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Button, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import Layout from '../components/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/Comment';

import strings from '../utils/strings.json';

import { LineContext } from '../contexts/lineContext';

const { LINE_DETAILS_activeOrder } = strings.lineDetailsPage;

const StationDetails = () => {
  const [isFinished, setIsFinished] = useState(false);
  const { state } = useLocation();

  const { station } = state;

  const { lineData, filterStation, cleanStation } = useContext(LineContext);

  const filteredStation = filterStation(station);
  const { orderId } = lineData;

  const handleFinished = () => {
    setIsFinished(false);
    cleanStation(station);
  };

  console.log(filteredStation);

  return (
    <Layout pageName={`ST-${station}`}>
      <Box
        direction='row'
        align='center'
        background='white'
        border={{ side: 'horizontal', color: 'light-4' }}
        pad='medium'
        margin={{ bottom: 'small' }}
      >
        <Text size='large' weight='bold'>
          {LINE_DETAILS_activeOrder}:
        </Text>
        <Text margin={{ left: 'small' }} size='large'>
          {orderId}
        </Text>
      </Box>
      <Timer
        stationId={station}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />
      {filteredStation?.isTimeSub && <Comment stationId={station} />}
      {filteredStation?.isTimeSub && (
        <Button
          primary
          label='Nowy pomiar'
          icon={<AddCircle />}
          onClick={() => handleFinished()}
          size='large'
          margin='small'
        />
      )}
    </Layout>
  );
};

export default StationDetails;
