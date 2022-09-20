import { Grid, TextField } from '@mui/material';

function TextFieldGrid(props) {
  return <Grid item>
    <TextField
    type={props.type}
    fullWidth
    label={props.label}
    variant='outlined'
    onChange={e => props.setTextField(e.target.value)}
  />
  </Grid>
}
export default TextFieldGrid