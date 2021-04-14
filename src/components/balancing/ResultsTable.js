import React, { useState } from 'react';
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
const headerData = [
  { key: 1, label: 'St.' },
  { key: 2, label: 'Czas rozpoczęcia' },
  { key: 3, label: 'Czas trwania' },
  { key: 4, label: '%TT' },
  { key: 5, label: 'Komentarz' },
  { key: 6, label: 'Akcje' },
];

// TODO Add headerData and Data for params
const ResultsTable = () => {

  return (
    <Box>
      <Table>
        <TableHeader>
          {headerData.map((col) => (
            <TableCell key={col.key} scope='col' align='center'>
              <Text>{col.label}</Text>
            </TableCell>
          ))}
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </Box>
  );
};

export default ResultsTable;
