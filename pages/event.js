import React, { Component, Fragment } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class Event extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    state = {
        event: {},
        isLoading: true
    };

    componentDidMount() {
        this.fetchEvent();
    }

    fetchEvent = () => {
        const { auth, id } = this.props;
        this.setState({ isLoading: true });

        auth.api('get', '/events/find', {
            data: {
                id
            }
        }).then(res => {
            this.setState({
                event: res[0],
                isLoading: false
            });
        });
    };

    acceptEvent = ev => {
        const { auth, id } = this.props;
        ev.preventDefault();
        auth.api('patch', `/event/attend`, {
            data: {
                _id: id
            }
        }).then(() => {
            this.fetchEvent();
        });
    };

    declineEvent = ev => {
        const { auth, id } = this.props;
        ev.preventDefault();
        auth.api('patch', `/event/unattend`, {
            data: {
                _id: id
            }
        }).then(() => {
            this.fetchEvent();
        });
    };

    render() {
        const { event, isLoading } = this.state;
        const { auth } = this.props;
        let tanks = [];
        let healers = [];
        let melees = [];
        let rangeds = [];
        if (event && event.attendance) {
            tanks = event.attendance.filter(user => {
                return user.playerRole === 'tank';
            });
            healers = event.attendance.filter(user => {
                return user.playerRole === 'healer';
            });
            melees = event.attendance.filter(user => {
                return user.playerRole === 'melee';
            });
            rangeds = event.attendance.filter(user => {
                return user.playerRole === 'ranged';
            });
        }
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Event" styleName="panel-md">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <table className="proto-table">
                                    <tbody>
                                        <tr>
                                            <td>{upperFirst(event.title)}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {upperFirst(event.description)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {moment(event.date).format(
                                                    'dddd, MMMM Do YYYY'
                                                )}
                                            </td>
                                        </tr>
                                        {event.createdBy && (
                                            <tr>
                                                <td>
                                                    Event created By:
                                                    <Link
                                                        href={`/profile?id=${
                                                            event.createdBy._id
                                                        }`}
                                                    >
                                                        {upperFirst(
                                                            event.createdBy
                                                                .characterName
                                                        )}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <h2>Signed Up</h2>
                                <table className="proto-table">
                                    <thead>
                                        <tr>
                                            <td>Tanks</td>
                                            <td>Healers</td>
                                            <td>Melee</td>
                                            <td>Ranged</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ul>
                                                    {tanks.map(player => {
                                                        return (
                                                            <Link
                                                                href={`/profile?id=${
                                                                    player._id
                                                                }`}
                                                                key={player._id}
                                                            >
                                                                <li>
                                                                    {
                                                                        player.characterName
                                                                    }
                                                                </li>
                                                            </Link>
                                                        );
                                                    })}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    {healers.map(player => {
                                                        return (
                                                            <Link
                                                                href={`/profile?id=${
                                                                    player._id
                                                                }`}
                                                                key={player._id}
                                                            >
                                                                <li>
                                                                    {
                                                                        player.characterName
                                                                    }
                                                                </li>
                                                            </Link>
                                                        );
                                                    })}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    {melees.map(player => {
                                                        return (
                                                            <Link
                                                                href={`/profile?id=${
                                                                    player._id
                                                                }`}
                                                                key={player._id}
                                                            >
                                                                <li>
                                                                    {
                                                                        player.characterName
                                                                    }
                                                                </li>
                                                            </Link>
                                                        );
                                                    })}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    {rangeds.map(player => {
                                                        return (
                                                            <Link
                                                                href={`/profile?id=${
                                                                    player._id
                                                                }`}
                                                                key={player._id}
                                                            >
                                                                <li>
                                                                    {
                                                                        player.characterName
                                                                    }
                                                                </li>
                                                            </Link>
                                                        );
                                                    })}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button
                                    className="proto-btn"
                                    onClick={this.acceptEvent}
                                >
                                    Accept
                                </button>
                                <button
                                    className="proto-btn"
                                    onClick={this.declineEvent}
                                >
                                    Decline
                                </button>
                            </>
                        )}
                    </Panel>
                </div>
            </div>
        );
    }
}

export default withAuth(Event);
