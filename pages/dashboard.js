import React, { Component } from 'react';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

class Dashboard extends Component {
    static async getInitialProps() {}

    componentDidMount() {}

    render() {
        const { auth } = this.props;
        return (
            <div className="page-dashboard">
                <Navbar auth={auth} />
                <div className="content">
                    <div className="container">
                        <h2>Dashboard</h2>
                        <div className="dashboard-content">
                            <Panel
                                title="Upcoming Events"
                                styleName="upcoming-events"
                            />
                            <Panel title="Update Password" styleName="settings">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Dashboard);
