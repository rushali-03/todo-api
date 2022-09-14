import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { Grid, Paper, Typography } from '@mui/material';

import GetSubmitLoadingButton from '../React/GetSubmitLoadingButton';
import TextFieldGrid from '../React/TextFieldGrid';
import TextFieldPasswordGrid from '../React/TextFieldPasswordGrid';
import { setToken } from '../utils/helper';
import useAuthToken from '../hooks/useAuthToken';
import verifyUser from './verifyUser';
import '../App.css';

export default function Login() {
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const auth = useAuthToken();

  useEffect(() => {
    if (auth) {
      return navigate("../dashboard", { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = async () => {
    const email=emailLogin;
    const password=passwordLogin;
    const token = await verifyUser({
      email,
      password
    }, "login",setLoadingLogin);
    if(token.token !== undefined){
    setToken(token.token);}
    return navigate("../dashboard", { replace: true });
  }
  const handlePasswordVisibility = () => {
    setShowPasswordLogin(current => !current);
  }
  return (
    <div className="login-wrapper">
      <h1>Login Here</h1>
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
                type="email" 
                label='Email Address' 
                setTextField={setEmailLogin}/>
              <TextFieldPasswordGrid 
                showPassword={showPasswordLogin} 
                handlePasswordVisibility={handlePasswordVisibility}
                setPassword={setPasswordLogin}
              />
              <Grid item>
                <GetSubmitLoadingButton 
                  handleOnGetSubmit={handleSubmit} 
                  loading={loadingLogin} 
                  buttonText='Login' 
                />
              </Grid>
            </Grid>
            <Typography align='center'>Not a member?
              <Button variant='Text' onClick={() => navigate("../register", { replace: true })}>Register Here</Button>
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </div>
  )
}