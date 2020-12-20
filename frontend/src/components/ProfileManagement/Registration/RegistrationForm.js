/**
 * @file Register User Form component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React from 'react';
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import { toast } from 'react-toastify';

import './Register.css';

const isEmpty = require("is-empty");

//TODO: Database connection and sending and requesting the info
class RegistrationForm extends React.Component {
    constructor (props) {
        super(props);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            formErrors: {email: '', password: '', confirmPassword: ''},
            emailValid: false,
            emailTouch: false,
            passwordValid: false,
            passwordTouch: false,
            confirmPasswordValid: false,
            confirmPasswordTouch: false,
            formValid: false,
            errors: {},
            success: '',
            success_msg: '',
        }
    }
     
    componentWillReceiveProps(nextProps) {
        let fieldValidationErrors = this.state.formErrors;
        
        console.log("nextProps ------> ", nextProps);
        console.log("nextProps.success ------> ", nextProps.success);
        console.log("nextProps.errors ------> ", nextProps.errors);

        if(!isEmpty(nextProps.success)) {
            console.log("Goinng to LOGIN..........!!!!!!");
            this.setState({
                success: nextProps.success,
            });
            toast.success("you are Register.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.props.history.push("/login");
        } 
        
        if (!isEmpty(nextProps.errors)) {
            console.log("printing the ERRORS..........!!!!!!");

            fieldValidationErrors.email = <p className="has-error">Oops..!! Email id is already taken</p>;
            fieldValidationErrors.password = '';
            fieldValidationErrors.confirmPassword = '';
            
            this.setState({
                password: '',
                confirmPassword: '',
                emailValid: false,
                passwordValid: false,
                passwordTouch: false,
                confirmPasswordValid: false,
                confirmPasswordTouch: false,
                formErrors: fieldValidationErrors,
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if(this.props.auth.user.role === 1) {
                this.props.history.push("/employee_dashboard"); // push user to Employee dashboard when Employee login
            } else if (this.props.auth.user.bind === 2){
                this.props.history.push("/admin_dashboard"); // push user to Admin dashboard when Admin login
            }
        }
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
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
      
        switch(fieldName) {
            case 'email':
                this.setState({emailTouch : true});
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid 
                    ? <p className="isValid">Sweet! Email Id is valid</p> 
                    : <p className="has-error">Please Enter a valid Email Id</p>;
                break;
            case 'password':
                this.setState({passwordTouch : true});
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid 
                    ? <p className="isValid">Awesome! Password is valid</p>
                    : <p className="has-error">Please Enter Password with more then 6 letter</p>;
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
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid
                      }, this.validateForm);
    }
    
    validateForm() {
        console.log((this.state.emailValid && this.state.passwordValid) && this.state.confirmPasswordValid);
        this.setState({formValid: (this.state.emailValid && this.state.passwordValid) && this.state.confirmPasswordValid});
    }
      
    errorClass(error) {
        return(error ? 'is_valid' : 'has_error');
    }

    onSubmitForm(e){
        e.preventDefault();

        if(this.state.formValid) {

            const employee = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }

            this.props.registerUser(employee, this.props.history);
        }
    }

    render(){
        return(
            <form>  
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className="form-control"
                                    type="text"  
                                    name="firstName"
                                    placeholder="Please Enter Your First Name"
                                    value={this.state.firstName}  
                                    onChange={this.handleUserInput} required />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className="form-control"
                                    type="text"   
                                    name="lastName"
                                    placeholder="Please Enter Your Last Name"
                                    value={this.state.lastName}  
                                    onChange={this.handleUserInput} required />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="email">Email address</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className= { classnames("form-control", { is_valid: this.state.emailValid && this.state.emailTouch , has_error: !this.state.emailValid && this.state.emailTouch })} 
                                    type="email" 
                                    name="email"
                                    placeholder="Please Enter Your Email ID"
                                    value={this.state.email}
                                    onChange={this.handleUserInput}  required/>
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
                        <Button className="btn pull-right" block 
                            type="submit" 
                            disabled={!this.state.formValid} 
                            onClick={this.onSubmitForm} >Register</Button>
                    </div>
                </div>
            </form>
        );
    }
}

RegistrationForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    success: state.success
});

export default connect(mapStateToProps, { registerUser })(withRouter(RegistrationForm));