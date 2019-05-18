import React, { Component } from 'react'
import Link from 'next/link'
import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Applicants extends Component {
    static async getInitialProps() {}

    state = {
        members: []
    }

    componentDidMount() {
        this.props.auth
            .api('post', '/applicants', {
                data: {
                    enabled: true
                }
            })
            .then(res => {
                this.setState({ members: res })
            })
    }

    render() {
        if (!this.state.members.length) {
            return (
                <div>
                    <Navbar auth={this.props.auth} />
                    <div className="content">
                        <Panel styleName="panel-sm">
                            <Link href="/applicants">
                                <a>Currently no applications!</a>
                            </Link>
                        </Panel>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Navbar auth={this.props.auth} />
                <div className="content">
                    <Panel title="Applications" styleName="panel-md">
                        <table className="proto-table">
                            <tbody>
                                {this.state.members.map(member => {
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
                                    )
                                })}
                            </tbody>
                        </table>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default withAuth(Applicants)
