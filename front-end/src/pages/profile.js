import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import { EMP_UPDATE_PROFILE_URL, UPDATE_PROFILE_URL } from '../constants';


export const Profile = () => {
  const user = useSelector((state) => state.auth.value);

  const [image, setImage] = useState('');
  const dispatch = useDispatch();


  const handleImage = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (image) {
      data.append("image", image);
    }
    data.append("_id", user._id);
    console.log("handle submit");
    updateUser(data);
  };

  async function updateUser(object) {
    try {
      await axios.post(user.role===admin? UPDATE_PROFILE_URL:EMP_UPDATE_PROFILE_URL, {
        _id : object.get("_id"),
        first_name : object.get("first_name"),
        last_name : object.get("last_name"),
        email : object.get("email"),
        password: object.get("current_password"),
        image_path: image? object.get("image"): '',
      }, {
        headers: {
          "x-access-token": user.accessToken
        }
      }).then((res) => {
        let old_data = JSON.parse(localStorage.getItem('user'));
        Object.keys(old_data).map((key)=> {
          if(typeof(old_data[key]) === typeof(res.data[key])) {
            old_data[key] = res.data[key];
          }
        });
        localStorage.setItem('user', JSON.stringify(old_data));
        dispatch(authenticate());
      });
    }catch (err) {
      console.log(err);
    }
  }

  return (
    user? <div className='container-profile'>
      <Box component="form" onSubmit={handleSubmit}>
        <div className='container-profile_title'>
          <h1>Profile</h1>
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
              <img src={user.image_path} alt="profile pic"/>
            </div>
            <div className='container-profile_card-body'>
              <div className='card-profile_name'>{user.first_name + " " + user.last_name}</div>
              <div className='card-profile_email'>{user.email}</div>
            </div>
            <div className='container-profile_card-footer'>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Change Profile Picture
                <input
                  onChange={handleImage}
                  type="file"
                  hidden
                />
              </Button>
            </div>
          </div>
          <div className='container-profile_information'>
            <div className='basic-information'>
              <div className='basic-information_title'>
                <h2>Basic Information</h2>
              </div>
              <div className='basic-information_form'>
                <Box sx={{ mt: 4, mr: 2, ml: 2 }}>
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
            <div className='privacy'>
              <div className='privacy_title'>
                <h2>Private Information </h2>
              </div>
              <div className='privacy_form'>
              <Box sx={{ mt: 4, mr: 2, ml: 2 }}>
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
      </Box>
    </div>
    : <></>
  )
}
