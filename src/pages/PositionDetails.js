import React, { useState, useEffect } from 'react';

import { Box, Text } from 'grommet';
import Layout from '../components/layout/Layout';
import Timer from '../components/timer/Timer';

const PositionDetails = () => {
  return (
    <Layout pageName='ST-1'>
      <Box
        pad='medium'
        background='white'
        margin={{ bottom: 'small' }}
        border={{ side: 'bottom', color: 'light-4' }}
      >
        <Text weight='bold' size='large'>
          Nazwa stanowiska
        </Text>
        <Text>ST-1</Text>
      </Box>
      <Timer />
    </Layout>
  );
};

export default PositionDetails;
