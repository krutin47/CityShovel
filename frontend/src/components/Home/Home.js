/**
 * @file Home page of the Application.
 * @author Milap Bhanderi, Nikita Patel, Yash Shah & Krutin Trivedi
 */

//importing the required Module
import React from 'react';

function Home() {
  
  return (
    <React.Fragment>

      {/* <!--Banner Section--> */}
      <section className="BannerSection overlay ">
        <div className="wrapper">
          <div className="table">
            <div className="table-cell text-center fontWhite">
              <h1 className="pb10 fontWhite">HAWK SECURITY</h1>
              <p className="pb20"> OUR SECURITY SERVICES MAKE THE WORLD A SAFER & FRIENDLIER PLACE</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!--2 column Right Content Left Image Section--> */}
      <section id="_service_" className="twoColumnSection p70-0 forUp">
        <div className="wrapper">
          <div className="ib w50 pr15 wow fadeInLeft mw100 mr0">
            <h4>Security Guard</h4>
            <h5>Healthcare</h5>
            <div className="p20-0">
              <p>Our Healthcare officers are always eager to serve people. They are all equipped with the knowledge for emergency situation and also knows to use the defibrillator.</p>
            </div>
          </div>
          <div className="ib w50 text-right pl15 wow fadeInRight mw100 mtop30 mobile-center mr0">
            <img src="https://images.squarespace-cdn.com/content/v1/56ae28f9cf80a1c462b624be/1481565679322-2MVB9GOCBZN3FM98WMNU/ke17ZwdGBToddI8pDm48kMS6Ag27B5PiNmuGKFL_Ya9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI4Jb8t-oE2cQnOjGBbWABngHbdRE5IN2-lFfoAl4DPcMKMshLAGzx4R3EDFOm1kBS/security-guard.jpg?format=1500w"/>
          </div>
        </div>
      </section>

      {/* <!--2 column Right Content Left Image Section--> */}
      <section id="_services_Commercial" className="twoColumnSection p70-0 forUp greyBg">
        <div className="wrapper">
          <div className="ib w50 pr15 mw100 mtop30 mobile-center mr0">
            <img src={require('../../assets/images/guard.jpg')}/>
          </div>
          <div className="ib w50 pl15 wow fadeInLeft mw100 mr0">
            <h4>Security Guard</h4>
            <h5>Commercial</h5>
            <div className="p20-0">
              <p>Our Security Guards provides 24/7 service to commercial buildings in various shifts. They are quick, strong and know how to use the taser gun when necessary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!--3 column Section--> */}
      <section id="_services_industry" className="threeColumnSection altBg p100-0 forUp">
        <div className="wrapper">
          <div className="capitalize fontWhite pb70 text-center ">
            <h3 className="fontWhite">Industry</h3>
          </div>
          <div className="threeColumnParent text-center fontWhite clearfix">
            <div className="Column fl w33 rowHeight tabw100">
              <div className="ServiceImage">
                <img src={require('../../assets/images/hospital.png')}/>
              </div>
              <h6 className="equalHeight fontWhite"> Healthcare </h6>
            </div>
            <div className="Column fl w33 rowHeight tabw100">
              <div className="ServiceImage">
                <img src={require("../../assets/images/office-block.png")}/>
              </div>
              <h6 className="equalHeight fontWhite"> Commercial </h6>
              
            </div>
            <div className="Column fl w33 rowHeight tabw100">
              <div className="ServiceImage">
                <img src={require("../../assets/images/crane.png")}/>
              </div>
              <h6 className="equalHeight fontWhite"> Infrastructure </h6>
              
            </div>
          </div>
          <div className="p40-0 text-center fontWhite">
            <p>We are all prepared to serve our clients with our security guards who are well-knowledged of using medical 
                equipment and equipped with security weapons to control emergency situations. 
                Their experience of working gives us the power to provide the best service.</p>
          </div>
        </div>
      </section>
      
      {/* <!-- 1  coloumn  Section--> */}
      <section id="contact_us" className="oneColumnSection p100-0 forUp">
        <div className="wrapper">
          <div className="text-center wow fadeInDown">
            <h3>Let's Chat</h3>
            <div className="p40-0 forSmallWidth light">
              <p>Interested for our services? Explore our plans and services. Adjust your requirements and get a ballpark quote of our services.</p>
            </div>
            <div className="button">
              <a href="/request">Request a Quote</a>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  );
}

export default Home;