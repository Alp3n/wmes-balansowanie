import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, TextArea, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';
import { LineContext } from '../../contexts/lineContext';

const Comment = ({ stationId }) => {
  const { handlePut, filterStation, editStation } = useContext(LineContext);
  const filteredStation = filterStation(stationId);

  const [value, setValue] = useState('');
  const [putData, setPutData] = useState({
    ...filteredStation,
    comment: '',
    isCommentSub: false,
  });

  const responseId = filteredStation.responseId;
  const textArea = useRef(null);

  const handleCommentEdit = () => {
    editStation(stationId, { isCommentSub: false });
    setPutData((prevState) => ({
      ...prevState,
      isCommentSub: false,
    }));
    textArea.current.focus();
  };

  useEffect(() => {
    setPutData((prevState) => ({
      ...prevState,
      comment: value,
    }));
  }, [value]);

  console.log(putData);

  return (
    <>
      <Box
        background='white'
        margin={{ vertical: 'small' }}
        pad={{ vertical: 'small' }}
        height='small'
        border={{ vertical: 'small', color: 'light-4' }}
      >
        <Box direction='row' align='center' justify='between'>
          <Text
            margin={{ vertical: 'medium', horizontal: 'small' }}
            weight='bold'
            size='large'
          >
            Komentarz
          </Text>
          {filteredStation?.isCommentSub && (
            <Button
              icon={<Edit color='signifyGreen' />}
              onClick={() => handleCommentEdit()}
            />
          )}
        </Box>
        <TextArea
          placeholder={'Wpisz komentarz...'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          resize={false}
          fill
          plain
          ref={textArea}
        />
      </Box>
      {filteredStation?.isCommentSub ? null : (
        <Button
          label='Zatwierdź komentarz'
          primary
          color='signifyGreen'
          margin={{ horizontal: 'small', bottom: 'small' }}
          size='large'
          onClick={() => handlePut(stationId, responseId, putData)}
        />
      )}
    </>
  );
};
export default Comment;
