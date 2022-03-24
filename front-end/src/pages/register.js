import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {

    const registerURL = 'http://localhost:8080/api/auth/register';
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        createUser(data);
    };

    function createUser(object) {
        axios.post(registerURL, {
            first_name: object.get('first_name'),  
            last_name: object.get('last_name'),  
            email: object.get('email'),
            password: object.get('password'),
            password_confirmation: object.get('password_confirmation'),
        })
        .then((res) => {
            console.log(res.data.message);
            setRedirect(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if (redirect) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className='container-register'>
        <div className='container-title'>
            <h1 className='title'>Plantool</h1>
        </div>
        <div className='container-register-form'>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mr: 2, ml: 2 }}>
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
