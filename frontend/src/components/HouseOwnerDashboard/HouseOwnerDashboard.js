//importing Components & required Modules
import React, { Component } from 'react'
import CardView from '../CardView/CardView';
import axios from "axios";

export class HouseOwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avg_HouseOwner: [],
            houseOwners: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/userfeature/fetch_avg_shoveler")
            .then((res) => {
                if (res.data.length > 0) {
                    console.log("<-----Response Data------>");
                    console.log(res.data);
                    this.setState({ avg_HouseOwner: res.data });
                } else {
                    this.props.history.push("/errorCode400");
                }
            })
            .catch((err) => {
                this.props.history.push("/errorCode400");
            });
        

        axios.get("http://localhost:5000/userfeature/fetch_shoveler")
            .then((res) => {
                if (res.data.length > 0) {
                    console.log("<-----Response Data------>");
                    console.log(res.data);
                    this.setState({ houseOwners: res.data });
                } else {
                    this.props.history.push("/errorCode400");
                }
            })
            .catch((err) => {
                this.props.history.push("/errorCode400");
            });
    }
    
    render() {
        return (
            <div>
                {/* Body Div */}
                <h3>Top Rated House Owners</h3>
                <CardView data={this.state.avg_HouseOwner}/>

                <h3>All House Owners in your area</h3>
                <CardView data={this.state.houseOwners}/>
                {/* Body End */}
            </div>
        )
    }
}

export default HouseOwnerDashboard;