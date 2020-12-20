/**
 * @file Dynamic Navbar component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

 //importing Components & required Modules
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

//importing CSS
import './NavHeader.css'


function UserNavbar(props) {
    console.log("props ----------> ", props);
    function onClickLogout(e) {
        e.preventDefault();
        console.log('The logout button was clicked.');
        props.logoutUser();
    } 
    return (
        <nav className="navbar navbar-expand-lg navbar-dark headerMain justify-content-between fixed-top px-5">
            <div className="siteLogo fl">
                <Link className="navbar-brand" to="/"><img src={require('../../assets/images/Sitelogo.png')} alt=""/></Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse pr-5" id="navbarNavDropdown">
                <ul className="navbar-nav justify-content-between">
                    <li className="nav-item active">
                        <Link className="nav-link mx-3" to="/user_schedule_display">DASHBOARD</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link mx-3" to="/availability_form">AVAILABILITY</Link>
                    </li>
                    <li className="nav-item dropdown active ml-3">
                        <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            PROFILE
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/Admin_update_profile">UPDATE PROFILE</Link>                           
                            <Link className="dropdown-item" to="/Remove_profile">REMOVE PROFILE</Link>
                            <Link className="dropdown-item" to='' onClick={onClickLogout}>LOGOUT</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

// //TODO :: update the Admin Navbar according to your need..
function AdminNavbar(props) {
    function onClickLogout(e) {
        e.preventDefault();

        props.logoutUser();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark headerMain justify-content-between fixed-top px-5">
            <div className="siteLogo fl">
                <Link className="navbar-brand" to="/"><img src={require('../../assets/images/Sitelogo.png')} alt=""/></Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse pr-5" id="navbarNavDropdown">
                <ul className="navbar-nav justify-content-between">
                    <li className="nav-item active mx-2">
                        <Link className="nav-link" to="/admin_schedule_display">DASHBOARD</Link>
                    </li>
                    <li className="nav-item active dropdown mx-2">
                        <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            EMPLOYEE
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/availability_display">AVAILABILITY</Link>
                        </div>
                    </li>
                    <li className="nav-item active dropdown mx-2">
                        <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            INSERT
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/admin_schedule_form">SHIFTS</Link>
                            <Link className="dropdown-item" to="/add_location">LOCATION</Link>
                            <Link className="dropdown-item" to="/job_form">JOB</Link>
                        </div>
                    </li>
                    <li className="nav-item active dropdown ml-2">
                        <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            PROFILE
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/Admin_update_profile">UPDATE PROFILE</Link>                           
                            <Link className="dropdown-item" to="/Remove_profile">REMOVE PROFILE</Link>
                            <Link className="dropdown-item" to='' onClick={onClickLogout}>LOGOUT</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function GuestNavbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark headerMain justify-content-between fixed-top px-5">
            <div className="siteLogo fl">
                <Link className="navbar-brand" to="/"><img src={require('../../assets/images/Sitelogo.png')} alt=""/></Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active px-2">
                        <Link className="nav-link" to="/">HOME</Link>
                    </li>
                    <li className="nav-item active px-2">
                        <a className="nav-link" href="/#_service_">SERVICES</a>
                    </li>
                    <li className="nav-item active px-2">
                        <a className="nav-link" href="/#contact_us">CONTACT US</a>
                    </li>
                    <li className="nav-item active px-2">
                        <Link className="nav-link" to="/job_display">JOBS</Link>
                    </li>
                    <li className="nav-item active ml-5 border border-success rounded">
                        <Link className="nav-link" to="/login"><strong id="quote">SIGN IN</strong></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

// // TODO :: Get status of the user and infalte the layout accordingly..

class NavHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isAdmin: false,
            isEmployee: false,
            isGuest: true,
            errors: {},
            auth: {},
        };
    }

    componentDidMount() {

        this.setState({
            auth: this.props.auth,
        })

        if(this.props.auth.isAuthenticated) {
            this.setState({ 
                isLoggedIn: true,
                isAdmin: false,
                isEmployee: false,
            });
            console.log("navbar is authenticated....");
            console.log("nextProps.auth.user.role -----------> ", this.props.auth.user.role);
            
            if(this.props.auth.user.role === 1) {
                //this is employee
                this.setState({
                    isEmployee: true,
                    isGuest: false,
                    isAdmin: false
                });
            } else {
                //this is admin
                this.setState({
                    isAdmin: true,
                    isEmployee: false,
                    isGuest: false
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({ 
                isLoggedIn: true,
                isAdmin: false,
                isEmployee: false,
            });
            console.log("navbar is authenticated....");
            console.log("nextProps.auth.user.role -----------> ", nextProps.auth.user.role);
            
            if(nextProps.auth.user.role === 1) {
                //this is employee
                this.setState({
                    isEmployee: true,
                    isGuest: false,
                    isAdmin: false
                });
            } else {
                //this is admin
                this.setState({
                    isAdmin: true,
                    isEmployee: false,
                    isGuest: false
                });
            }
        } else {
            //this is guest
            this.setState({
                isLoggedIn: false,
                isAdmin: false,
                isEmployee: false,
                isGuest: true,
            });
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        // console.log(this.state);
        if (this.state.isLoggedIn) {
            if(this.state.isAdmin) {
                return <AdminNavbar {...this.props}/>;
            } else if (this.state.isEmployee) {
                console.log("I am in the UserNavbar");
                return <UserNavbar {...this.props}/>;
            }
        } else {
            console.log("I am in the guestNavbaar");
            return <GuestNavbar />;
        }
    }
}

NavHeader.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavHeader));