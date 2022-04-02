import React, {useState} from 'react';
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

// Fake data
function createData(id, first_name, last_name, entry_date, salary, position, vacation_days) {
  return { id, first_name, last_name, entry_date, salary, position, vacation_days };
}
const rows = [
  createData( 1, 'Mohamad', 'Sakr', '2/22/2022', 1000, 'Junior', 15),
  createData( 2, 'Joe', 'Rizk', '2/22/2022', 1100, 'Junior', 10),
  createData( 3, 'Caline', 'Yammine', '2/22/2022', 1500, 'Junior', 17),
  createData( 4, 'John', 'Doe', '2/22/2022', 1900, 'Senior', 5),
  createData( 5, 'Moo', 'Sakr', '2/22/2022', 2000, 'Senior', 20),
];

export const Projects = () => {
  const [open, setOpen] = useState(false);

  // useEffect(async () => {
  //   try {
  //     if(user){
  //       const res = await axios.get(GET_ALL_USERS_URL, {
  //         headers: {
  //           "x-access-token": user.accessToken
  //         }
  //       });
  //       dispatch(getUsersInfo(res.data));
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },[]);

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
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Entry Date</TableCell>
                <TableCell align="center">Salary<br/>(€ / month)</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Days of vacations <br/>remaining</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.entry_date}</TableCell>
                  <TableCell align="center">{row.salary}</TableCell>
                  <TableCell align="center">{row.position}</TableCell>
                  <TableCell align="center">{row.vacation_days}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
