import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';

import CreateEvent from './admin/CreateEvent';
import Modal from './utils/Modal';
import Panel from './Panel';
import Loader from './Loader';
import EditEvent from './admin/EditEvent';

export default class Events extends Component {
    state = {
        isLoading: true,
        events: [],
        createModalOpen: false,
        editEventId: '',
        editEventModalOpen: false
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

    isAdmin = () => {
        const { auth } = this.props;

        return auth && auth.isAdmin();
    };

    render() {
        const { auth } = this.props;
        const { isLoading, events } = this.state;

        return (
            <Panel styleName="no-padding">
                <div className="panel-header">
                    Upcoming Events
                    {this.isAdmin() && (
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
                                createModalOpen: false
                            });
                            this.fetchEvents();
                        }}
                    >
                        <CreateEvent auth={auth} />
                    </Modal>
                    <Modal
                        on={this.state.editEventModalOpen}
                        toggle={() => {
                            this.setState({
                                editEventModalOpen: false,
                                editEventId: ''
                            });
                            this.fetchEvents();
                        }}
                    >
                        <EditEvent auth={auth} id={this.state.editEventId} />
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
                                        <tr key={event._id}>
                                            <Link
                                                href={`/event?id=${event._id}`}
                                            >
                                                <td>
                                                    {upperFirst(event.title)}
                                                </td>
                                            </Link>

                                            <Link
                                                href={`/event?id=${event._id}`}
                                            >
                                                <td>
                                                    {upperFirst(event.type)}
                                                </td>
                                            </Link>
                                            <Link
                                                href={`/event?id=${event._id}`}
                                            >
                                                <td>
                                                    {moment(event.date).format(
                                                        'dddd, MMMM Do YYYY'
                                                    )}
                                                </td>
                                            </Link>
                                            {this.isAdmin() && (
                                                <td>
                                                    <button
                                                        className="proto-btn"
                                                        onClick={() => {
                                                            this.setState({
                                                                editEventModalOpen: true,
                                                                editEventId:
                                                                    event._id
                                                            });
                                                            this.fetchEvents();
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </Panel>
        );
    }
}
