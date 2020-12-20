/**
 * @file Forgot User Password component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotUserPassword } from "../../../actions/authActions";

import './ForgotPassword.css';

class ForgotPassword extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: ''},
      emailValid: false,
      emailTouch: false,
      formValid: false
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }
    
  handleUserInput = (e) => {
    const name = e.target.name;
    console.log('this is:', name);
    const value = e.target.value;
    console.log('this is:', value);
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
    
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
  
    switch(fieldName) {
        case 'email':
            this.setState({emailTouch: true});
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = 
              emailValid 
                ? <p className="isValid">Sweet! Email Id is valid</p> 
                : <p className="has-error">Please Enter a valid Email Id</p>;
            break;
        default:
            break;
    }
    
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }
    
  errorClass(error) {
    return(error.length === 0 ? 'is_valid' : 'has_error');
  }

  onClickSubmit(e) {
    e.preventDefault();

    this.props.forgotUserPassword({email: this.state.email}, this.props.history);    
  }
  
  render () {
    return (
      <div>
        {/* Body Section */}
        <div className="full_window">
          
          {/* Login Container */}
          <div className="forgot_container">
            
            {/* Imaage View */}
            <div className="image_view">
              <img src={require('../../../assets/images/forgotPassword_1.jpg')} alt=""/>
            </div>
            
            {/* Form Container */}
            <div className="Forgot__form-container">
              
              {/* Register Text */}
              <div className="login_text">
                <b>Forgot Password</b>
              </div>
              
              {/* Register Form Component */}
              <div>
                <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-label-group">
                          <div>
                              <label htmlFor="email">Email</label>
                              {/* // TODO: change class dynamically to manipulate the border of the input */}
                              <input className={'form-group ' + (this.errorClass(this.state.formErrors.email))} 
                                  type="email" 
                                  name="email"
                                  placeholder="Please Enter Your Email ID"
                                  value={this.state.email}
                                  onChange={this.handleUserInput} required />
                              {this.state.formErrors.email}
                            </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <Button className="btn btn-success pull-right" block 
                          bsSize="large" 
                          type="submit" 
                          disabled={!this.state.formValid}
                          onClick={this.onClickSubmit}>Submit</Button>
                      </div>
                    </div>
                </form>
              </div>
              
              {/* Login Link */}
              <div className="register_navigation">
                <Link to="/login">Remebered your Password? <u>Login Here</u></Link>
              </div>
            </div>
          </div>
        </div>
        {/* Body End */}
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  forgotUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { forgotUserPassword })(withRouter(ForgotPassword));