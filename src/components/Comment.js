import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, TextArea, Text, Button } from 'grommet';
import { Edit } from 'grommet-icons';
import { LineContext } from '../contexts/lineContext';
import strings from '../utils/strings.json';

const {
  COMMENT_confirmComment,
  COMMENT_comment,
  COMMENT_enterComment,
} = strings.comment;

const Comment = ({ stationId }) => {
  const { handlePut, filterStation, editStation } = useContext(LineContext);
  const filteredStation = filterStation(stationId);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(
    filteredStation?.isCommentSub ? filteredStation.comment : ''
  );
  const [putData, setPutData] = useState({
    ...filteredStation,
    comment: '',
    isCommentSub: false,
  });

  const responseId = filteredStation.responseId;
  const textArea = useRef(null);

  const handleCommentEdit = async () => {
    editStation(stationId, { isCommentSub: false });
    setPutData((prevState) => ({
      ...prevState,
      isCommentSub: false,
    }));
    await setDisabled(false);
    textArea.current.focus();
  };

  useEffect(() => {
    setPutData((prevState) => ({
      ...prevState,
      comment: value,
    }));
  }, [value]);

  console.log('PUT DATA:', putData);

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
            {COMMENT_comment}
          </Text>
          {filteredStation?.isCommentSub && (
            <Button
              icon={<Edit color='signifyGreen' />}
              onClick={() => handleCommentEdit()}
            />
          )}
        </Box>
        <TextArea
          placeholder={COMMENT_enterComment}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          resize={false}
          fill
          plain
          ref={textArea}
          disabled={disabled}
        />
      </Box>
      {filteredStation?.isCommentSub ? null : (
        <Box margin='medium' background='white' round='large'>
          <Button
            label={COMMENT_confirmComment}
            // primary
            color='signifyGreen'
            size='large'
            onClick={() =>
              handlePut(stationId, responseId, putData).then(setDisabled(true))
            }
          />
        </Box>
      )}
    </>
  );
};
export default Comment;
