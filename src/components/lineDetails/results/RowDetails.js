import React from 'react';
import { Box, Text } from 'grommet';
import strings from '../../../utils/strings';

import EditableInput from '../../EditableInput';

const {
  BALANCING_station,
  BALANCING_startTime,
  BALANCING_duration,
  BALANCING_tt,
  BALANCING_comment,
} = strings.balancing;

const RowDetails = ({ station, startedAt, d, comment, tt, _id }) => {
  // stationId, responseId, comment

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

      {/* <Text weight='bold'>{BALANCING_comment}</Text>
      <Text>{comment}</Text> */}
      <EditableInput
        title={BALANCING_comment}
        comment={comment}
        _id={_id}
        station={station}
      />
    </Box>
  );
};

export default RowDetails;
