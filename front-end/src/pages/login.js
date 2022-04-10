import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import { LOGIN_URL, GET_PENDING_REQUESTS_URL} from '../constants';

export const Login = () => {

  const dispatch = useDispatch();
  const [ redirect, setRedirect ] = useState(false);
  const user = useSelector((state) => state.auth.value);
  const [error, setError] = useState({ message: '' });

  useEffect(() => {
    if(redirect) {
      return <Navigate to={'/'}/>;
    }
  }, [redirect]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    loginUser(data);
  };

  function loginUser(object) {
    axios.post(LOGIN_URL ,{
      email: object.get('email'),
      password: object.get('password')
    })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch(authenticate());
      setRedirect(true);
    })
    .catch((err) => {
      setError(prevState => ({
        ...prevState,
        ["message"]: "Error, wrong credentials!"
      }));
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
                  error = {Boolean(error?.message)}
                  helperText = {error?.message}
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
                  error = {Boolean(error?.message)}
                  helperText = {error?.message}
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
              <Link to={"/register"} variant="body2">
                Don't have an account? Register
              </Link>
              </Grid>
          </Grid>
      </Box>
      </div>
    </div>
  )
}