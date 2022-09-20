import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import List from '@mui/material/List';

import ListItemComponent from '../shared/ListItemComponent';
import useAuthToken from '../../hooks/useAuthToken';
import getAllTasks from '../../api/getAllTasks';
import AddTasks from './AddTasks';
import updateTask from '../../api/updateTask';
import deleteTask from '../../api/deteleTask';
import '../../App.css';

function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuthToken();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    if (!auth) {
      return navigate("../", { replace: true });
    }
  }, [auth, navigate]);

  const handleOnDeleteTask = async (task, setDisabledDelete) => {
    setDisabledDelete(current => !current);
    await deleteTask(task);
    setDisabledDelete(current => !current);
    const newTasks = await getAllTasks(setDisabledDelete, "all");
    setTasks(newTasks.data);
    localStorage.setItem('tasks', JSON.stringify(newTasks.data));
  };

  const handleOnCheckBoxClick = async (task, setDisabledCheckbox) => {
    setDisabledCheckbox(current => !current);
    const completed = !task.completed;
    await updateTask({ completed }, task);
    setDisabledCheckbox(current => !current);
    const newTasks = await getAllTasks(setDisabledCheckbox, 'all');
    setTasks(newTasks.data);
    localStorage.setItem('tasks', JSON.stringify(newTasks.data));
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
        <AddTasks setTasks={setTasks}/>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav>
            {tasks.length !== 0 && tasks.map((task) =>
              <List key={task._id}>
                <ListItemComponent 
                  handleOnDeleteTask={handleOnDeleteTask} 
                  handleOnCheckBoxClick={handleOnCheckBoxClick} 
                  task={task} />
              </List>
            )}
          </nav>
        </Box>
      </Container>
    </div>
  );
}
export default Dashboard