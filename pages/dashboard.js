import React, { Component } from 'react';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Events from '../components/Events';
import UpdatePassword from '../components/UpdatePassword';

class Dashboard extends Component {
    static async getInitialProps() {}

    render() {
        const { auth } = this.props;
        const user = auth.getProfile();

        if (!user) {
            return <div>Error</div>;
        }

        return (
            <div className="page-dashboard">
                <Navbar auth={auth} />
                <div className="content">
                    <div className="container">
                        <h2>Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                                <Profile auth={auth} id={user._id} />
                                <UpdatePassword auth={auth} requirePrevious/>
                            </div>
                            <div className="main-content">
                            <Events auth={auth} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Dashboard);
