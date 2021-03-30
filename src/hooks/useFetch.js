import { useEffect, useState } from 'react';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
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
        const response = await fetch(url);
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
    console.log('useFetch worked');
  }, [url]);

  return { status, data };
};
