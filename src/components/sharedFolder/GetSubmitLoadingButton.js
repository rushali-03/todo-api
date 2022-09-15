import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from "@mui/lab";

function GetSubmitLoadingButton(props) {
  return <LoadingButton
  size='sm'
  variant='contained'
  onClick={() => props.handleOnGetSubmit()}
  endIcon={<SendIcon />}
  loading={props.loading}
  disabled={props.disabled || false}
  loadingPosition="end"
  fullWidth
>
  {props.buttonText}
</LoadingButton> 
}
export default GetSubmitLoadingButton