import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { REGISTER_URL } from '../constants';

export const Register = () => {

    const [redirect, setRedirect] = useState(false);
    const [input, setInput] = useState({ 
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isValid: ''
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
        if (name === "password") {
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
        if (error[name] !== '') {
            setError(prevState => ({
                ...prevState,
                ["isValid"]: "not Valid"
            }));
        }else {
            setError(prevState => ({
                ...prevState,
                ["isValid"]: ""
            }));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        createUser(data);
    };

    function createUser(object) {
        axios.post(REGISTER_URL, {
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
            setError(prevState => ({
                ...prevState,
                ["email"]: "email already exists!"
            }));
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
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.first_name)}
                        helperText = {error?.first_name}
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
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.last_name)}
                        helperText = {error?.last_name}
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
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.email)}
                        helperText = {error?.email}
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
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.password)}
                        helperText = {error?.password}
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
                        onChange={handleChange}
                        onBlur={handleChange}
                        error = {Boolean(error?.password_confirmation)}
                        helperText = {error?.password_confirmation}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    disabled={Boolean(error?.isValid)}
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
