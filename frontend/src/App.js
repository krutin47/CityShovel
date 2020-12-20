/**
 * @file The root file for calling all the React Components
 * @authors Milap Bhaderi, Nikita Patel, Yash Shah and Krutin Trivedi
*/


import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//importing the required components
import NavHeader from './components/Navbar/NavHeader';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';

// import Login from './components/ProfileManagement/Login/login';
// import Register from './components/ProfileManagement/Registration/register';
// import Forgot_password from './components/ProfileManagement/ForgotPassword/ForgotPassword';
// import resetPassword from './components/ProfileManagement/ForgotPassword/resetPassword';
import HouseOwnerDashboard from "./components/HouseOwnerDashboard/HouseOwnerDashboard";
// import ShovelerDashboard from "./components/ShovelerDashboard/ShovelerDashboard";

// import PrivateRoute from "./components/private-route/PrivateRoute";

//Error pages
import error400 from "./components/error/error400";
import error404 from "./components/error/error404";

//importing CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.css'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	
	console.log("App.js -> localStorage.jwtToken ------> ", localStorage.jwtToken);
	
	// Set auth token header auth
  	const token = localStorage.jwtToken;
  	setAuthToken(token);
	console.log("App.js -> localStorage.jwtToken -> token ------> ", token);
	  
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	console.log("App.js -> localStorage.jwtToken -> decoded ------> ", decoded);
		
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	
	console.log("App.js -> localStorage.jwtToken -> decoded.exp < currentTime ------> ", decoded.exp < currentTime);

	if (decoded.exp < currentTime) {
		
		console.log("App.js -> localStorage.jwtToken -> decoded.exp < currentTime ------> ", decoded.exp < currentTime);
		
		// Logout user
		store.dispatch(logoutUser());
		
		// Redirect to login
		window.location.href = "./login";
  	}
}


class App extends Component{
    render() {
		return (
			<Provider store={store}>
				<Router>
					{/* creating Toasts in the Application */}
					<ToastContainer />
					
					{/* This will load the Navbar to all the Components */}
					<NavHeader />
					
					{/* Home Component */}
					<Route exact path='/' component={HouseOwnerDashboard} />
					
					{/* <Route path='/request' component={RequestQuote} /> */}
					{/* <Route path='/job_display' component={JobDisplay} /> */}
					
					{/* Authentication Components */}
					{/* <Route path='/login' component={Login} /> */}
					{/* <Route path='/register' component={Register} /> */}
					{/* <Route path='/Forgot_password' component={Forgot_password} /> */}

					{/* Private Routes */}
					<Switch>
						{/* Employee Dashboard Component */}
              			{/* <PrivateRoute exact path="/employee_dashboard" component={EmpDashboard} />
						<PrivateRoute exact path='/employee_dashboard' component={EmpDashboard} /> */}
            		</Switch>

					{/* This will the reset Password route */}
					{/* <Route path='/reset_password' component={resetPassword} /> */}

					{/* This are the Error Pages for the application */}
					<Route path='/errorCode400' component={error400} />
					<Route path='/errorCode404' component={error404} />

					{/* This will load the Footer To all Components */}
					<Footer />
				</Router>
			</Provider>
		);
	}
}

export default App;