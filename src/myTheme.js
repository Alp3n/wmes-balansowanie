import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const brandGradient =
  'linear-gradient(45deg, rgba(0,230,150,1) 0%, rgba(30,200,210,1) 100%)';

export const lightTheme = deepMerge(grommet, {
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
      'chart-blue': '#7cb5ec',
      'chart-gray': 'light-4',
      'chart-green': '#90ed7d',
      'chart-orange': '#f7a35c',
      'chart-purple': '#8085e9',
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
  tabs: {
    pad: 'none',
    header: {
      background: 'signifyDark',
    },
  },
  tab: {
    pad: 'small',
  },
  table: {
    background: 'background',
    extend: () => `
      tbody > tr > td:nth-child(1) > button {
      padding: 16px 6px;
    }`,
    header: {
      border: 'bottom',
      background: 'white',
    },
    body: {
      border: 'bottom',
      background: 'white',
    },
  },
});

export const darkTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: 'signifyGreen',
      focus: 'signifyGreen',
      selected: 'signifyGreen',
      background: '#000000',
      signifyGreen: '#00E696',
      signifyBlue: '#1EC8D2',
      signifyGradient: brandGradient,
      signifyDark: '#3C3C41',
      white: '#303030',
    },
  },
});
