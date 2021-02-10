import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import SearchBox from '../components/SearchBox';
import List from '../components/list/List';

import { URL_PRODLINES, HEADERS } from '../utils/consts';

const pageName = 'Linie produkcyjne';

const Line = () => {
  const [search, setSearch] = useState('');
  const [lines, setLines] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);

  const getLines = async () => {
    const response = await fetch(URL_PRODLINES, { headers: HEADERS });
    const data = await response.json();
    setLines(data.collection);
  };

  useEffect(() => {
    getLines();
  }, []);

  useEffect(() => {
    setFilteredLines(
      lines.filter((line) =>
        line._id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, lines]);

  const onChange = (event) => {
    const { value: newValue } = event.target;
    setSearch(newValue);
  };

  return (
    <Layout pageName={pageName} firstPage={true}>
      <SearchBox search={search} onChange={onChange} setSearch={setSearch} />
      {/* <List filteredLines={lines} /> */}
      <List filteredLines={filteredLines} />
    </Layout>
  );
};

export default Line;
