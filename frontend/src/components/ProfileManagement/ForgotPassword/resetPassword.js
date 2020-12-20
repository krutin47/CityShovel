/**
 * @file Reset User Password component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetUserPassword } from "../../../actions/authActions";
import classnames from "classnames";

import './ForgotPassword.css';

class ResetPassword extends Component {
    constructor (props) {
        super(props);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);

        this.state = {
            reset_: '',
            password: '',
            confirmPassword: '',
            formErrors: { password: '', confirmPassword: ''},
            passwordValid: false,
            passwordTouch: false,
            confirmPasswordValid: false,
            confirmPasswordTouch: false,
            formValid: false,
            errors: {},
            success: '',
            success_msg: '',
        }

        this.reset = '';
    }

    componentDidMount() {
        var url_string = window.location.href;
        console.log("ResetPassword -> componentDidMount -> url_string", url_string)
        var url = new URL(url_string);
        console.log("ResetPassword -> componentDidMount -> url", url)
        this.reset = url.searchParams.get("reset");
        console.log("ResetPassword -> componentDidMount -> reset", this.reset)
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name + ' ---> ', value);
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
      
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
      
        switch(fieldName) {
            case 'password':
                this.setState({passwordTouch : true});
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid 
                    ? <p className="isValid">Awesome! Password is valid</p>
                    : <p className="has-error">Please Enter a valid Password</p>;
                if(this.state.confirmPasswordTouch) {
                    confirmPasswordValid = (this.state.password === this.state.confirmPassword) ? true : false ;
                    fieldValidationErrors.confirmPassword = confirmPasswordValid
                        ? <p className="isValid">Great! confirm Password is same</p>
                        : <p className="has-error">Confirm Password did not match</p>;
                }
                break;
            case 'confirmPassword':
                this.setState({confirmPasswordTouch : true});
                confirmPasswordValid = (this.state.password === this.state.confirmPassword) ? true : false ;
                fieldValidationErrors.confirmPassword = confirmPasswordValid 
                    ? <p className="isValid">Great! confirm Password is same</p>
                    : <p className="has-error">Confirm Password did not match</p>;
                break;
            default:
                break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid
                      }, this.validateForm);
    }
    
    validateForm() {
        console.log(this.state.passwordValid && this.state.confirmPasswordValid);
        this.setState({formValid: this.state.passwordValid && this.state.confirmPasswordValid});
    }
      
    errorClass(error) {
        return(error ? 'is_valid' : 'has_error');
    }

    onSubmitForm(e){
        e.preventDefault();

        if(this.state.formValid) {
            console.log("ResetPassword -> onSubmitForm -> this.state.formValid", this.state.formValid)
            console.log("ResetPassword -> onSubmitForm -> this.state.reset", this.state.reset)
            
            const employee = {
                password: this.state.password,
                _token: this.reset
            }
            console.log("ResetPassword -> onSubmitForm -> employee", employee)

            this.props.resetUserPassword(employee, this.props.history);
        }
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
                <b>Reset Password</b>
              </div>
              
              {/* Register Form Component */}
              <div>
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-label-group">
                                <div>
                                    <label htmlFor="password">Password</label>
                                    {/* // TODO: change class dynamically to manipulate the border of the input */}
                                    <input className={ classnames("form-control", { is_valid: this.state.passwordValid && this.state.passwordTouch , has_error: !this.state.passwordValid && this.state.passwordTouch })}
                                        type="password"
                                        name="password"
                                        placeholder="Please Enter Your Password"
                                        value={this.state.password}
                                        onChange={this.handleUserInput} required />
                                    {this.state.formErrors.password}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-label-group">
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    {/* // TODO: change class dynamically to manipulate the border of the input */}
                                    <input className={ classnames("form-control", { is_valid: this.state.confirmPasswordValid && this.state.confirmPasswordTouch , has_error: !this.state.confirmPasswordValid && this.state.confirmPasswordTouch }) }
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Please Confirm Your Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleUserInput} required />
                                    {this.state.formErrors.confirmPassword}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Button className="btn btn-success pull-right" block 
                                bsSize="large" 
                                type="submit" 
                                disabled={!this.state.formValid}
                                onClick={this.onSubmitForm}>Submit</Button>
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Body End */}
      </div>
    )
  }
}

ResetPassword.propTypes = {
  resetUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { resetUserPassword })(withRouter(ResetPassword));