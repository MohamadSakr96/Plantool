import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TeamMembers } from '../components/teamMembers/teamMembers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useSelector , useDispatch} from 'react-redux';
import { getUsersInfo } from '../features/admin/getAllUsersInfoSlice';
import axios from 'axios';
import { GET_ALL_USERS_URL } from '../constants';
  

export const Team = () => {
  const [open, setOpen] = useState(false);
  const user= useSelector((state) => state.auth.value);
  const users_data = useSelector((state) => state.getAllUsersInfo.value);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      if(user){
        const res = await axios.get(GET_ALL_USERS_URL, {
          headers: {
            "x-access-token": user.accessToken
          }
        });
        dispatch(getUsersInfo(res.data));
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
    <div className='container-team'>
      <div className='container-team_title'>
        <h1>Team</h1>
        <AddIcon onClick={handleOpen} fontSize='large' color='primary' />
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <TeamMembers page = {'team'}/>
            </DialogContent>
        </Dialog>
      </div>
      <div className='container-team_content'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Entry Date</TableCell>
                <TableCell align="center">Salary<br/>(€ / month)</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Days of vacations <br/>remaining</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users_data.map((data,index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell size='small' className='tablecell-image'>
                    <div className='container-team_image'>
                      <img src={data["image_path"]}/>
                    </div>
                  </TableCell>
                  <TableCell align="center">{data["first_name"]}</TableCell>
                  <TableCell align="center">{data["last_name"]}</TableCell>
                  <TableCell align="center">{data["createdAt"].split("T")[0]}</TableCell>
                  <TableCell align="center">{data["salary"]?(data["salary"]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):"N/A"}</TableCell>
                  <TableCell align="center">{data["position"]}</TableCell>
                  <TableCell align="center">{data["vacation_days"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
