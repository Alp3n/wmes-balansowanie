import React from 'react';

import { Box, InfiniteScroll } from 'grommet';
import LineCard from './LineCard';

const LineList = ({ filteredLines }) => {
  return (
    <Box
      overflow='auto'
      height='100%'
      pad={{ vertical: 'medium' }}
      style={{ position: 'relative', top: '72px' }}
    >
      <InfiniteScroll items={filteredLines}>
        {(item) => <LineCard line={item} key={item._id} />}
      </InfiniteScroll>
    </Box>
  );
};

export default LineList;
