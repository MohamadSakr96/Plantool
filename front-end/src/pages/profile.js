import React from 'react';
import default_profile_pic from "../assets/default_profile_icon.png";


export const Profile = () => {
  return (
    <div className='container-profile'>
      <div className='container-profile_title'>
        <h1>Profile</h1>
        <button type='button'>Save</button>
      </div>
      <div className='container-profile_content'>
        <div className='container-profile_card'>
          <div className='container-profile_card-header'>
            <img src={default_profile_pic} alt="profile pic"/>
          </div>
          <div className='container-profile_card-body'>
            <div className='card-profile_name'>Mohamad Sakr</div>
            <div className='card-profile_email'>MohamadSakr1996@gmail.com</div>
          </div>
          <div className='container-profile_card-footer'>
            <button className='card-profile_name' type='button'>Change Profile Picture</button>
          </div>
        </div>
        <div className='container-profile_information'>
          <div className='basic-information'> basic info</div>
          <div className='security'>sicurity</div>
        </div>
      </div>
    </div>
  )
}
