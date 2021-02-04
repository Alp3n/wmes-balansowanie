import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import SearchBox from '../components/SearchBox';
import List from '../components/list/List';
import BreakLine from '../components/BreakLine';

const pageName = 'Linie produkcyjne';

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
      <SearchBox search={search} onChange={onChange} setSearch={setSearch} />
      <List filteredLines={filteredLines} />
    </Layout>
  );
};

export default Line;
