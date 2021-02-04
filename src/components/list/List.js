import React from 'react';

import { Box, InfiniteScroll } from 'grommet';
import ListCard from './ListCard';

//TODO Lazy load step 15 on scroll load more

const List = ({ filteredLines }) => {
  return (
    <Box overflow='auto' height='100%'>
      <InfiniteScroll items={filteredLines}>
        {(item, index) => <ListCard item={item} index={index} key={index} />}
      </InfiniteScroll>
    </Box>
  );
};

export default List;
