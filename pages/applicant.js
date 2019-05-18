import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

class Applicant extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    state = {
        accepted: false,
        declined: false,
        isLoading: true
    };

    componentDidMount() {
        const { id, auth } = this.props;

        if (!id) {
            this.setState({ user: null, isLoading: false });
        }
        auth.api('post', '/applicants', {
            data: {
                _id: id
            }
        }).then(res => {
            this.setState({ user: res[0], isLoading: false });
        });
    }

    handleAccept = ev => {
        const { auth } = this.props;
        const { user } = this.state;
        const { _id } = user;

        ev.preventDefault();

        if (window.confirm('Are you sure?')) {
            auth.api('patch', `applicants/accept/${_id}`, {
                data: {
                    enabled: true
                }
            }).then(() => {
                this.setState({ accepted: true });
            });
        }
    };

    handleDecline = ev => {
        const { auth } = this.props;
        const { user } = this.state;
        const { _id } = user;

        ev.preventDefault();

        if (window.confirm('Are you sure?')) {
            auth.api('patch', `applicants/decline/${_id}`, {
                data: {
                    deleted: true
                }
            }).then(() => {
                this.setState({ accepted: true });
            });
        }
    };

    render() {
        const { user, isLoading, accepted, declined } = this.state;
        const { auth } = this.props;

        const applicationJSON = (user && user.applicationJSON) || '';
        let application = applicationJSON.length && JSON.parse(applicationJSON);

        if (typeof application === 'string') {
            application = JSON.parse(application);
        }

        if (isLoading) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel title="Applicant" styleName="panel-md">
                            <Loader />
                        </Panel>
                    </div>
                </div>
            );
        }

        if (!user) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel
                            title="Applicant not found!"
                            styleName="panel-sm"
                        >
                            <Link href="/applicants">
                                <button className="link-button" type="button">
                                    Click here to see more applicants
                                </button>
                            </Link>
                        </Panel>
                    </div>
                </div>
            );
        }
        if (accepted) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel title="Applicant Accepted!" styleName="panel-sm">
                            <Link href="/applicants">
                                <button className="link-button" type="button">
                                    Click here to see more applicants
                                </button>
                            </Link>
                        </Panel>
                    </div>
                </div>
            );
        }
        if (declined) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel title="Applicant Declined!" styleName="panel-sm">
                            <Link href="/applicants">
                                <button className="link-button" type="button">
                                    Click here to see more applicants
                                </button>
                            </Link>
                        </Panel>
                    </div>
                </div>
            );
        }

        const {
            username,
            discordTag,
            characterName,
            playerClass,
            playerRole,
            professionOne,
            professionTwo
        } = user;

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Applicant" styleName="panel-md">
                        <table className="proto-table applicant-table">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{upperFirst(username)}</td>
                                </tr>
                                <tr>
                                    <td>Discord Tag</td>
                                    <td>{upperFirst(discordTag)}</td>
                                </tr>
                                <tr>
                                    <td>Character Name</td>
                                    <td>{upperFirst(characterName)}</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>{upperFirst(playerClass)}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{upperFirst(playerRole)}</td>
                                </tr>
                                <tr>
                                    <td>Professions</td>
                                    <td>
                                        {upperFirst(professionOne)}/
                                        {upperFirst(professionTwo)}
                                    </td>
                                </tr>
                                {Object.keys(application).map(key => {
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{application[key]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="application-buttons">
                            <button
                                className="proto-btn"
                                onClick={this.handleDecline}
                                type="decline"
                            >
                                Decline
                            </button>
                            <button
                                className="proto-btn"
                                onClick={this.handleAccept}
                                type="accept"
                            >
                                Accept
                            </button>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default withAuth(Applicant);
