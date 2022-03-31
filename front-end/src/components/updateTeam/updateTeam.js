import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const UpdateTeam = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        createEvent(data);
    };

    const createEvent = (object) => {
        console.log(object.get("name"));
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
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Update
                    </Button>
                    </Box>
            </div>
        </div>
    )
}
