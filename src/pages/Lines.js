import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';
import LineList from '../components/lineList/LineList';
import Loading from '../components/Loading';

import strings from '../utils/strings.json';
import { URL_PRODLINES } from '../utils/consts';
import { useFetch, STATUS_TYPES } from '../hooks/useFetch';
import ErrorMsg from '../components/ErrorMsg';

const {
  LINES_title,
  LINES_search,
  LINES_loading,
  LINES_error,
} = strings.linesPage;

const Lines = () => {
  const [search, setSearch] = useState('');
  const [filteredLines, setFilteredLines] = useState([]);

  // fetching from (URL, dependency) dependecy = true because no need for any here passing true
  const { status, data } = useFetch(URL_PRODLINES, true, {
    prepareData: (data) => {
      data.collection.forEach(
        (line) => (line.search = line._id.replace(/[^a-zA-Z0-9]+/g, ''))
      );
    },
  });

  useEffect(() => {
    if (status === STATUS_TYPES.fetched) {
      const phrase = search.toLowerCase();
      setFilteredLines(
        data.collection
          .filter((line) => line._id.toLowerCase().includes(phrase))
          .sort((a, b) =>
            a._id.localeCompare(b._id, undefined, {
              numeric: true,
              ignorePunctuation: true,
            })
          )
      );
    }
  }, [data.collection, search, status]);

  const onChange = (event) => {
    const { value: newValue } = event.target;
    setSearch(newValue);
  };

  const onClear = () => {
    setSearch('');
  };

  const switchRender = (status) => {
    switch (status) {
      case STATUS_TYPES.fetching:
        return <Loading text={LINES_loading} />;

      case STATUS_TYPES.fetched:
        return (
          <>
            <SearchBox
              search={search}
              text={LINES_search}
              onChange={onChange}
              onClear={onClear}
            />
            <LineList filteredLines={filteredLines} />
          </>
        );

      case STATUS_TYPES.error:
        return <ErrorMsg text={LINES_error} />;
      default:
        return;
    }
  };

  return (
    <Layout pageName={LINES_title} firstPage>
      {switchRender(status)}
    </Layout>
  );
};

export default Lines;
