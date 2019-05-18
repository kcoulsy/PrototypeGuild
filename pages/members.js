import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

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

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Members" styleName="panel-md">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <table className="proto-table">
                                <tbody>
                                    {members &&
                                        members.map(member => {
                                            return (
                                                <Link
                                                    key={member._id}
                                                    href={`/profile?id=${
                                                        member._id
                                                    }`}
                                                >
                                                    <tr>
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
