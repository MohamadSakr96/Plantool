import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TeamMembers } from '../components/teamMembers/teamMembers';
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersInfo } from '../features/admin/getAllUsersInfoSlice';
import axios from 'axios';
import { EMP_GET_ALL_USERS_URL, GET_ALL_USERS_URL } from '../constants';

const columns = [
  { type: "string", id: "Employees" },
  { type: "string", id: "Events" },
  { type: 'string', id: 'style', role: 'style'},
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" }
];
//                green     yellow    red
const colors = ["#0f9d58","#f4b400","#db4437"];

export const Planning = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  
  useEffect(async () => {
    try {
      if(user){
        const res = await axios.get(user.role==="admin"? GET_ALL_USERS_URL:EMP_GET_ALL_USERS_URL, {
          headers: {
            "x-access-token": user.accessToken
          }
        });
        dispatch(getUsersInfo(res.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  },[status]);
  
  const users_data = useSelector((state) => state.getAllUsersInfo.value);
  const rows = [];
  users_data.map((data) => {
    let temp_array = [];
    data["events"].map((eve)=>{
      let arr = [];
      arr.push(data["first_name"]+" "+data["last_name"]);
      arr.push(eve["description"]);
      if(eve["name"] === "project") arr.push(colors[0])
      if(eve["name"] === "vacation") arr.push(colors[2])
      if(eve["name"] === "training") arr.push(colors[1])
      arr.push(new Date(eve["start_date"]));
      arr.push(new Date(eve["end_date"]));  
      temp_array.push(arr);
    });
    rows.push(...temp_array);
  });
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose= () => {
    setOpen(false);
    setStatus(prev=>!prev);
  };

  return (
    user?<div className='container-planning'>
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
              <TeamMembers />
            </DialogContent>
          </Dialog>
      </div>
      <div className='container-planning_content'>
      <Chart
          chartType="Timeline"
          data={[columns, ...rows]}
          width="100%"
          height="100%"

        />
      </div>
    </div>:<></>
  )
}
