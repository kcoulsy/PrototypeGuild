import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class Dashboard extends Component {
    static async getInitialProps() {}

    state = {
        isLoading: true,
        events: []
    };

    componentWillMount() {
        const { auth } = this.props;

        auth.api('get', '/events/find').then(res => {
            this.setState({
                isLoading: false,
                events: res
            });
        });
    }

    render() {
        const { isLoading, events } = this.state;
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
                        <h2>Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                            <Panel title={upperFirst(user.characterName)} styleName="no-padding">
                            <table className="proto-table no-hover">
                                <tbody>
                                    <tr>
                                        <td>Class</td>
                                        <td>{upperFirst(user.playerClass)}</td>
                                    </tr>
                                    <tr>
                                        <td>Role</td>
                                        <td>{upperFirst(user.playerRole)}</td>
                                    </tr>
                                    <tr>
                                        <td>Rank</td>
                                        <td>{upperFirst(user.rank)}</td>
                                    </tr>
                                    <tr>
                                        <td>Professions</td>
                                        <td>
                                            {upperFirst(user.professionOne)}/
                                            {upperFirst(user.professionTwo)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </Panel>
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
                                <Panel title="Upcoming Events" styleName="no-padding">
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        <table className="proto-table">
                                            <tbody>
                                                {events &&
                                                    events.map(event => {
                                                        return (
                                                            <Link
                                                                key={event._id}
                                                                href={`/event?id=${
                                                                    event._id
                                                                }`}
                                                            >
                                                                <tr>
                                                                    <td>
                                                                        {upperFirst(
                                                                            event.title
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {upperFirst(
                                                                            event.type
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {moment(
                                                                            event.date
                                                                        ).format(
                                                                            'dddd, MMMM Do YYYY'
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </Link>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    )}
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Dashboard);
