import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';

import CreateEvent from './admin/CreateEvent';
import Modal from './utils/Modal';
import Panel from './Panel';
import Loader from './Loader';

export default class Events extends Component {
    state = {
        isLoading: true,
        events: [],
        createModalOpen: false
    };

    componentWillMount() {
        this.fetchEvents();
    }

    fetchEvents = () => {
        const { auth } = this.props;

        auth.api('get', '/events/find').then(res => {
            this.setState({
                isLoading: false,
                events: res
            });
        });
    };

    render() {
        const { auth } = this.props;
        const { isLoading, events } = this.state;
        return (
            <Panel styleName="no-padding">
                <div className="panel-header">
                    Upcoming Events
                    {auth.isAdmin() && (
                        <button
                            className="proto-btn"
                            onClick={() =>
                                this.setState({ createModalOpen: true })
                            }
                        >
                            Create Event
                        </button>
                    )}
                    <Modal
                        on={this.state.createModalOpen}
                        toggle={() => {
                            this.setState({
                                createModalOpen: !this.state.createModalOpen
                            });
                            this.fetchEvents();
                        }}
                    >
                        <CreateEvent auth={auth} />
                    </Modal>
                </div>
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
                                            href={`/event?id=${event._id}`}
                                        >
                                            <tr>
                                                <td>
                                                    {upperFirst(event.title)}
                                                </td>
                                                <td>
                                                    {upperFirst(event.type)}
                                                </td>
                                                <td>
                                                    {moment(event.date).format(
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
        );
    }
}
