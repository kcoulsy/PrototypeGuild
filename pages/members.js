import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'
import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Members extends Component {
    static async getInitialProps({ query }) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:3001/users/find`,
            data: {
                enabled: true
            }
        })
        return { members: res.data }
    }

    render() {
        return (
            <div>
                <Navbar loggedIn={this.props.auth.loggedIn()} />
                <div className="content">
                    <Panel title="Members" styleName="panel-md">
                        <table className="proto-table">
                            <tbody>
                                {this.props.members.map(member => {
                                    return (
                                        <Link
                                            key={member._id}
                                            href={`/profile?id=${member._id}`}
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

export default withAuth(Members)
