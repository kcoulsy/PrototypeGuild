import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class Events extends Component {
    static async getInitialProps() {}

    state = {
        isLoading: true,
        events: []
    };

    componentDidMount() {
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

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="events" styleName="panel-md">
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
                                                    href={`/profile?id=${
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
                                                            {moment(event.date).format("dddd, MMMM Do YYYY")}
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
        );
    }
}

export default withAuth(Events);
