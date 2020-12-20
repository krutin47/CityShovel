/**
 * @file Footer Component.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importing CSS
import './Footer.css'

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer font-small unique-color-dark">
                <div>  
                    <div className="container">

                    {/* <!-- Grid row--> */}
                    <div className="row py-4 d-flex align-items-center">

                        {/* <!-- Grid column --> */}
                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0">Get connected with us on social networks!</h6>
                        </div>
                        {/* <!-- Grid column --> */}

                        {/* <!-- Grid column --> */}
                        <div className="col-md-6 col-lg-7 text-center text-md-right">

                            {/* <!-- Facebook --> */}
                            <a className="fb-ic">
                                <i className="fa fa-facebook white-text mr-4"> </i>
                            </a>
                            {/* <!-- Twitter --> */}
                            <a className="tw-ic">
                                <i className="fa fa-twitter white-text mr-4"> </i>
                            </a>
                            {/* <!-- Google +--> */}
                            <a className="gplus-ic">
                                <i className="fa fa-google-plus white-text mr-4"> </i>
                            </a>
                            {/* <!--Linkedin --> */}
                            <a className="li-ic">
                                <i className="fa fa-linkedin white-text mr-4"> </i>
                            </a>
                            {/* <!--Instagram--> */}
                            <a className="ins-ic">
                                <i className="fa fa-instagram white-text"> </i>
                            </a>

                        </div>
                        {/* <!-- Grid column --> */}

                    </div>
                    {/* <!-- Grid row--> */}

                    </div>
                </div>

                {/* <!-- Footer Links --> */}
                <div className="container text-center text-md-left mt-5">

                    {/* <!-- Grid row --> */}
                    <div className="row mt-3">

                        {/* <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            {/* <!-- Content --> */}
                            <h6 className="text-uppercase font-weight-bold">Hawk Security</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"></hr>
                            <p>Hawk security. Our security services make the world a safer & friendlier place</p>

                        </div>
                        {/* <!-- Grid column --> */}

                        {/* <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                            {/* <!-- Links --> */}
                            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"></hr>
                            <p>
                            <a href="/">Home</a>
                            </p>
                            <p>
                            <a href="/login">Login</a>
                            </p>
                            <p>
                            <a href="/#_service_">Services</a>
                            </p>
                            <p>
                            <a href="/#contact_us">Contact Us</a>
                            </p>

                        </div>
                        {/* <!-- Grid column --> */}

                        {/* <!-- Grid column --> */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                            {/* <!-- Links --> */}
                            <h6 className="text-uppercase font-weight-bold">Services</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"></hr>
                            <p>
                                <a href="_service_">Healthcare</a>
                            </p>
                            <p>
                                <a href="_services_Commercial">Commercial</a>
                            </p>
                            <p>
                                <a href="_services_industry">Industrial</a>
                            </p>

                        </div>
                        {/* <!-- Grid column --> */}

                        

                        {/* <!-- Grid column --> */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            {/* <!-- Links --> */}
                            <h6 className="text-uppercase font-weight-bold">Contact</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"></hr>
                            <p><i className="fa fa-home mr-3"></i> South Park ST., NS B3J 2K9</p>
                            <p><i className="fa fa-envelope mr-3"></i>hawkdeveloper@g.com</p>
                            <p><i className="fa fa-phone mr-3"></i> +1 (902) 580-5450</p>
                            <p><i className="fa fa-print mr-3"></i> +1 (902) 580-5450</p>
                        </div>
                        {/* <!-- Grid column --> */}

                    </div>
                    {/* <!-- Grid row --> */}

                </div>
                {/* <!-- Footer Links --> */}

                {/* <!-- Copyright --> */}
                 
                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                    <a href="/"> <u>Hawk Security</u></a>
                    . All rights has been reserved.
                </div>
                {/* <!-- Copyright --> */}

            {/* <!-- Footer --> */}
            </footer>
        );
    }
}

export default Footer;