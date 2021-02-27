import React from 'react';

import { Box, InfiniteScroll } from 'grommet';
import LineCard from './LineCard';

//TODO Lazy load step 15 on scroll load more

const LineList = ({ filteredLines }) => {
  return (
    <Box overflow='auto' height='100%' margin={{ vertical: 'medium' }}>
      <InfiniteScroll items={filteredLines}>
        {(item) => <LineCard line={item} key={item._id} />}
      </InfiniteScroll>
    </Box>
  );
};

export default LineList;
