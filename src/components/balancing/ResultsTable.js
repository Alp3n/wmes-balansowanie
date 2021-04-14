import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from 'grommet';
import data from './data.json';

/* 
station: 'St.' ,
startedAt: 'Czas rozpoczęcia' ,
duration: 'Czas trwania' ,
stt: '%TT' ,
comment: 'Komentarz' ,
actions: 'Akcje' , 
*/

// Columns titles for the table

const dateFormatter = (ISOstring) => {
  return ISOstring.replace(/T.*/, '').split('-').reverse().join('-');
};

const timeFormatter = (ISOstring) => {
  return ISOstring.slice(11, 19);
};

const durationFormatter = (duration) => {
  return duration.toString().split('.')[0] + 's';
};

const headerData = [
  { property: 'station', label: 'St.' },
  {
    property: 'startedAt',
    label: 'Czas rozpoczęcia',
    scope: 'row',
    format: (datum) => (
      <span>
        {dateFormatter(datum.startedAt)} {timeFormatter(datum.startedAt)}
      </span>
    ),
  },
  {
    property: 'd',
    label: 'Czas trwania',
    format: (datum) => durationFormatter(datum.d),
  },
  { property: 'stt', label: '%TT' },
  // { property: 'comment', label: 'Komentarz' },
  // { property: 'action', label: 'Akcje' },
];

// TODO Add headerData and Data for params
const ResultsTable = () => {
  const [tableData, setTableData] = useState(data.collection);

  console.log(tableData);
  return (
    <Box style={{ overflow: 'auto' }}>
      <Table>
        <TableHeader>
          {headerData.map((c) => (
            <TableCell key={c.key} scope='col' align='center'>
              <Text>{c.label}</Text>
            </TableCell>
          ))}
        </TableHeader>
        <TableBody>
          {tableData.map((data) => (
            <TableRow key={data._id}>
              {headerData.map((c) => (
                <TableCell key={c.property} scope={c.scope} align='center'>
                  <Text>{c.format ? c.format(data) : data[c.property]}</Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ResultsTable;
