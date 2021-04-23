import React, { useMemo, useContext, useEffect, useState } from 'react';
import { Box } from 'grommet';

import { lightTheme } from '../../../myTheme';

import { Chart } from 'react-charts';
import { ResizableBox } from 'react-resizable';

import { useFetch } from '../../../hooks/useFetch';
import { LineContext } from '../../../contexts/lineContext';

import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';
import styled from 'styled-components';

const myData = [
  {
    label: 'Minimum',
    data: [
      { primary: '1', secondary: 4 },
      { primary: '2', secondary: 200 },
      { primary: '3', secondary: 100 },
      { primary: '4', secondary: 60 },
      { primary: '5', secondary: 400 },
      { primary: '6', secondary: 400 },
      { primary: 'All', secondary: 300 },
    ],
  },
  {
    label: 'Maksimum',
    data: [
      { primary: '1', secondary: 200 },
      { primary: '2', secondary: 230 },
      { primary: '3', secondary: 120 },
      { primary: '4', secondary: 60 },
      { primary: '5', secondary: 444 },
      { primary: '6', secondary: 400 },
      { primary: 'All', secondary: 300 },
    ],
  },
  {
    label: 'Średnia',
    data: [
      { primary: '1', secondary: 200 },
      { primary: '2', secondary: 230 },
      { primary: '3', secondary: 120 },
      { primary: '4', secondary: 60 },
      { primary: '5', secondary: 444 },
      { primary: '6', secondary: 400 },
      { primary: 'All', secondary: 300 },
    ],
  },
  {
    label: 'Mediana',
    data: [
      { primary: '1', secondary: 200 },
      { primary: '2', secondary: 230 },
      { primary: '3', secondary: 120 },
      { primary: '4', secondary: 60 },
      { primary: '5', secondary: 444 },
      { primary: '6', secondary: 400 },
      { primary: 'All', secondary: 300 },
    ],
  },
  {
    label: 'Takt Time',
    color: 'red',
    data: [
      { primary: '1', secondary: 450 },
      { primary: '2', secondary: 450 },
      { primary: '3', secondary: 450 },
      { primary: '4', secondary: 450 },
      { primary: '5', secondary: 450 },
      { primary: '6', secondary: 450 },
      { primary: 'All', secondary: 450 },
    ],
  },
];

const ReactChart = ({ firstDate, secondDate }) => {
  const [state, setState] = useState();
  const { lineData } = useContext(LineContext);
  const { orderId } = lineData;
  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);

  const { status, data } = useFetch(URL_FETCH);

  // return {
  //   primary: (object.no + 1).toString(),
  //   secondary: object[values],
  // };

  useEffect(() => {
    const myValues = [
      { label: 'Minimum', short: 'min' },
      { label: 'Maksimum', short: 'max' },
      { label: 'Średnia', short: 'avg' },
      { label: 'Mediana', short: 'med' },
      { label: 'TaktTime', short: 'stt' },
    ];

    const reshapeArray = (array, values) => {
      let reshapedArray = [];

      let label;
      let data = [];

      values.forEach(
        (value) => (
          {
            label: value.long,
            data: [
              array.forEach(
                (object) => (
                  console.log(object.no, object[value.short]),
                  {
                    primary: object.no,
                    secondary: object[value.short],
                  }
                )
              ),
            ],
          },
          console.log()
          // TODO PUSH
        )
      );

      return reshapedArray;
    };

    if (status === 'fetched') {
      const array = reshapeArray(data.stations, myValues);
      return setState(array);
    }
  }, [data.stations, status]);

  // console.log('STATE', state);

  const datas = useMemo(() => myData, []);

  const axes = useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  const series = React.useCallback(
    (s, i) => ({
      type: i === 4 ? 'line' : 'bar',
    }),
    []
  );

  const getSeriesStyle = React.useCallback(
    (s) => ({
      color:
        s.label === 'Takt Time'
          ? lightTheme.global.colors['chart-purple']
          : s.label === 'Minimum'
          ? lightTheme.global.colors['chart-blue']
          : s.label === 'Maksimum'
          ? lightTheme.global.colors['chart-gray']
          : s.label === 'Średnia'
          ? lightTheme.global.colors['chart-green']
          : s.label === 'Mediana'
          ? lightTheme.global.colors['chart-orange']
          : null,
    }),
    []
  );

  return (
    <StyledResizable
      height={300}
      minConstraints={[200, 200]}
      maxConstraints={[400, 400]}
    >
      {datas !== undefined && (
        <Chart
          axes={axes}
          data={datas}
          series={series}
          tooltip
          getSeriesStyle={getSeriesStyle}
        />
      )}
    </StyledResizable>
  );
};

export default ReactChart;

const StyledResizable = styled(ResizableBox)`
  margin: 3%;
  overflow: hidden;
  align-items: center;
  /* padding: 3%; */
`;
