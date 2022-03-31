import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Team_Members } from '../components/team_members/team_members';

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
    </div>
  )
}
