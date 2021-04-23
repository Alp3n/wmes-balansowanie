import React, { useContext, useState } from 'react';
import { Box, Chart, Stack, Text } from 'grommet';

import { URL_BALANCING, PARAMS_BALANCING } from '../../../utils/consts';
import { useFetch } from '../../../hooks/useFetch';
import { useCalcs } from '../../../hooks/useCalcs';

import { LineContext } from '../../../contexts/lineContext';
import Loading from '../../Loading';
import StationChart from './StationChart';
import LabelWithRadial from './LabelWithRadial';

const legendData = [
  { label: 'Minimum', color: 'chart-blue' },
  { label: 'Maksimum', color: 'chart-gray' },
  { label: 'Średnia', color: 'chart-green' },
  { label: 'Mediana', color: 'chart-orange' },
  { label: 'Takt Time', color: 'chart-purple' },
];

const NewOrderChart = ({ firstDate, secondDate }) => {
  const [stationDetails, setStationDetails] = useState();
  const { lineData } = useContext(LineContext);
  const { orderId } = lineData;
  const URL_FETCH =
    URL_BALANCING + PARAMS_BALANCING(firstDate, secondDate, orderId);

  // Fetch hook
  const { status, data } = useFetch(URL_FETCH);

  // Calcs hook from grommet, help assign bounds, axis, values etc
  const { calcsValues } = useCalcs(data.stations, status);

  const switchRender = (status) => {
    switch (status) {
      case 'fetching':
        return <Loading />;
      case 'fetched':
        const lineValues = data.stations.map((st, index) => {
          return { value: [index, st.stt] };
        });
        console.log(data);
        return data.stations.length === 1 ? (
          <Box align='center' margin='large'>
            <Text weight='bold'>Brak danych</Text>
          </Box>
        ) : (
          <>
            <Box background='white' pad={{ top: 'large' }}>
              <Stack guidingChild='last'>
                {/* BOUNDS CHART */}
                <Box fill justify='between'>
                  {calcsValues?.yAxis.map((y, index) => {
                    const first = index === 0;
                    const last =
                      index === calcsValues?.yAxis?.length - 1 && !first;
                    let align;
                    if (first) {
                      align = 'start';
                    } else if (last) {
                      align = 'end';
                    } else {
                      align = 'center';
                    }

                    return (
                      <Box key={y} direction='row' align={align}>
                        <Box pad={{ horizontal: 'small' }}>
                          <Text>{y}</Text>
                        </Box>
                        <Box border='top' flex />
                      </Box>
                    );
                  })}
                </Box>

                {/* TAKT TIME CHART POINTS */}
                <Box
                  fill
                  direction='row'
                  justify='evenly'
                  pad={{ left: 'xlarge' }}
                >
                  {data.stations[0].avg !== null &&
                    data.stations.map((station, index) => (
                      <StationChart
                        type='point'
                        values={station}
                        key={station.no}
                        data={station}
                        bounds={calcsValues?.bounds}
                        margin={
                          index === data.stations.length - 1 ? null : 'small'
                        }
                      />
                    ))}
                </Box>

                {/* TAKT TIME LINE */}
                <Box fill align='stretch'>
                  <Chart
                    pad={{ horizontal: 'large' }}
                    type='line'
                    values={lineValues}
                    thickness='xsmall'
                    bounds={calcsValues?.bounds}
                    opacity='medium'
                    color='chart-purple'
                    round
                  />
                </Box>

                {/* STATIONS CHART */}
                <Box
                  fill
                  direction='row'
                  justify='evenly'
                  pad={{ left: 'xlarge' }}
                >
                  {data.stations[0].avg !== null &&
                    data.stations.map((station) => (
                      <StationChart
                        type='bar'
                        key={station.no}
                        data={station}
                        bounds={calcsValues?.bounds}
                        onClick={setStationDetails}
                      />
                    ))}
                </Box>
              </Stack>

              {/* xAxis labels */}
              <Box
                fill
                direction='row'
                justify='evenly'
                pad={{ left: 'xlarge' }}
              >
                {data.stations.map((x) => (
                  <Box width='30px'>
                    <Text weight='bold' size='small'>
                      {x.no === 0 ? 'All' : `ST${x.no}`}
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* LEGEND */}
              <Box
                direction='row'
                pad='xsmall'
                margin={{ top: 'large' }}
                border={{ side: 'horizontal' }}
                align='center'
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

            {/* STATION DETAILS */}
            <Box
              gap='small'
              margin={{ top: 'small' }}
              pad={{ horizontal: 'large', vertical: 'medium' }}
              justify='center'
              border={{ side: 'horizontal' }}
              background='white'
            >
              {!stationDetails ? (
                <Text alignSelf='center'>Wybierz stację</Text>
              ) : (
                stationDetails?.map((st) => {
                  return (
                    <Box direction='row' justify='between'>
                      <Box direction='row'>
                        <Box />
                        <Text weight='bold'>{st.label}</Text>
                      </Box>
                      <Text>{st.value[1]}s</Text>
                    </Box>
                  );
                })
              )}
            </Box>
          </>
        );

      default:
        break;
    }
  };

  return <Box>{switchRender(status)}</Box>;
};

export default NewOrderChart;
