import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import { EMP_UPDATE_PROFILE_URL, UPDATE_PROFILE_URL } from '../constants';
import EditIcon from '@mui/icons-material/Edit';
// import { sha256 } from 'js-sha256';

export const Profile = () => {
  const user = useSelector((state) => state.auth.value);
  const [input, setInput] = useState({ 
    first_name: '',
    last_name: '',
    current_password: '',
    new_password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState({
      first_name: '',
      last_name: '',
      email: '',
      current_password: '',
      new_password: '',
      password_confirmation: ''
  });
  const handleChange = (event) => {
      const { name, value } = event.target;
      setInput(prevState => ({
          ...prevState,
          [name]: value
      }));
      validateInput(name, value);
  };

  const validateInput = (name, value) => {
      if (name === "first_name" || name === "last_name"){
          if (value.length < 2){
              setError(prevState => ({
                  ...prevState,
                  [name]: "At least 2 letters long"
              }));
          }else {
              setError(prevState => ({
                  ...prevState,
                  [name]: ""
              }));
          }
      }
      if (name === "email") {
          if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
              setError(prevState => ({
                  ...prevState,
                  [name]: "email is not valid!"
              }));
          }else {
              setError(prevState => ({
                  ...prevState,
                  [name]: ""
              }));
          }
      }
      // sha256 is different in the back-end...
      // if(name === "current_password") {    
      //   if (sha256(value) === user.password) {
      //     setError(prevState => ({
      //       ...prevState,
      //       [name]: ""
      //     }));
      //   }else {
      //     console.log(sha256(value) );
      //     setError(prevState => ({
      //         ...prevState,
      //         [name]: "wrong password"
      //     }));
      //   }
      // }
      if (name === "new_password") {
          if (value.length < 8 || !value.match("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$")) {
              setError(prevState => ({
                  ...prevState,
                  [name]: "invalid password"
              }));
          }else {
              setError(prevState => ({
                  ...prevState,
                  [name]: ""
              }));
          }
      }
      if (name === "password_confirmation") {
          if (value !== input.password) {
              setError(prevState => ({
                  ...prevState,
                  [name]: "wrong password"
              }));
          }else {
              setError(prevState => ({
                  ...prevState,
                  [name]: ""
              }));
          }
      }
  }

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
      const res = await axios.post(user.role==='admin'? UPDATE_PROFILE_URL:EMP_UPDATE_PROFILE_URL, {
        _id : object.get("_id"),
        first_name : object.get("first_name"),
        last_name : object.get("last_name"),
        email : object.get("email"),
        password: object.get("new_password"),
        image_path: image? object.get("image"): '',
      }, {
        headers: {
          "x-access-token": user.accessToken
        }
      });
      let old_data = JSON.parse(localStorage.getItem('user'));
      Object.keys(old_data).map((key)=> {
        if(typeof(old_data[key]) === typeof(res.data[key])) {
          old_data[key] = res.data[key];
        }
      });
      localStorage.setItem('user', JSON.stringify(old_data));
      dispatch(authenticate());
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
                <h2>Basic Information <EditIcon fontSize='small' sx={{mb:0.5}} /></h2>
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
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.first_name)}
                        helperText = {error?.first_name}
                    />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      Last Name
                    </Grid>
                    <Grid item xs={9}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.last_name)}
                        helperText = {error?.last_name}
                    />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      Email
                    </Grid>
                    <Grid item xs={9}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        autoComplete="email"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.email)}
                        helperText = {error?.email}
                    />
                    </Grid>                 
                  </Grid>
                </Box>
              </div>
            </div>
            <div className='privacy'>
              <div className='privacy_title'>
                <h2>Private Information <EditIcon fontSize='small' sx={{mb:0.5}} /></h2>
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
                        type="password"
                        label="Current Password"
                        name="current_password"
                        autoComplete="current_password"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.current_password)}
                        helperText = {error?.current_password}
                    />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      New Password
                    </Grid>
                    <Grid item xs={9}>
                    <TextField
                        fullWidth
                        type="password"
                        label="New Password"
                        name="new_password"
                        autoComplete="new_password"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.new_password)}
                        helperText = {error?.new_password}
                    />
                    </Grid>
                    <Grid item xs={3} alignSelf="center">
                      Confirm Password
                    </Grid>
                    <Grid item xs={9}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirm_password"
                        autoComplete="confirm_password"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.password_confirmation)}
                        helperText = {error?.password_confirmation}
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
