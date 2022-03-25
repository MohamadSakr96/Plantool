import React from 'react';

export const Stats = () => {
  return (
    <div className='container-stats'>
      <div className='container-stats_title'>
        <h1>Stats</h1>
        <div className='flex'>
          <div>
            <div>Start date</div>
            <input type='date' />
          </div>
          <div>
            <div>End date</div>
            <input type='date' />
          </div>
        </div>
      </div>
    </div>
  )
}
