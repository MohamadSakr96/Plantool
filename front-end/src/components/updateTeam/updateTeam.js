import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UPDATE_TEAM_MEMBER_URL } from '../../constants';

export const UpdateTeam = (props) => {

    const user = useSelector((state) => state.auth.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("_id", props.id);
        createEvent(data);
    };

    const createEvent = async (object) => {
        console.log(object.get("first_name"), props.id);
        try {
            const updated_data = await axios.post(UPDATE_TEAM_MEMBER_URL, {
                _id: object.get("_id"),  
                first_name:  object.get('first_name'),
                last_name: object.get('last_name'),
                salary: object.get('salary'),
                position: object.get('position'),
            },{
                headers: {
                  "x-access-token": user.accessToken
                }
            });
            console.log(updated_data);
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div className='container'>
            <div className='team_members_title'>
                <h3>Team Member Info</h3>
            </div>
            <div className='container-project_form'>
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
                            size="medium"
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
                            size="medium"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name="salary"
                            label="Salary"
                            type="number"
                            id="salary"
                            size="medium"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            autoComplete="given-name"
                            name="position"
                            required
                            fullWidth
                            id="position"
                            label="Position"
                            size="medium"
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1, p: 1.5}}
                        size="large"
                    >
                        Update
                    </Button>
                    </Box>
            </div>
        </div>
    )
}
