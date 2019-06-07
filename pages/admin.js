import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class AdminDashboard extends Component {
    static async getInitialProps() {}

    componentWillMount() {}

    render() {
        const { auth } = this.props;
        const user = auth.getProfile();


        if (!user) {
            return <div>Error</div>
        }

        return (
            <div className="page-dashboard">
                <Navbar auth={auth} />
                <div className="content">
                    <div className="container">
                        <h2>Admin Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                            <Panel title="Applicants" styleName="no-padding">

                            </Panel>
                            <Panel title="Recruitment" styleName="no-padding">

                            </Panel>
                            </div>
                            <div className="main-content">
                                <Panel title="Create Event" styleName="">

                                </Panel>
                                <Panel title="Create Post" styleName="">

                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(AdminDashboard);
