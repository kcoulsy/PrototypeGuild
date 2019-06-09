import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';

import Panel from './Panel';
import Loader from '../components/Loader';

export default class Events extends Component {
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
        return (
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
