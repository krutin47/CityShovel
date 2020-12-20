/**
 * @file User Update Profile component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React, { Component } from 'react';

import UserUpdateProfileForm from "./User_updateProfileForm";

import './updateProfile.css';

class UserUpdateProfile extends Component {

  render () {
    return (

      <div>
        {/* Body Section */}
        <div className="max_window">
          
          {/* Login Container */}
          <div className="updateProfile__Container">
            
            {/* Imaage View */}
            <div className="image_view">
              <img src={require('../../../assets/images/profilePage.jpg')} alt=""/>
            </div>
            
            {/* Form Container */}
            <div className="register--form_container">
              
              {/* Register Text */}
              <div className="login_text">
                <b>Update Profile</b>
              </div>
              
              {/* Register Form Component */}
              <UserUpdateProfileForm/>
              
            </div>
          </div>
        </div>
        {/* Body End */}

       
      </div>
    )
  }
}

export default UserUpdateProfile;