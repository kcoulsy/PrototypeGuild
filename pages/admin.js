import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import Link from 'next/link';
import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class AdminDashboard extends Component {
    static async getInitialProps() {}

    state = {
        applicants: [],
        isLoading: true
    };

    componentDidMount() {
        const { auth } = this.props;
        auth.api('post', '/applicants', {
            data: {
                enabled: true
            }
        }).then(res => {
            this.setState({ applicants: res, isLoading: false });
        });
    }

    render() {
        const { auth } = this.props;
        const { isLoading, applicants } = this.state;
        const user = auth.getProfile();

        if (!user) {
            return <div>Error</div>;
        }

        return (
            <div className="page-dashboard">
                <Navbar auth={auth} />
                <div className="content">
                    <div className="container">
                        <h2>Admin Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                                <Panel
                                    title="Applicants"
                                    styleName="no-padding"
                                >
                                {isLoading ?
                                    <Loader />
                                    : applicants && applicants.length ? (
                                        <table className="proto-table">
                                            <tbody>
                                                {applicants.map(member => {
                                                    return (
                                                        <Link
                                                            key={member._id}
                                                            href={`/applicant?id=${
                                                                member._id
                                                            }`}
                                                        >
                                                            <tr>
                                                                <td>
                                                                    {
                                                                        member.characterName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        member.playerClass
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        member.playerRole
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </Link>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No Applications</p>
                                    )}
                                </Panel>
                                <Panel
                                    title="Recruitment"
                                    styleName="no-padding"
                                />
                            </div>
                            <div className="main-content">
                                <Panel title="Create Event" styleName="" />
                                <Panel title="Create Post" styleName="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(AdminDashboard);
