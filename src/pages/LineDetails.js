import React, { useState, useEffect } from 'react';

import { Box, Text, Button } from 'grommet';
import { AddCircle } from 'grommet-icons';

import Layout from '../components/layout/Layout';
import ActiveOrder from '../components/lineDetails/ActiveOrder';
import PositionCard from '../components/positionList/PositionCard';
import BreakLine from '../components/BreakLine';

const LineDetails = ({ item }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let newList = [];
    for (let i = 1; i < 7; i++) {
      let newItem = {
        name: `ST-${i}`,
        time: '00:00',
        status: 'waiting',
      };
      newList.push(newItem);
    }
    setList((list) => [...list, ...newList]);
  }, []);

  const addPosition = () => {
    const newItem = {
      name: `ST-${list.length + 1}`,
      time: '00:00',
      status: 'waiting',
    };
    setList((list) => [...list, newItem]);
  };

  console.log(list);
  return (
    <Layout pageName={'title'}>
      <ActiveOrder />
      <BreakLine />
      <Box margin={{ left: 'large', top: 'medium' }}>
        <Text size='large' weight='bold'>
          Balansowanie
        </Text>
      </Box>
      <Box margin='medium'>
        {list.map((position) => (
          <PositionCard key={position.name} position={position} />
        ))}
        <Button
          icon={<AddCircle />}
          label='Dodaj stanowisko'
          margin={{ vertical: 'small' }}
          primary
          onClick={() => {
            addPosition();
          }}
        />
      </Box>
    </Layout>
  );
};

export default LineDetails;
