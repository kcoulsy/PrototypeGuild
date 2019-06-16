import React, { Component } from 'react';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';

class Profile extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    render() {
        const { auth } = this.props;
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                <UserProfile id={this.props.id}  auth={auth} canEdit/>
                </div>
            </div>
        )
    }
}

export default withAuth(Profile);
