import React, { Component } from 'react';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import CreateEvent from './../components/admin/CreateEvent';
import Applicants from './../components/admin/Applicants';

class AdminDashboard extends Component {
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
                        <h2>Admin Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                                <Applicants auth={auth} />
                                <Panel
                                    title="Recruitment"
                                    styleName="no-padding"
                                />
                            </div>
                            <div className="main-content">
                                <CreateEvent />
                                <Panel title="Create Post" styleName="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(AdminDashboard);
