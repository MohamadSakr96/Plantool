import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';

export const Login = () => {
  const loginUrl = 'http://localhost:8080/api/auth/login';
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    loginUser(data);
  };

  function loginUser(object) {
    axios.post(loginUrl ,{
      email: object.get('email'),
      password: object.get('password')
    })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch(authenticate());
    })
    .catch((err) => {
      console.log(err.message);
    });
  }


  return (
    <div className='container-login'>
      <div className='container-title'>
        <h1 className='title'>Plantool</h1>
      </div>
      <div className='container-login-form'>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mr: 2, ml: 2 }}>
        <Grid container justifyContent="flex-start">
              <Grid item >
                <h1>Welcome</h1>
              </Grid>
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  size="small"
              />
              </Grid>
          </Grid>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
          >
              login
          </Button>
          <Grid container justifyContent="center">
              <Grid item sx={{mb: 2}}>
              <Link to={"/"} variant="body2">
                Don't have an account? Register
              </Link>
              </Grid>
          </Grid>
      </Box>
      </div>
    </div>
  )
}