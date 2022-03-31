import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Team_Members } from '../components/team_members/team_members';
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", id: "Employees" },
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" }
];

const rows = [
  ["Mohamad Sakr", new Date(2020, 3, 30), new Date(2020, 6, 30)],
  ["Mohamad Sakr", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Mohamad Sakr", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["Mohamad Sakr", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Mohamad Sakr", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Joe Rizk", new Date(2020, 1, 30), new Date(2020, 6, 30)],
  ["Joe Rizk", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Joe Rizk", new Date(2021, 3, 30), new Date(2021, 6, 30)],
  ["Joe Rizk", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Joe Rizk", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["John Doe", new Date(2020, 2, 30), new Date(2020, 6, 30)],
  ["John Doe", new Date(2020, 7, 30), new Date(2020, 11, 30)],
  ["John Doe", new Date(2021, 1, 30), new Date(2021, 2, 30)],
  ["John Doe", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["John Doe", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Caline", new Date(2020, 3, 30), new Date(2020, 6, 30)],
  ["Caline", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Caline", new Date(2021, 1, 30), new Date(2021, 6, 30)],
  ["Caline", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Caline", new Date(2022, 1, 30), new Date(2022, 6, 30)],
  ["Joe", new Date(2020, 1, 30), new Date(2020, 6, 30)],
  ["Joe", new Date(2020, 6, 30), new Date(2020, 12, 30)],
  ["Joe", new Date(2021, 3, 30), new Date(2021, 6, 30)],
  ["Moo", new Date(2020, 2, 30), new Date(2020, 6, 30)],
  ["Moo", new Date(2020, 7, 30), new Date(2020, 11, 30)],
  ["Moo", new Date(2021, 1, 30), new Date(2021, 2, 30)],
  ["Moo", new Date(2021, 6, 30), new Date(2021, 12, 30)],
  ["Moo", new Date(2022, 1, 30), new Date(2022, 6, 30)],
];
const data = [columns, ...rows];

export const Planning = () => {
  const [open, setOpen] = useState(false);

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
        <AddIcon onClick={handleOpen} fontSize='large' color='primary'/>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Team_Members page = {'planning'}/>
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
