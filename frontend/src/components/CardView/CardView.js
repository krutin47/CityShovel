import React, {Component} from 'react';
import profilepicture from '../../assets/images/LOGO.png';

var img = ['']

class CardView extends Component {
    render() {
        return this.props.data.map((user) => (
            <div className="card mb-3" style="max-width: 540px;">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={profilepicture} className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user.firstName + user.lastName}</h5>
                            <p className="card-text"><strong>Address: </strong>{user.address}</p>
                            <p className="card-text"><strong>E-mail: </strong>{user.email}</p>
                            <p className="card-text"><strong>Contact: </strong>{user.contact}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }
}

export default CardView;