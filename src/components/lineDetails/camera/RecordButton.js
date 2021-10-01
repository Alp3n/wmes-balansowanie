import React from 'react';
import styled from 'styled-components';

const RecordButton = ({ onClick, color }) => {
  return (
    <StyledOutside onClick={onClick} color={color}>
      <StyledInside />
    </StyledOutside>
  );
};

export default RecordButton;

const StyledOutside = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  height: 64px;
  width: 64px;
  border-radius: 100%;
  grid-area: rec;
  z-index: 999 !important;
`;

const StyledInside = styled.div`
  position: absolute;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => (props.color === 'red' ? '#fff' : '#ccc')};
  height: 54px;
  width: 54px;
  border-radius: 100%;
  z-index: 1111 !important;
`;
