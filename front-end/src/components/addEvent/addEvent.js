import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const AddEvent = () => {

    const [type, setType] = useState('');
    const [project, setProject] = useState('');
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

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
                <h3>New Assignment</h3>
            </div>
            <div className='container-project_form'>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mr: 2, ml: 2 }}>
                    <Grid container spacing={2}>
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
                            <MenuItem value={'project'}>Project</MenuItem>
                            <MenuItem value={'training'}>Training</MenuItem>
                            <MenuItem value={'vacation'}>Vacation</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label-project">Project Name</InputLabel>
                            <Select
                            labelId="select-label-project"
                            id="select-project"
                            value={project}
                            label="project"
                            size="medium"
                            required
                            fullWidth
                            onChange={handleProjectChange}
                            >
                            <MenuItem value={'alpha'}>Alpha</MenuItem>
                            <MenuItem value={'beta'}>Beta</MenuItem>
                            <MenuItem value={'gamma'}>Gamma</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name="start_date"
                            label="start_date"
                            type="date"
                            id="start_date"
                            size="medium"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name="end_date"
                            label="end_date"
                            type="date"
                            id="end_date"
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
                        Create
                    </Button>
                    </Box>
            </div>
        </div>
    )
}
