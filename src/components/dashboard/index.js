import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { LoadingButton } from "@mui/lab";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import List from '@mui/material/List';

import GetSubmitLoadingButton from '../sharedFolder/GetSubmitLoadingButton'
import ListItemComponent from '../sharedFolder/ListItemComponent';
import ModeButtonGroup from '../sharedFolder/ModeButtonGroup';
import useAuthToken from '../../hooks/useAuthToken';
import getAllTasks from '../api/getAllTasks';
import updateTask from '../api/updateTask';
import deleteTask from '../api/deteleTask';
import addTask from '../api/addTask';
import '../../App.css';

function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuthToken();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [description, setDescription] = useState('');
  const [disabledGetTasksBtn, setDisabledGetTasksBtn] = useState(false);
  const [loadingGetTasksBtn, setLoadingGetTasksBtn] = useState(false);
  const [loadingAllTasks, setLoadingAllTasks] = useState(false);
  const [loadingActiveTasks, setLoadingActiveTasks] = useState(false);
  const [loadingCompletedTasks, setLoadingCompletedTasks] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    if (!auth) {
      return navigate("../", { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = async () => {
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
    setDisabledGetTasksBtn(current => !current);
  }

  const handleOnAddTask = async () => {
    setLoadingGetTasksBtn(current => !current);
    await addTask({ description });
    setDescription('');
    setLoadingGetTasksBtn(current => !current);
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
    setDisabledGetTasksBtn(true);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOnAddTask();
    }
  };

  const handleOnDeleteTask = async (task, setDisabledDelete) => {
    setDisabledDelete(current => !current);
    await deleteTask(task);
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, "all");
    setTasks(newTasks.data);
    localStorage.setItem('tasks', JSON.stringify(newTasks.data));
    setDisabledDelete(current => !current);
  };

  const handleOnCheckBoxClick = async (task, setDisabledCheckbox) => {
    setDisabledCheckbox(current => !current);
    const completed = !task.completed;
    await updateTask({ completed }, task);
    const newTasks = await getAllTasks(setLoadingGetTasksBtn, 'all');
    setTasks(newTasks.data);
    localStorage.setItem('tasks', JSON.stringify(newTasks.data));
    setDisabledCheckbox(current => !current);
  }

  const handleOnAllClick = async () => {
    const newTasks = await getAllTasks(setLoadingAllTasks, 'all');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnActiveClick = async () => {
    const newTasks = await getAllTasks(setLoadingActiveTasks, 'active');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnCompletedClick = async () => {
    const newTasks = await getAllTasks(setLoadingCompletedTasks, 'completed');
    setTasks(newTasks.data);
    localStorage.setItem("tasks", JSON.stringify(newTasks.data));
  }

  const handleOnLogout = () => {
    setLoadingLogout(current => !current);
    localStorage.clear();
    return navigate("../", { replace: true });
  }
  return (
    <div className='getAllTasksDiv'>
      <LoadingButton
        size='sm'
        variant='contained'
        onClick={() => handleOnLogout()}
        endIcon={<SendIcon />}
        loading={loadingLogout}
        loadingPosition="end"
      >
        Logout
      </LoadingButton>
      <Container maxWidth='sm' className='container'>
        <GetSubmitLoadingButton
          handleOnGetSubmit={handleSubmit}
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
          handleOnAllClick={handleOnAllClick}
          handleOnActiveClick={handleOnActiveClick}
          handleOnCompletedClick={handleOnCompletedClick}
          loadingAllTasks={loadingAllTasks}
          loadingActiveTasks={loadingActiveTasks}
          loadingCompletedTasks={loadingCompletedTasks}
        />
        {(loadingGetTasksBtn) ? <LinearProgress /> : null}
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="secondary mailbox folders">
            {tasks.length !== 0 && tasks.map((task) =>
              <List key={task._id}>
                <ListItemComponent handleOnDeleteTask={handleOnDeleteTask} handleOnCheckBoxClick={handleOnCheckBoxClick} task={task} />
              </List>
            )}
          </nav>
        </Box>
      </Container>
    </div>
  );
}
export default Dashboard