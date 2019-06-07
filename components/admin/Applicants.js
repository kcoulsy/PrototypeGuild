import React, { Component } from 'react';
import Link from 'next/link';

import Loader from '../Loader';
import Panel from '../Panel';

export default class Applicants extends Component {
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
        const { isLoading, applicants } = this.state;
        return (
            <Panel title="Applicants" styleName="no-padding">
                {isLoading ? (
                    <Loader />
                ) : applicants && applicants.length ? (
                    <table className="proto-table">
                        <tbody>
                            {applicants.map(member => {
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
                ) : (
                    <p>No Applications</p>
                )}
            </Panel>
        );
    }
}
