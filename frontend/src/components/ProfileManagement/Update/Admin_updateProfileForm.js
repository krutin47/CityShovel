/**
 * @file Admin Update Profile Form component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React from 'react';
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/authActions";
import Axios from 'axios';

//TODO: Database connection and sending and requesting the info
class AdminUpdateProfileForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address:'',
            phone:'',
            gender:'',
            formErrors: {address: '', phone: '', gender: ''},
            addressValid: false,
            addressTouch: false,
            phoneValid: false,
            phoneTouch: false,
            genderValid: false,
            genderTouch: false,
            formValid: false
        }

        this.onclickUpdate = this.onclickUpdate.bind(this);
    }

    componentDidMount(){
        Axios.get("/employee/check" + this.props.auth.user.id)
            .then(employee => {
                this.setState({
                    firstName: employee.data.firstName,
                    lastName: employee.data.lastName,
                    address: employee.data.address,
                    phone: (employee.data.phone === 0) ? '' : employee.data.phone,
                    gender: employee.data.gender,
                })
            })
            .catch(err => console.log('Error: ' + err));
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
        let addressValid = this.state.addressValid;
        let phoneValid = this.state.phoneValid;
        let genderValid = this.state.genderValid;
      
        switch(fieldName) {
            case 'address':
                this.setState({
                    addressTouch: true
                });
                addressValid = value.length > 0 && value.length < 50;
                fieldValidationErrors.address = 
                    addressValid 
                        ? <p className="isValid">Sweet! address is filled</p> 
                        : '';
                break;
            case 'phone':
                this.setState({
                    phoneTouch: true
                });
                phoneValid = value.length >= 14;
                fieldValidationErrors.phone = 
                    phoneValid 
                        ? <p className="isValid">Awesome! phone number is valid</p>
                        : <p className="has-error">Please Enter a valid phone number</p>;
                break;
            case 'gender':
                this.setState({
                    genderTouch: true
                });
                genderValid = this.state.gender === "male" || this.state.gender === "female" || this.state.gender === "other";
                fieldValidationErrors.gender = 
                    genderValid 
                        ? <p className="isValid">Awesome!</p>
                        : <p className="has-error">Please select a valid gender</p>;
                break;
            default:
                break;
        }
        
        this.setState({formErrors: fieldValidationErrors,
                        addressValid: addressValid,
                        phoneValid: phoneValid,
                        genderValid: genderValid
                      }, this.validateForm);
    }
    
    validateForm() {
        this.setState({formValid: true});
    }
      
    errorClass(error) {
        return(error.length === 0 ? 'is_valid' : 'has_error');
    }

    onclickUpdate(e) {
        e.preventDefault();

        console.log("id ------> ", this.props.auth.user.id);
        
        const user = {
            id: this.props.auth.user.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phone: this.state.phone,
            gender: this.state.gender,
        }

        console.log("UserUpdateProfileForm -> onclickUpdate -> user", user)

        this.props.updateUser(user, this.props.history);
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
                                <input type="text" required className="form-control" name="firstName"
                                    placeholder={this.state.firstName}
                                    value={this.state.firstName}  
                                    onChange={this.handleUserInput} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input type="text" required className="form-control" name="lastName"
                                    placeholder="Please Enter Your Last Name"
                                    value={this.state.lastName}  
                                    onChange={this.handleUserInput} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="address">Address</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className={'form-control ' + (this.errorClass(this.state.formErrors.address))} 
                                    type="text" 
                                    name="address"
                                    placeholder="Please Enter Your address"
                                    value={this.state.address} 
                                    onChange={this.handleUserInput} />
                                {this.state.formErrors.address}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="phone">phone</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className={`form-control ${this.errorClass(this.state.formErrors.phone)}`} 
                                    type="text" 
                                    name="phone"
                                    placeholder="Please Enter Your phone number with country code"
                                    value={this.state.phone}
                                    onChange={this.handleUserInput}  />
                                {this.state.formErrors.phone}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-label-group">
                            <div>
                                <label htmlFor="gender">Gender</label>
                                {/* // TODO: change class dynamically to manipulate the border of the input */}
                                <input className={`form-control ${this.errorClass(this.state.formErrors.gender)}`} 
                                    type="text" 
                                    name="gender"
                                    placeholder="Please select Your gender"
                                    value={this.state.gender}
                                    onChange={this.handleUserInput}  />
                                {this.state.formErrors.gender}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <Button className="btn pull-right" block 
                            type="submit" 
                            disabled={!this.state.formValid}
                            onClick={this.onclickUpdate}>Update</Button>
                    </div>
                </div>
            </form>
        );
    }
}

AdminUpdateProfileForm.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { updateUser })(withRouter(AdminUpdateProfileForm));