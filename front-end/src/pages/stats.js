import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Billability_Stats } from '../components/billability_stats/billability_stats';
import { Project_Stats } from '../components/project_stats/project_stats';


export const Stats = () => {
  const [status, setStatus] = useState(false);

  const Content = () => {
    if(status) {
      return <Project_Stats />;
    }else {
      return <Billability_Stats />;
    }
  };

  return (
    <div className='container-stats'>
      <div className='container-stats_title'>
        <h1>Stats</h1>
        <div className='flex'>
          <div>
            <div style={{fontSize: '0.9rem'}}>Start date</div>
            <TextField sx={{mr: 2}} size='small' type='date' />
          </div>
          <div>
            <div style={{fontSize: '0.9rem'}}>End date</div>
            <TextField size='small' type='date' />
          </div>
        </div>
      </div>
      <div className='container-stats_subTitle'>
        <h2 onClick={() => {setStatus(false)}} style ={status ? {opacity: 0.5} : {opacity: 1}}>Billability</h2>
        <h2 onClick={() => {setStatus(true)}} style ={status ? {opacity: 1} : {opacity: 0.5}}>Projects</h2>
      </div>
      <div className='container-stats_content'>
        <Content/>
      </div>
    </div>
  )
}
