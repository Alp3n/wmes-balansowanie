import React from 'react';
import styled from 'styled-components';

const RecordButton = ({ onClick, color, status }) => {
  return (
    <StyledOutside onClick={onClick} color={color}>
      <StyledInside status={status} />
    </StyledOutside>
  );
};

export default RecordButton;

const StyledOutside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.color};
  height: 64px;
  width: 64px;
  border-radius: 100%;
`;

const StyledInside = styled.div`
  position: absolute;
  background-color: ${(props) => props.color};
  border: 2px solid
    ${(props) => (props.status === 'recording' ? '#fff' : '#ccc')};
  height: 54px;
  width: 54px;
  border-radius: 100%;
`;
