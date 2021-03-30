import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import SearchBox from '../components/SearchBox';
import LineList from '../components/list/LineList';
import Loading from '../components/loading/Loading';

import strings from '../data/strings.json';
import {
  URL_PRODLINES,
  // HEADERS
} from '../utils/consts';
import { useFetch, STATUS_TYPES } from '../hooks/useFetch';
import ErrorMsg from '../components/error/Error';

const {
  LINES_title,
  LINES_search,
  LINES_loading,
  LINES_error,
} = strings.linesPage;

const Lines = () => {
  const [search, setSearch] = useState('');
  const [filteredLines, setFilteredLines] = useState([]);

  const { status, data } = useFetch(URL_PRODLINES);

  useEffect(() => {
    if (status === STATUS_TYPES.fetched) {
      setFilteredLines(
        data.collection.filter((line) =>
          line._id.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [status, data, search]);

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
