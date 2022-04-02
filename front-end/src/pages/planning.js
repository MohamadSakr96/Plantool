import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Team_Members } from '../components/team_members/team_members';
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersInfo } from '../features/admin/getAllUsersInfoSlice';
import axios from 'axios';
import { EMP_GET_ALL_USERS_URL, GET_ALL_USERS_URL } from '../constants';

const columns = [
  { type: "string", id: "Employees" },
  { type: "string", id: "Projects" },
  // { type: 'string', id: 'style', role: 'style'},
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" }
];

const rows = [
  ["Mohamad Sakr", "Project 1", new Date(2020, 3, 30), new Date(2020, 6, 30)],
  ["Mohamad Sakr", "Project 2", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Mohamad Sakr", "Project 3", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["Mohamad Sakr", "Project 4", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Mohamad Sakr", "Project 5", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Joe Rizk", "Project 1", new Date(2020, 1, 30), new Date(2020, 6, 30)],
  ["Joe Rizk", "Project 2", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Joe Rizk", "Project 3", new Date(2021, 3, 30), new Date(2021, 6, 30)],
  ["Joe Rizk", "Project 4", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Joe Rizk", "Project 5", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["John Doe", "Project 1", new Date(2020, 2, 30), new Date(2020, 6, 30)],
  ["John Doe", "Project 2", new Date(2020, 7, 30), new Date(2020, 11, 30)],
  ["John Doe", "Project 3", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["John Doe", "Project 4", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["John Doe", "Project 5", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Caline", "Project 1", new Date(2020, 3, 30), new Date(2020, 6, 30)],
  ["Caline", "Project 2", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Caline", "Project 3", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["Caline", "Project 4", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Caline", "Project 5", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Joe", "Project 1", new Date(2020, 1, 30), new Date(2020, 6, 30)],
  ["Joe", "Project 2", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Joe", "Project 3", new Date(2021, 3, 30), new Date(2021, 6, 30)],
  ["Moo", "Project 1", new Date(2020, 2, 30), new Date(2020, 6, 30)],
  ["Moo", "Project 2", new Date(2020, 7, 30), new Date(2020, 11, 30)],
  ["Moo", "Project 3", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["Moo", "Project 4", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Moo", "Project 5", new Date(2022, 1, 30), new Date(2022, 6, 30)],
];

const data = [columns, ...rows];

export const Planning = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    try {
      const res = await axios.get(user.role==="admin"? GET_ALL_USERS_URL:EMP_GET_ALL_USERS_URL, {
        headers: {
          "x-access-token": user.accessToken
        }
      });
      dispatch(getUsersInfo(res.data));
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
    <div className='container-planning'>
      <div className='container-planning_title'>
        <h1>Planning</h1>
        {user.role === "admin"? <AddIcon onClick={handleOpen} fontSize='large' color='primary'/>: <></>}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Team_Members />
            </DialogContent>
          </Dialog>
      </div>
      <div className='container-planning_content'>
      <Chart
          chartType="Timeline"
          data={data}
          width="100%"
          height="100%"

        />
      </div>
    </div>
  )
}
