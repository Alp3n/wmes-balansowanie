import React, { useMemo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { lightTheme } from '../../../myTheme';
import { Chart } from 'react-charts';
import { ResizableBox } from 'react-resizable';

import { useFetch } from '../../../hooks/useFetch';
import { LineContext } from '../../../contexts/lineContext';

import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';

import LabelWithRadial from './LabelWithRadial';
import Loading from '../../Loading';

const legendData = [
  { label: 'Minimum', color: 'chart-blue' },
  { label: 'Maksimum', color: 'chart-gray' },
  { label: 'Średnia', color: 'chart-green' },
  { label: 'Mediana', color: 'chart-orange' },
  { label: 'Takt Time', color: 'chart-purple' },
];

const ReactChart = ({ firstDate, secondDate }) => {
  const [state, setState] = useState();
  const { lineData } = useContext(LineContext);
  const { orderId } = lineData;
  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);

  const { status, data } = useFetch(URL_FETCH);

  // Formating data from fetch to match chart data model
  useEffect(() => {
    const myValues = [
      { label: 'Minimum', short: 'min' },
      { label: 'Maksimum', short: 'max' },
      { label: 'Średnia', short: 'avg' },
      { label: 'Mediana', short: 'med' },
      { label: 'TaktTime', short: 'stt' },
    ];

    const reshapeArray = (array, values) => {
      let reshapedArray = values.map((v, i) => {
        return {
          label: v.label,
          data: array.map((a) => ({
            primary: a.no === 0 ? 'Wszystkie' : `ST-${a.no}`,
            secondary: a[v.short],
          })),
        };
      });

      return reshapedArray;
    };

    if (status === 'fetched') {
      const array = reshapeArray(data.stations, myValues);
      return setState(array);
    }
  }, [data.stations, status]);

  const datas = useMemo(() => state, [state]);

  // Axes values for the chart
  const axes = useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      {
        type: 'linear',
        position: 'left',
        min: 500,
        format: (s) => `${s}s`,
      },
    ],
    []
  );

  // Series values for the chart
  const series = React.useCallback(
    (s) => ({
      type: s.label === 'TaktTime' ? 'line' : 'bar',
    }),
    []
  );

  // Series styles values for the chart
  const getSeriesStyle = React.useCallback(
    (s) => ({
      color:
        s.label === 'TaktTime'
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

  return status === 'fetching' ? (
    <Loading />
  ) : (
    <Box pad={{ top: 'large' }} background='white'>
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

      {/* LEGEND */}
      <Box
        direction='row'
        margin={{ top: 'small' }}
        pad='small'
        border={{ side: 'horizontal' }}
        justify='center'
      >
        {legendData.map((item) => (
          <LabelWithRadial
            key={item.label}
            color={item.color}
            label={item.label}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReactChart;

const StyledResizable = styled(ResizableBox)`
  margin: 3%;
  align-items: center;
  background: white;
`;
