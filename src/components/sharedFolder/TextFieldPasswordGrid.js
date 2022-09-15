import { Grid, IconButton, TextField, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function TextFieldPasswordGrid(props) {
  return <Grid item>
    <TextField
      type={props.showPassword ? 'text' : 'password'}
      fullWidth
      label="Password"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={props.handlePasswordVisibility}
              aria-label='toggle password'
              edge='end'
            >
              {
                props.showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )
              }
            </IconButton>
          </InputAdornment>
        )
      }}
      onChange={e => props.setPassword(e.target.value)}
    />
  </Grid>
}
export default TextFieldPasswordGrid