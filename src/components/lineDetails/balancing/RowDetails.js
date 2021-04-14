import React from 'react';
import { Box, Text } from 'grommet';
import strings from '../../../utils/strings';

const {
  BALANCING_station,
  BALANCING_startTime,
  BALANCING_duration,
  BALANCING_tt,
  BALANCING_comment,
} = strings.balancing;

const RowDetails = ({ station, startedAt, d, comment, tt }) => {
  return (
    <Box gap='xsmall'>
      <Text weight='bold'>{BALANCING_station}</Text>
      <Text>{station}</Text>
      <Text weight='bold'>{BALANCING_startTime}</Text>
      <Text>{startedAt}</Text>
      <Text weight='bold'>{BALANCING_duration}</Text>
      <Text>{d}</Text>
      <Text weight='bold'>{BALANCING_tt}</Text>
      <Text>{tt}</Text>
      <Text weight='bold'>{BALANCING_comment}</Text>
      <Text>{comment}</Text>
    </Box>
  );
};

export default RowDetails;
