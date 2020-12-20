/**
 * @file Login User component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

import React from 'react';
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";

import './logintheme.css';

// //TODO: Database connection and sending and requesting the info
class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          emailTouch: false,
          passwordValid: false,
          passwordTouch: false,
          formValid: false,
          loginErrors: {},
        }
        
        // this.errors = false;
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
        //this.toChangeState = this.toChangeState.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("nextProps ------> ", nextProps);
        console.log("nextProps ------> ", this.state);
        console.log("nextProps ------> ", this.props);
        if (nextProps.auth.isAuthenticated) {
            if(nextProps.auth.user.role === 1) {
                this.props.history.push("/employee_dashboard"); // push user to Employee dashboard when Employee login
            } else if (nextProps.auth.user.role === 2){
                this.props.history.push("/admin_dashboard"); // push user to Admin dashboard when Admin login
            }
        } else {
            console.log("this.state.errors ----> ", this.state.loginErrors);
            this.state.loginErrors = nextProps.errors;
            //this.state.loginErrors = nextProps.errors;
            console.log("this.state.errors ----> ", this.state.loginErrors);
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if(this.props.auth.user.role === 1) {
                this.props.history.push("/employee_dashboard"); // push user to Employee dashboard when Employee login
            } else if (this.props.auth.user.role === 2){
                this.props.history.push("/admin_dashboard"); // push user to Admin dashboard when Admin login
            }
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name + ' ---> ', value);
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
      
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
            case 'email':
                this.setState({
                    emailTouch: true
                });
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid 
                    ? <p className="isValid">Sweet! Email Id is valid</p> 
                    : <p className="has-error">Please Enter a valid Email Id</p>;
                break;
            case 'password':
                this.setState({
                    passwordTouch: true
                });
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid 
                    ? <p className="isValid">Awesome! Password is valid</p>
                    : <p className="has-error">Please Enter a valid Password</p>;
                break;
            default:
                break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }
    
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
      
    errorClass(error) {
        return(error.length === 0 ? 'is_valid' : 'has_error');
    }

    onSubmitForm(e){
        e.preventDefault();
        
        if(this.state.formValid) {
            const employee = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.loginUser(employee);
        }
    }

    displayErrors() {
        console.log("this.state.loginErrors ----> ", this.state.loginErrors)
        if(this.state.loginErrors.length > 0) {
            return (<div className='col-md-12'>
                        <div className="">
                            <div className='bg-color--red p-2'>
                                <p>Could not authenticate you. Either your Email ID or password is wrong.!</p>
                            </div>
                        </div>
                    </div>)
        }
    }

    render(){
        const error = ( !(Object.keys(this.state.loginErrors).length === 0 && this.state.loginErrors.constructor === Object) ) 
            ?   <div className='col-md-12'>
                    <div className="">
                        <div className='bg-color--red p-2'>
                            <p>Could not authenticate you. Either your Email ID or password is wrong.!</p>
                        </div>
                    </div>
                </div>
            : '' ;
        console.log("LoginForm -> render -> error", error)
            
        return(
            <form>
                <div className="row">
                    {error}
                    <div className="col-md-12">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="email">Email address</label>
                                {/* // // TODO: change class dynamically to manipulate the border of the input */}
                                <input className= { classnames("form-control", { is_valid: this.state.emailValid && this.state.emailTouch , has_error: !this.state.emailValid && this.state.emailTouch })}
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
                        <Button className="btn pull-right" block 
                            type="submit" 
                            disabled={!this.state.formValid}
                            onClick={this.onSubmitForm}>Login</Button>
                    </div>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginForm));