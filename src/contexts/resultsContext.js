import React, { createContext, useState } from 'react';

import { HEADERS, URL_BALANCING } from '../utils/consts';

export const ResultsContext = createContext();

const ResultsContextProvider = (props) => {
  const [] = useState()
  return (
    <ResultsContext.Provider value={{}}>
      {props.children}
    </ResultsContext.Provider>
  );
};

export default ResultsContextProvider;
