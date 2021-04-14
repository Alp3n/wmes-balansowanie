import { useEffect, useState } from 'react';
import { HEADERS } from '../utils/consts';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  error: 'error',
};

export const ORDER_TYPES = {
  same: 'same',
  new: 'new',
  error: 'error',
};

export const useFetch = (url) => {
  const [status, setStatus] = useState('idle'); //idle, fetching, fetched, error
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) {
      console.log('BRAK URL');
      return;
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

        // DEV MODE
        // setTimeout(() => {
        //   setData(data);
        //   setStatus(STATUS_TYPES.fetched);
        // }, 500);

        setData(data);
        setStatus('fetched');
      } catch (err) {
        console.log(err);
        setStatus(STATUS_TYPES.error);
      }
    };

    fetchData();
  }, [url]);

  return { status, data };
};
