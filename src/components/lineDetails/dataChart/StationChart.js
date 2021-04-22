import React from 'react';
import styled from 'styled-components';
import { Chart } from 'grommet';

const StationChart = ({ data, bounds, type, margin, onClick }) => {
  const pointValues = [
    { value: [0, data.stt], color: 'chart-purple', label: 'stt' },
  ];

  const barValues = [
    { value: [0, data.min], label: 'Minimum', color: 'chart-blue' },
    { value: [1, data.max], label: 'Maksimum', color: 'chart-gray' },
    { value: [2, data.avg], label: 'Średnia', color: 'chart-green' },
    { value: [3, data.med], label: 'Mediana', color: 'chart-orange' },
    { value: [999, data.stt], label: 'Takt Time', color: 'chart-purple' },
  ];

  const switchValues = () => {
    switch (type) {
      case 'point':
        return pointValues;
      case 'bar':
        return barValues;
      default:
        break;
    }
  };

  return (
    <StyledChart
      animate
      type={type}
      bounds={bounds}
      values={switchValues(type)}
      size={{ width: '30px' }}
      thickness='xsmall'
      pad={{ horizontal: type === 'point' && 'small' }}
      round={type === 'point' && true}
      onClick={() => onClick(barValues)}
    />
  );
};

export default StationChart;

const StyledChart = styled(Chart)`
  align-items: center;
  justify-content: center;
  justify-items: center;
`;
