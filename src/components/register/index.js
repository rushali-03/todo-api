import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { Grid, Paper, Typography } from '@mui/material';

import { setToken } from '../../utils/helper';
import verifyUser from '../api/verifyUser';
import GetSubmitLoadingButton from '../sharedFolder/GetSubmitLoadingButton'
import TextFieldGrid from '../sharedFolder/TextFieldGrid';
import TextFieldPasswordGrid from '../sharedFolder/TextFieldPasswordGrid';
import '../../App.css';

export default function Register() {
  const navigate = useNavigate()
  const [nameRegister, setNameRegister] = useState();
  const [emailRegister, setEmailRegister] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [ageRegister, setAgeRegister] = useState();
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleSubmit = async () => {
    const name = nameRegister;
    const email = emailRegister;
    const password = passwordRegister;
    const age = ageRegister;
    const token = await verifyUser({
      name,
      email,
      password,
      age
    }, 'register', setLoadingRegister);
    setToken(token.token);
    return navigate("../dashboard", { replace: true });
  }

  const handlePasswordVisibility = () => {
    setShowPasswordRegister(current => !current);
  }

  return (
    <div className="login-wrapper">
      <h1>Register Here</h1>
      <Container maxWidth='sm'>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="column"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5 }}>
            <Grid container direction="column" spacing={2}>
              <TextFieldGrid 
                type="text" 
                label='Name' 
                setTextField={setNameRegister}
              />
              <TextFieldGrid 
                type="email" 
                label='Email Address' 
                setTextField={setEmailRegister}
              />
              <TextFieldPasswordGrid 
                showPassword={showPasswordRegister} 
                handlePasswordVisibility={handlePasswordVisibility}
                setPassword={setPasswordRegister}
              />
              <TextFieldGrid 
                type="number" 
                label='Age' 
                setTextField={setAgeRegister}
              />
              <Grid item>
                <GetSubmitLoadingButton
                  handleOnGetSubmit={handleSubmit}
                  loading={loadingRegister}
                  buttonText='Register'
                />
              </Grid>
            </Grid>
            <Typography align='center'>Already a member?
              <Button variant='Text' onClick={() => navigate("../", { replace: true })}>Login Here</Button>
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </div>
  )
}