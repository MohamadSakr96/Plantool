import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_PROJECT_URL, GET_ALL_PROJECTS_URL } from '../../constants';
import { getAllProjects } from '../../features/admin/getAllProjectsSlice';


export const ProjectForm = () => {
    const user = useSelector((state) => state.auth.value);
    const [client, setClient] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    
    const handleClientChange = (event) => {
        setClient(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("client", client);
        data.append("type", type);
        createProject(data);
    };

    const createProject = async (object) => {
        try {
            const res = await axios.post(CREATE_PROJECT_URL, { 
                name: object.get('name'),  
                client: object.get('client'),  
                type: object.get('type'),  
                duration: object.get('duration'),
                value: object.get('value')
            },{
                headers: {
                  "x-access-token": user.accessToken
                }
            });
            updateProjectData();
            console.log(res.data.message);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateProjectData = async () => {
        try {
            if(user){
              const res = await axios.get(GET_ALL_PROJECTS_URL, {
                headers: {
                  "x-access-token": user.accessToken
                }
              });
              dispatch(getAllProjects(res.data));
            }
          } catch (error) {
            console.log(error.message);
          }
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
                            <MenuItem value={'Web app'}>Web app</MenuItem>
                            <MenuItem value={'E-commerce web'}>E-commerce web</MenuItem>
                            <MenuItem value={'Mobile app'}>Mobile app</MenuItem>
                            <MenuItem value={'Showcase web'}>Showcase web</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
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
