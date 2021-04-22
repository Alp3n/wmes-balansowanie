import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { Trash } from 'grommet-icons';

import strings from '../../../utils/strings';
import { LineContext } from '../../../contexts/lineContext';
import { ModalContext } from '../../../contexts/modalContext';

import EditableInput from '../../EditableInput';
import DeleteModal from './DeleteModal';

const {
  BALANCING_station,
  BALANCING_startTime,
  BALANCING_duration,
  BALANCING_tt,
  BALANCING_comment,
  BALANCING_line,
} = strings.balancing;

const RowDetails = ({
  line,
  station,
  startedAt,
  d,
  comment,
  tt,
  _id,
  action,
}) => {
  const { handleDelete } = useContext(LineContext);
  const { openModal, closeModal } = useContext(ModalContext);

  const handleDeletion = (_id) => {
    handleDelete(_id);
    closeModal();
    action(_id);
  };

  const handleModal = (_id) => {
    openModal(
      <DeleteModal handleYes={handleDeletion} handleNo={closeModal} id={_id} />
    );
  };

  return (
    <Box gap='xsmall'>
      <Box direction='row' justify='between'>
        <Box>
          <Text weight='bold'>{BALANCING_line}</Text>
          <Text>{line}</Text>
        </Box>
        <Box>
          <Button
            icon={<Trash color='signifyGreen' />}
            onClick={() => handleModal(_id)}
          />
        </Box>
      </Box>

      <Text weight='bold'>{BALANCING_station}</Text>
      <Text>{station}</Text>

      <Text weight='bold'>{BALANCING_startTime}</Text>
      <Text>{startedAt}</Text>

      <Text weight='bold'>{BALANCING_duration}</Text>
      <Text>{d}</Text>

      <Text weight='bold'>{BALANCING_tt}</Text>
      <Text>{tt}</Text>

      <EditableInput
        title={BALANCING_comment}
        comment={comment}
        _id={_id}
        station={station}
        setEdited={action}
      />
    </Box>
  );
};

export default RowDetails;
