import React, { Component } from 'react';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

import Loader from '../components/Loader';

class Applicants extends Component {
    static async getInitialProps() {}

    state = {
        members: [],
        isLoading: true
    };

    componentDidMount() {
        const { auth } = this.props;
        auth.api('post', '/applicants', {
            data: {
                enabled: true
            }
        }).then(res => {
            this.setState({ members: res, isLoading: false });
        });
    }

    render() {
        const { isLoading, members } = this.state;
        const { auth } = this.props;

        if (isLoading) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel title="Applications" styleName="panel-md">
                            <Loader />
                        </Panel>
                    </div>
                </div>
            );
        }
        if (!members.length) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel styleName="panel-sm">
                            <Link href="/applicants">
                                <button className="link-button" type="button">
                                    Currently no applications!
                                </button>
                            </Link>
                        </Panel>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Applications" styleName="panel-md">
                        <table className="proto-table">
                            <tbody>
                                {members.map(member => {
                                    return (
                                        <Link
                                            key={member._id}
                                            href={`/applicant?id=${member._id}`}
                                        >
                                            <tr>
                                                <td>{member.characterName}</td>
                                                <td>{member.playerClass}</td>
                                                <td>{member.playerRole}</td>
                                            </tr>
                                        </Link>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default withAuth(Applicants);
