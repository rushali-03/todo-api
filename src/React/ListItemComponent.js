import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LoadingButton } from "@mui/lab";

import '../App.css'

function ListItemComponent(props) {
  const [disabledDelete, setDisabledDelete] = useState(false);
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);
  return <ListItem
    key={props.task._id}
    secondaryAction={
      < LoadingButton
        edge='end'
        onClick={() => props.handleOnDeleteTask(props.task, setDisabledDelete)}
        disabled={disabledDelete}
        loading={props.loadingDeleteBtn}
        variant="outlined"
      >
        <CloseIcon />
      </LoadingButton >
    }
    disablePadding
  >
    <ListItemButton role={undefined} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          disableRipple
          onClick={() => props.handleOnCheckBoxClick(props.task, setDisabledCheckbox)}
          checked={props.task.completed}
          disabled={disabledCheckbox}
        />
      </ListItemIcon>
      <ListItemText id={props.task._id} primary={props.task.description} />
    </ListItemButton>
  </ListItem >
}

export default ListItemComponent