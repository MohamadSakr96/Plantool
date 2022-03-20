import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export const Register = () => {
  return (
    <div className='container-register'>
      <div className='container-title'>
        <h1 className='title'>Plantool</h1>
      </div>
      <div className='container-register-form'>
      <Box component="form" sx={{ mt: 3, mr: 2, ml: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First name"
                    size="small"
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    autoComplete="given-name"
                    name="last_name"
                    required
                    fullWidth
                    id="last_name"
                    label="Last name"
                    size="small"
                />
                </Grid>
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
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password_confirmation"
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
                Register
            </Button>
            <Grid container justifyContent="center">
                <Grid item sx={{mb: 1}}>
                <Link to={"/login"} variant="body2">
                    Already have an account? Login
                </Link>
                </Grid>
            </Grid>
            </Box>
      </div>
    </div>
  )
}
