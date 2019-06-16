import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

import sortFunc from '../utils/memberSort';

class Members extends Component {
    static async getInitialProps() {}

    state = {
        isLoading: true,
        members: []
    };

    componentDidMount() {
        const { auth } = this.props;

        auth.api('post', '/users/find', {
            data: {
                enabled: true
            }
        }).then(res => {
            this.setState({
                isLoading: false,
                members: res
            });
        });
    }

    render() {
        const { isLoading, members } = this.state;
        const { auth } = this.props;
        const sortedMembers = members.sort(sortFunc);

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Members" styleName="panel-md no-padding">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <table className="proto-table class-colors">
                                <tbody>
                                    {sortedMembers &&
                                        sortedMembers.map(member => {
                                            return (
                                                <Link
                                                    key={member._id}
                                                    href={`/profile?id=${member._id}`}
                                                >
                                                    <tr
                                                        className={
                                                            member.playerClass
                                                        }
                                                    >
                                                        <td>
                                                            {upperFirst(
                                                                member.characterName
                                                            )}
                                                        </td>
                                                        <td>
                                                            {upperFirst(
                                                                member.playerClass
                                                            )}
                                                        </td>
                                                        <td>
                                                            {upperFirst(
                                                                member.playerRole
                                                            )}
                                                        </td>
                                                        <td>
                                                            {upperFirst(
                                                                member.rank
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
        );
    }
}

export default withAuth(Members);
