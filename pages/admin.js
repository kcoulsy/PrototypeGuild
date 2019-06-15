import React, { Component } from 'react';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Events from '../components/Events';
import CreatePost from './../components/admin/CreatePost';
import Applicants from './../components/admin/Applicants';
import Recruitment from './../components/admin/Recruitment';
import PostList from './../components/PostList';

// import Modal from './components/utils/Modal';

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
                                <Recruitment auth={auth} />
                            </div>
                            <div className="main-content">
                                <Events auth={auth} />
                                <CreatePost auth={auth}/>
                                <PostList auth={auth} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(AdminDashboard);
