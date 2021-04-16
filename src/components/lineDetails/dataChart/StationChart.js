import React from 'react';
import { DataChart } from 'grommet';

const series = ['min', 'max', 'avg', 'med'];

const charts = [
  {
    property: 'min',
    type: 'bar',
    color: 'blue',
    thickness: 'large',
  },
  {
    property: 'max',
    type: 'bar',
    color: 'grey',
    thickness: 'large',
  },
  {
    property: 'avg',
    type: 'bar',
    color: 'green',
    thickness: 'large',
  },
  {
    property: 'med',
    type: 'bar',
    color: 'orange',
    thickness: 'large',
  },
];

const StationChart = ({ data }) => {
  const singleData = data[0];

  const destructure = (object) => {
    const { min, max, avg, med } = object;
    const array = [{ min: min }, { max: max }, { avg: avg }, { med: med }];
    return array;
  };

  const single = destructure(singleData);

  console.log(single);

  return (
    <DataChart
      data={single}
      series={series}
      chart={charts}
      axis={{ y: { property: 'value', granularity: 'fine', sufix: 's' } }}
      legend
      guide={{ y: { granularity: 'fine' } }}
    />
  );
};

export default StationChart;
