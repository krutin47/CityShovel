/**
 * @file Error page with status code of 400 for the Application.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

//importing Components & required Modules
import React from 'react';

function Error400(props) {
  return (
    <React.Fragment>
      <section id="error_400" className="oneColumnSection p100-0 forUp">
        <div className="wrapper">
          <div className="text-center wow fadeInDown ">
            <h1 className="display-2">Error!! CODE: 400</h1>
            <div className="p40-0 forSmallWidth light">
              {/* //TODO :: Add content in the P tag */}
              <h5>We are sorry... but it looks like you are doing something wrong.!</h5>
              <h5>Or maybe we are currently working on this page..!</h5>
            </div>        
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Error400;