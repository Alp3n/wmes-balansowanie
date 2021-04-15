import React from 'react';
import { Box, DataTable, Text } from 'grommet';

import RowDetails from './RowDetails';

import strings from '../../../utils/strings.json';

// Formating two ISOstrings to get difference in time MM-SS
import { durationFormatter } from '../../../functions/functions';

const {
  BALANCING_station,
  BALANCING_duration,
  BALANCING_startTime,
} = strings.balancing;

// Formating ISOstring date to DD-MM-YYYY
const dateFormatter = (ISOstring) => {
  return ISOstring.replace(/T.*/, '').split('-').reverse().join('-');
};

// Extracting time from ISOstring date to HH:MM:SS
const timeFormatter = (ISOstring) => {
  return ISOstring.slice(11, 19);
};

const headerData = [
  {
    property: 'station',
    header: <Text weight='bold'>{BALANCING_station}</Text>,
  },
  {
    property: 'startedAt',
    header: <Text weight='bold'>{BALANCING_startTime}</Text>,
    scope: 'row',
    render: (datum) => (
      <span>
        {dateFormatter(datum.startedAt)} {timeFormatter(datum.startedAt)}
      </span>
    ),
  },
  {
    property: 'd',
    header: <Text weight='bold'>{BALANCING_duration}</Text>,
    render: (datum) => durationFormatter(datum.d),
  },
];

// TODO Add headerData and Data for params
const ResultsTable = ({ data }) => {
  console.log(data);
  return (
    <Box style={{ overflow: 'auto' }}>
      <DataTable
        columns={headerData.map((c) => ({
          ...c,
          align: 'center',
        }))}
        data={data}
        rowDetails={(row) => {
          return (
            <RowDetails
              station={row.station}
              startedAt={`${dateFormatter(row.startedAt)}, ${timeFormatter(
                row.startedAt
              )}`}
              comment={row.comment}
              d={durationFormatter(row.d)}
              tt={`${row.stt}%`}
              _id={row._id}
            />
          );
        }}
        primaryKey={false}
      />
    </Box>
  );
};

export default ResultsTable;
