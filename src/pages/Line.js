import React, { useState, useEffect } from 'react';
import { Box, InfiniteScroll, TextInput, Text, Card } from 'grommet';
import { base } from 'grommet/themes';
import { Search, Next } from 'grommet-icons';
import Layout from '../components/Layout';

const pageName = 'Linie produkcyjne';

const searchBoxStyle = {
  position: 'sticky',
  top: 56,
  background: 'white',
};

const items = [];
for (let i = 0; i < 15; i++) {
  items.push({ name: `LM-${i}` });
}
for (let i = 0; i < 15; i++) {
  items.push({ name: `ST-${i}` });
}
for (let i = 0; i < 15; i++) {
  items.push({ name: `FR-${i}` });
}

const Line = () => {
  const [search, setSearch] = useState('');
  const [lines, setLines] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);

  useEffect(() => {
    setLines(items);
  }, []);

  useEffect(() => {
    setFilteredLines(
      lines.filter((line) =>
        line.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, lines]);

  const onChange = (event) => {
    const { value: newValue } = event.target;
    setSearch(newValue);

    lines.filter((line) =>
      line.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(search);
  };

  return (
    <Layout pageName={pageName} firstPage={true}>
      <Box style={searchBoxStyle}>
        <Box
          direction='row'
          align='center'
          border
          round='small'
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          margin='medium'
        >
          <Search />
          <TextInput
            type='text'
            value={search}
            onChange={onChange}
            plain
            placeholder='Wyszukaj linię...'
          />
        </Box>
        <Box margin='medium'>
          <Text size='large'>
            <strong>Lista linii</strong>
          </Text>
        </Box>
      </Box>

      <Box overflow='auto' height='100%'>
        <InfiniteScroll items={filteredLines}>
          {(item, index) => (
            <Box
              key={item.name}
              round='small'
              direction='row'
              align='center'
              justify='between'
              pad={{ vertical: 'medium', horizontal: 'medium' }}
              margin={{ vertical: 'small', horizontal: 'medium' }}
              border={{ side: 'all', color: '#e3e3e3' }}
              background={index % 2 ? 'white' : '#efefef'}
              onClick={() => {}}
            >
              <Text>{item.name}</Text>
              <Next />
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Layout>
  );
};

export default Line;
