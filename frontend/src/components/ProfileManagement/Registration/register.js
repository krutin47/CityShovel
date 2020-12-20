/**
 * @file Register User component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

class Register extends Component {

  render () {
    return (

      <div>
        {/* Body Section */}
        <div className="full_window">
          
          {/* Login Container */}
          <div className="register_container">
            
            {/* Imaage View */}
            <div className="image_view">
              <img src={require('../../../assets/images/profilePage.jpg')} alt=""/>
            </div>
            
            {/* Form Container */}
            <div className="register--form_container">
              
              {/* Register Text */}
              <div className="login_text">
                <b>Register</b>
              </div>
              
              {/* Register Form Component */}
              <RegistrationForm/>
              
              {/* Login Link */}
              <div className="register_navigation">
                <Link to="/login"><u>Already have an account? Login Here</u></Link>
              </div>
            </div>
          </div>
        </div>
        {/* Body End */}

      </div>
    )
  }
}

export default Register;