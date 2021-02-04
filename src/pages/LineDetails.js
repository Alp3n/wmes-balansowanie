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

  const addToList = () => {
    const newItem = {
      name: `ST-${list.length + 1}`,
      time: '00:00',
      status: 'waiting',
    };
    setList((list) => [...list, newItem]);
  };

  const removeFromList = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  console.log(list);
  return (
    <Layout pageName={'title'}>
      <ActiveOrder />
      <BreakLine />
      <Box margin='medium'>
        <Text size='large' weight='bold'>
          Balansowanie
        </Text>
      </Box>
      <Box margin='medium'>
        {list.map((position, index) => (
          <PositionCard
            key={position.name}
            position={position}
            index={index}
            removeFromList={removeFromList}
          />
        ))}
        <Button
          icon={<AddCircle />}
          label='Dodaj stanowisko'
          margin={{ vertical: 'small' }}
          size='large'
          primary
          onClick={() => {
            addToList();
          }}
        />
      </Box>
    </Layout>
  );
};

export default LineDetails;
