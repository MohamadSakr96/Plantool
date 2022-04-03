import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { Billability_Stats } from '../components/billability_stats/billability_stats';
import { Project_Stats } from '../components/project_stats/project_stats';
import { GET_ALL_PROJECTS_URL } from '../constants';
import { useSelector , useDispatch} from 'react-redux';
import { getAllProjects } from '../features/admin/getAllProjectsSlice';
import axios from 'axios';


export const Stats = () => {
  const [status, setStatus] = useState(false);
  const [start, setStart] = useState("2022-01-01");
  const [end, setEnd] = useState("2022-06-01");
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.value);

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

  const Content = () => {
    if(status) {
      return <Project_Stats date ={[start, end]} />;
    }else {
      return <Billability_Stats date ={[start, end]} />;
    }
  };

  return (
    <div className='container-stats'>
      <div className='container-stats_title'>
        <h1>Stats</h1>
        <div className='flex'>
          <div>
            <div style={{fontSize: '0.9rem'}}>Start date</div>
            <TextField id='start' sx={{mr: 2}} size='small' type='date' defaultValue='2022-01-01' onChange={(event)=>{setStart(event.currentTarget.value)}}/>
          </div>
          <div>
            <div style={{fontSize: '0.9rem'}}>End date</div>
            <TextField id='end' size='small' type='date' defaultValue='2022-06-01' onChange={(event)=>{setEnd(event.currentTarget.value)}}/>
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
