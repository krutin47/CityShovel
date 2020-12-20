/**
 * @file Login User Form component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

class Login extends Component {

  render () {
    return (
      <div>
        {/* Body Section */}
        <div className="full_window">
          
          {/* Login Container */}
          <div className="login_container">
            
            {/* Imaage View */}
            <div className="image_view">
              <img src={require('../../../assets/images/profilePage.jpg')} alt=""/>
            </div>
            
            {/* Form Container */}
            <div className="form_container">
              
              {/* Login Text */}
              <div className="login_text">
                <b>Login</b>
              </div>
              
              {/* Login Form Component */}
              <LoginForm/>
              
              {/* Forgot Password Link */}
              <div className="forgot_navigation">
                <Link to="/Forgot_password"><u>Forgot Password?</u></Link>
              </div>
              
              {/* Register Link */}
              <div className="register_navigation">
                <Link to="/register"><u>Don't have account? Register Here</u></Link>
              </div>
            </div>
          </div>
        </div>
        {/* Body End */}

      </div>
    )
  }
}

export default Login;