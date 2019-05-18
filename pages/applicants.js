import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'
import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Applicants extends Component {
    static async getInitialProps({ query }) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:3001/applicants`,
            data: {
                enabled: false
            }
        })
        return { members: res.data }
    }

    render() {
        if (!this.props.members.length) {
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
                                {this.props.members.map(member => {
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
