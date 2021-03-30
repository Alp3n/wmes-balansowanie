// eslint-disable-next-line no-unused-vars
import React from 'react';

export const Case = ({ children, value }) => {
  return children;
};

export const SwitchCase = (props) => {
  const { test, children } = props;

  return children.find((child) => {
    return child.props.value === test;
  });
};
