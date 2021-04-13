import React, { useContext } from 'react';

import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/Comment';
import { LineContext } from '../contexts/lineContext';

const StationDetails = () => {
  const { state } = useLocation();
  const stationId = state.station;

  const { filterStation } = useContext(LineContext);

  const filteredStation = filterStation(stationId);
  console.log(filteredStation);
  return (
    <Layout pageName={`ST-${stationId}`}>
      <Timer stationId={stationId} />
      {filteredStation.isTimeSub && <Comment stationId={stationId} />}
    </Layout>
  );
};

export default StationDetails;
