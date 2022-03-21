import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='container-login'>
      <div className='container-title'>
        <h1 className='title'>Plantool</h1>
      </div>
      <div className='container-login-form'>
      <Box component="form" sx={{ mt: 1, mr: 2, ml: 2 }}>
        <Grid container justifyContent="flex-start">
              <Grid item >
                <h1>Welcome,</h1>
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