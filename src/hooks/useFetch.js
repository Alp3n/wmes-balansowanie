import { useEffect, useState } from 'react';
import { HEADERS } from '../utils/consts';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  empty: 'empty',
  error: 'error',
};

export const ORDER_TYPES = {
  same: 'same',
  new: 'new',
  empty: 'empty',
  error: 'error',
};

export const useFetch = (url, dependency) => {
  const [status, setStatus] = useState(STATUS_TYPES.idle); //idle, fetching, fetched, empty, error
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) {
      console.log('BRAK URL');
      return;
    }

    if (dependency === null) {
      // EMPTY DEPENDENCY = EXPECT NULL;
      return setStatus(STATUS_TYPES.empty);
    }

    const fetchData = async () => {
      setStatus(STATUS_TYPES.fetching);

      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers: HEADERS,
          mode: 'cors',
        });
        const data = await response.json();

        setData(data);
        setStatus('fetched');
      } catch (err) {
        console.log(err);
        setStatus(STATUS_TYPES.error);
      }
    };

    if (dependency !== null) {
      return fetchData();
    }
  }, [url, dependency]);

  return { status, data };
};
