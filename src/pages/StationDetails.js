import React, { useContext, useState } from 'react';
import { Button } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/Comment';
import { LineContext } from '../contexts/lineContext';
// import { handleFinished } from '../components/timer/timerFuncs';

const StationDetails = () => {
  const [isFinished, setIsFinished] = useState(false);
  const { state } = useLocation();
  const stationId = state.station;

  const { filterStation } = useContext(LineContext);

  const filteredStation = filterStation(stationId);

  const handleFinished = () => {
    setIsFinished(false);
  };

  console.log(filteredStation);
  return (
    <Layout pageName={`ST-${stationId}`}>
      <Timer
        stationId={stationId}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />
      {filteredStation?.isTimeSub && <Comment stationId={stationId} />}
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
