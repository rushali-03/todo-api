import { LoadingButton } from "@mui/lab";
import ButtonGroup from '@mui/material/ButtonGroup';

function ModeButtonGroup(props) {
  return <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
  <LoadingButton
    onClick={props.handleOnAllClick}
    loading={props.loadingAllTasks}
  >All</LoadingButton>
  <LoadingButton
    onClick={props.handleOnActiveClick}
    loading={props.loadingActiveTasks}
  >Active</LoadingButton>
  <LoadingButton
    onClick={props.handleOnCompletedClick}
    loading={props.loadingCompletedTasks}
  >Completed</LoadingButton>
</ButtonGroup>
}
export default ModeButtonGroup