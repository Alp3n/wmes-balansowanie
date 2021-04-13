import React, { createContext, useState } from 'react';

import { lightTheme, darkTheme } from '../myTheme';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  // const isDark = window.matchMedia('(prefers-color-scheme: dark)');
  // isDark.onChange((event) => {
  //   event.matches(); // true or false
  // });

  const [myTheme, setMyTheme] = useState(lightTheme);

  const handleLightTheme = () => {
    setMyTheme((prevState) => ({
      ...prevState,
      ...lightTheme,
    }));
  };

  const handleDarkTheme = () => {
    setMyTheme((prevState) => ({
      ...prevState,
      ...darkTheme,
    }));
  };

  return (
    <ThemeContext.Provider
      value={{ myTheme, handleDarkTheme, handleLightTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
