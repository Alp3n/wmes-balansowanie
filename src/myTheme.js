import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const brandGradient =
  'linear-gradient(45deg, rgba(0,230,150,1) 0%, rgba(30,200,210,1) 100%)';

export const myTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: 'signifyGreen',
      focus: 'signifyGreen',
      selected: 'signifyGreen',
      background: '#f0f0f0',
      signifyGreen: '#00E696',
      signifyBlue: '#1EC8D2',
      signifyGradient: brandGradient,
      signifyDark: '#3C3C41',
    },
    control: {
      disabled: {
        opacity: 1,
      },
    },
  },
  list: {
    item: {
      pad: { horizontal: 'large', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: true,
    },
  },
  textInput: {
    disabled: {
      opacity: 1,
    },
  },
});
