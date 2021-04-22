import { useState, useEffect } from 'react';
import { calcs } from 'grommet';

export const useCalcs = (array, status) => {
  const [calcsValues, setCalcsValues] = useState();

  useEffect(() => {
    const coarseness = 3;
    const steps = [1, 5];

    if (status === 'fetched') {
      const findMax = (array, att) => {
        return Math.max.apply(
          Math,
          array?.map((st) => st[att])
        );
      };

      const findMin = (array, att) => {
        return Math.min.apply(
          Math,
          array?.map((st) => st[att])
        );
      };

      const values = [
        {
          value: [0, findMin(array, 'min'), findMax(array, 'min')],
        },
        {
          value: [1, findMin(array, 'max'), findMax(array, 'max')],
        },
        {
          value: [2, findMin(array, 'avg'), findMax(array, 'avg')],
        },
        {
          value: [3, findMin(array, 'med'), findMax(array, 'med')],
        },
        {
          value: [4, findMin(array, 'stt'), findMax(array, 'stt')],
        },
      ];

      const { axis, bounds } = calcs(values, {
        coarseness,
        steps,
      });

      const xAxis = axis[0];
      const yAxis = axis[1];

      setCalcsValues({ xAxis, yAxis, bounds, values });
    }
  }, [array, status]);

  return { calcsValues };
};
