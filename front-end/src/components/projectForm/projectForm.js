import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const ProjectForm = () => {

    const [client, setClient] = useState('');
    const [type, setType] = useState('');
    
    const handleClientChange = (event) => {
        setClient(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        createProject(data);
    };

    const createProject = (object) => {
        console.log(object.get("name"));
    };


    return (
        <div className='container'>
            <div className='team_members_title'>
                <h3>Add New Project</h3>
            </div>
            <div className='container-project_form'>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mr: 2, ml: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="project name"
                            name="name"
                            autoComplete="given-name"
                            size="medium"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label-client">Client</InputLabel>
                            <Select
                            labelId="select-label-client"
                            id="select-client"
                            value={client}
                            label="client"
                            size="medium"
                            required
                            fullWidth
                            onChange={handleClientChange}
                            >
                            <MenuItem value={'Client A'}>Client A</MenuItem>
                            <MenuItem value={'Client B'}>Client B</MenuItem>
                            <MenuItem value={'Client C'}>Client C</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label-type">Type</InputLabel>
                            <Select
                            labelId="select-label-type"
                            id="select-type"
                            value={type}
                            label="type"
                            size="medium"
                            required
                            fullWidth
                            onChange={handleTypeChange}
                            >
                            <MenuItem value={'Client A'}>Client A</MenuItem>
                            <MenuItem value={'Client B'}>Client B</MenuItem>
                            <MenuItem value={'Client C'}>Client C</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name="duration"
                            label="duration"
                            type="number"
                            id="duration"
                            size="medium"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name="value"
                            label="value"
                            type="number"
                            id="value"
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
                        Create
                    </Button>
                    </Box>
            </div>
        </div>
    )
}
