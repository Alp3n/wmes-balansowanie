import React from 'react';
import { Text, Box, Button } from 'grommet';

import strings from '../../../utils/strings.json';

import Modal from '../../Modal';

const {
  MODAL_DELETE_question,
  MODAL_DELETE_delete,
  MODAL_DELETE_cancel,
} = strings.modal;

const DeleteModal = ({ handleYes, handleNo, id }) => {
  return (
    <Modal>
      <Text weight='bold' size='large' alignSelf='center'>
        {MODAL_DELETE_question}
      </Text>
      <Box direction='row' justify='between' align='center'>
        <Button
          primary
          label={MODAL_DELETE_delete}
          onClick={() => handleYes(id)}
        />
        <Button size='medium' label={MODAL_DELETE_cancel} onClick={handleNo} />
      </Box>
    </Modal>
  );
};

export default DeleteModal;
