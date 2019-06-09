import React, { Component } from 'react';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Profile from '../components/Profile';
import Events from '../components/Events';

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
                                <Panel title="Update Password" styleName="">
                                    <form className="proto-form">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={this.handleInput}
                                            placeholder="Current Password"
                                            autoComplete="current-password"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={this.handleInput}
                                            placeholder="New Password"
                                            autoComplete="current-password"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={this.handleInput}
                                            placeholder="Confirm Password"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            className="proto-btn"
                                            onClick={this.handleSubmit}
                                            type="submit"
                                        >
                                            Change Password
                                        </button>
                                    </form>
                                </Panel>
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
