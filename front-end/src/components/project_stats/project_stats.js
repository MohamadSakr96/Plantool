import React from 'react';
import './project_stats.css';

export const Project_Stats = () => {
  return (
    <div className='container-projectStats'>
      <div className='container-projectStats_title'>
          <h1>Overall XX €</h1>
      </div>
      <div className='container-projectStats_content'>
        <div className='projectStats_content-item'>
          <div> </div>
          <div className='projectStats_content-item_data'>
            <h3>Number</h3>
            <h3>Value (€)</h3>
          </div>
        </div>
        <div className='projectStats_content-item border_bottom'>
          <div className='content-item_name'>Web app</div>
          <div className='projectStats_content-item_data'>
            <div className='content-item_number'>2</div>
            <div className='content-item_value'>30000</div>  
          </div>
        </div>
        <div className='projectStats_content-item border_bottom'>
          <div className='content-item_name'>E-commerce website</div>
          <div className='projectStats_content-item_data'>
            <div className='content-item_number'>2</div>
            <div className='content-item_value'>30000</div>  
          </div>
        </div>
        <div className='projectStats_content-item border_bottom'>
          <div className='content-item_name'>Mobile app</div>
          <div className='projectStats_content-item_data'>
            <div className='content-item_number'>2</div>
            <div className='content-item_value'>30000</div>  
          </div>
        </div>
        <div className='projectStats_content-item border_bottom'>
          <div className='content-item_name'>Showcase website</div>
          <div className='projectStats_content-item_data'>
            <div className='content-item_number'>2</div>
            <div className='content-item_value'>30000</div>  
          </div>
        </div>
        <div className='projectStats_content-item'>
          <div className='content-item_name'>Other</div>
          <div className='projectStats_content-item_data'>
            <div className='content-item_number'>2</div>
            <div className='content-item_value'>30000</div>  
          </div>
        </div>
      </div>
    </div>
  )
}
