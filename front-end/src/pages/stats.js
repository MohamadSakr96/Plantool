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
            <div>Start date</div>
            <TextField type='date' />
          </div>
          <div>
            <div>End date</div>
            <TextField type='date' />
          </div>
        </div>
      </div>
      <div className='container-stats_subTitle'>
        <h3 onClick={() => {setStatus(false)}} style ={status ? {opacity: 0.5} : {opacity: 1}}>Billability</h3>
        <h3 onClick={() => {setStatus(true)}} style ={status ? {opacity: 1} : {opacity: 0.5}}>Projects</h3>
      </div>
      <div className='container-stats_content'>
        <Content/>
      </div>
    </div>
  )
}
