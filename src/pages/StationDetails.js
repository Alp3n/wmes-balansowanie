import React, { useContext } from 'react';

import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Timer from '../components/timer/Timer';
import Comment from '../components/comment/Comment';
import { LineContext } from '../contexts/lineContext';

const StationDetails = () => {
  const { state } = useLocation();
  const stationId = state.station;

  const { filterStation } = useContext(LineContext);

  const filteredStation = filterStation(stationId);

  return (
    <Layout pageName={`ST-${stationId}`}>
      <Timer stationId={stationId} />
      {filteredStation.isTimeSub && <Comment stationId={stationId} />}
    </Layout>
  );
};

export default StationDetails;
