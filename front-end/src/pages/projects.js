import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProjectForm } from '../components/projectForm/projectForm';
import { useSelector , useDispatch} from 'react-redux';
import { getAllProjects } from '../features/admin/getAllProjectsSlice';
import axios from 'axios';
import { GET_ALL_PROJECTS_URL } from '../constants';

export const Projects = () => {
  const [open, setOpen] = useState(false);
  const user= useSelector((state) => state.auth.value);
  const projects_data = useSelector((state) => state.getAllProjects.value);
  const dispatch = useDispatch();

  useEffect(async () => {
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
  },[]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose= () => {
    setOpen(false);
  };
  return (
    <div className='container-projects'>
      <div className='container-projects_title'>
        <h1>Projects</h1>
        <AddIcon onClick={handleOpen} fontSize='large' color='primary' />
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <ProjectForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className='container-projects_content'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Duration<br/>(# of days)</TableCell>
                <TableCell align="center">Value (€)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects_data.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{data["name"]}</TableCell>
                  <TableCell align="center">{data["client"]}</TableCell>
                  <TableCell align="center">{data["type"]}</TableCell>
                  <TableCell align="center">{data["duration"]}</TableCell>
                  <TableCell align="center">{data["value"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
