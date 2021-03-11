import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import SearchBox from '../components/SearchBox';
import LineList from '../components/list/LineList';

import { URL_PRODLINES, HEADERS } from '../utils/consts';

const pageName = 'Linie produkcyjne';

const Lines = () => {
  const [search, setSearch] = useState('');
  const [lines, setLines] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);

  useEffect(() => {
    fetch(URL_PRODLINES, {
      headers: HEADERS,
      mode: 'cors',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setLines(data.collection);
      });
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

  const onClear = () => {
    setSearch('');
  };

  return (
    <Layout pageName={pageName} firstPage={true}>
      <SearchBox search={search} onChange={onChange} onClear={onClear} />
      <LineList filteredLines={filteredLines} />
    </Layout>
  );
};

export default Lines;
