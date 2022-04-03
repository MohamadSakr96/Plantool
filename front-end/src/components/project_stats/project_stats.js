import React, { useState, useEffect } from 'react';
import './project_stats.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectStats } from '../../features/admin/getProjectStatsSlice';


export const Project_Stats = (props) => {
  const projects_data = useSelector((state) => state.getAllProjects.value);
  const projects_stat = useSelector((state) => state.getProjectStats.value);
  const start_date = new Date(props.date[0]);
  const end_date = new Date(props.date[1]);
  const [overall, setOverall] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props) {
      setOverall(0);
      let sum = 0;
      let newData = getFilteredData();
      newData.map((d)=>{
        sum += d[1]*d[2];
      });
      dispatch(getProjectStats(newData));
      setOverall(prev => prev+sum);
    }
  }, [props]);

  const getFilteredData = () => {
    let temp_array = [
      ["Web app", 0, 0],
      ["E-commerce web", 0, 0],
      ["Mobile app", 0, 0],
      ["Showcase web", 0, 0],
      ["Other", 0, 0]
    ];
    projects_data.map((project)=> {
      temp_array.map((temp) => {
        if(project["type"] === temp[0] && isInFilter(project["createdAt"], project["duration"])) {
          temp[1] += 1;
          temp[2] = project["value"];
        }
      });
    });
    return temp_array;
  };
  const isInFilter = (current_time, duration) => {
    let start = new Date(current_time);
    let end = new Date(current_time + duration);
    if (end<=start_date || start >= end_date) {
      return false;
    }
    return true;
  };

  return (
    <div className='container-projectStats'>
      <div className='container-projectStats_title'>
          <h1>Overall {overall} €</h1>
      </div>
      <div className='container-projectStats_content'>
        <div className='projectStats_content-item border_bottom'>
          <h3 className='content-item_name blue'>Type</h3>
          <div className='projectStats_content-item_data'>
            <h3 className='blue'>Number</h3>
            <h3 className='blue'>Value (€)</h3>
          </div>
        </div>
        {projects_stat.map((data, index) => {
          return <div key={index} className={projects_stat.length === index+1? 'projectStats_content-item':'projectStats_content-item border_bottom'}>
                  <div className='content-item_name'>{data[0]}</div>
                  <div className='projectStats_content-item_data'>
                    <div className='content-item_number'>{data[1]}</div>
                    <div className='content-item_value'>{data[1]*data[2]}</div>  
                  </div>
                </div>;
        })}
      </div>
    </div>
  )
}
