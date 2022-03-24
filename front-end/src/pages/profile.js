import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import default_profile_pic from "../assets/default_profile_icon.png";
import { useSelector } from 'react-redux';
import { forget } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const Profile = () => {
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  function logout() {
    localStorage.clear();
    dispatch(forget());
    // logout api
    setRedirect(true);
  }

  if(redirect) {
    return <Navigate to={'/login'}/>;
  }

  return (
    <div className='container-profile'>
      <div className='container-profile_title'>
        <h1>Profile</h1>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}

          onClick={logout}
        >
          Logout
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}
        >
          Save
        </Button>
      </div>
      <div className='container-profile_content'>
        <div className='container-profile_card'>
          <div className='container-profile_card-header'>
            <img src={default_profile_pic} alt="profile pic"/>
          </div>
          <div className='container-profile_card-body'>
            <div className='card-profile_name'>{user.first_name + " " + user.last_name}</div>
            <div className='card-profile_email'>{user.email}</div>
          </div>
          <div className='container-profile_card-footer'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Change Profile Picture
            </Button>
          </div>
        </div>
        <div className='container-profile_information'>
          <div className='basic-information'>
            <div className='basic-information_title'>
              <h2>Basic Information</h2>
            </div>
            <div className='basic-information_form'>
              <Box component="form" sx={{ mt: 4, mr: 2, ml: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} alignSelf="center">
                    First Name
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="first name"
                      name="first_name"
                      autoComplete="first_name"
                      size="small"
                  />
                  </Grid>
                  <Grid item xs={3} alignSelf="center">
                    Last Name
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="last name"
                      name="last_name"
                      autoComplete="last_name"
                      size="small"
                  />
                  </Grid>
                  <Grid item xs={3} alignSelf="center">
                    Email
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="email"
                      name="email"
                      autoComplete="email"
                      size="small"
                  />
                  </Grid>
                  
                </Grid>
              </Box>
            </div>
          </div>
          <div className='security'>
            <div className='security_title'>
              <h2>Security</h2>
            </div>
            <div className='security_form'>
            <Box component="form" sx={{ mt: 4, mr: 2, ml: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} alignSelf="center">
                    Current Password
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="current password"
                      name="current_password"
                      autoComplete="current_password"
                      size="small"
                  />
                  </Grid>
                  <Grid item xs={3} alignSelf="center">
                    New Password
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="new password"
                      name="new_password"
                      autoComplete="new_password"
                      size="small"
                  />
                  </Grid>
                  <Grid item xs={3} alignSelf="center">
                    Confirm Password
                  </Grid>
                  <Grid item xs={9}>
                  <TextField
                      fullWidth
                      label="confirm password"
                      name="confirm_password"
                      autoComplete="confirm_password"
                      size="small"
                  />
                  </Grid>
                  
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
