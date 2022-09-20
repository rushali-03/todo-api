import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import GetSubmitLoadingButton from '../shared/GetSubmitLoadingButton'
import ModeButtonGroup from '../shared/ModeButtonGroup';
import getAllTasks from '../../api/getAllTasks';
import addTask from '../../api/addTask';

function AddTasks(props) {
  const [disabledGetTasksBtn, setDisabledGetTasksBtn] = useState(false);
  const [loadingGetTasksBtn, setLoadingGetTasksBtn] = useState(false);
  const [loadingAllTasks, setLoadingAllTasks] = useState(false);
  const [loadingActiveTasks, setLoadingActiveTasks] = useState(false);
  const [loadingCompletedTasks, setLoadingCompletedTasks] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = async (setTasks) => {
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
    setDisabledGetTasksBtn(current => !current);
  }

  const handleOnAddTask = async (setTasks) => {
    await addTask({ description });
    setDescription('');
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnAllClick = async (setTasks) => {
    const newTasks = await getAllTasks(setLoadingAllTasks, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnActiveClick = async (setTasks) => {
    const newTasks = await getAllTasks(setLoadingActiveTasks, 'active');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnCompletedClick = async (setTasks) => {
    const newTasks = await getAllTasks(setLoadingCompletedTasks, 'completed');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOnAddTask(props.setTasks);
    }
  };

  return <>
    <GetSubmitLoadingButton
      handleOnGetSubmit={() => handleSubmit(props.setTasks)}
      loading={loadingGetTasksBtn}
      buttonText='Get Your Tasks'
      disabled={disabledGetTasksBtn}
    />
    <TextField
      margin='dense'
      value={description}
      id="filled-basic"
      label="Add Task"
      variant="outlined"
      onChange={e => setDescription(e.target.value)}
      onKeyDown={onKeyDown}
      fullWidth />
    <ModeButtonGroup
      handleOnAllClick={() => handleOnAllClick(props.setTasks)}
      handleOnActiveClick={() => handleOnActiveClick(props.setTasks)}
      handleOnCompletedClick={() => handleOnCompletedClick(props.setTasks)}
      loadingAllTasks={loadingAllTasks}
      loadingActiveTasks={loadingActiveTasks}
      loadingCompletedTasks={loadingCompletedTasks}
    />
  </>
}
export default AddTasks;