import React from 'react';
import styled from 'styled-components';

import { lightTheme } from '../../../myTheme';

const Marker = ({ index, time, goToValue }) => {
  return (
    <StyledMarker time={time} index={index} onClick={() => goToValue(time)} />
  );
};

const StyledMarker = styled.i`
  position: relative;
  left: calc(${(props) => props.time}% - ${(props) => props.index} * 6px - 3px);
  width: 6px;
  background-color: ${lightTheme.global.colors.signifyOrange};
  z-index: 999 !important;
`;

const ProgressBar = ({ markers, goToValue, value }) => {
  return (
    <StyledProgress>
      {markers?.map((marker, i) => (
        <Marker
          key={marker.id}
          index={i}
          time={marker.time}
          onClick={goToValue}
        />
      ))}
      <StyledDone done={value} />
    </StyledProgress>
  );
};

export default ProgressBar;

const StyledProgress = styled.div`
  position: relative;
  display: flex;
  height: 24px;
  width: 100%;
  background-color: white;
  /* background-color: ${lightTheme.global.colors.signifyDark}; */
  z-index: 1;
`;

const StyledDone = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 0;
  height: inherit;
  justify-self: flex-start;
  width: ${(props) => props.done}%;
  background-color: ${lightTheme.global.colors.signifyGreen};
  z-index: 2;
`;
