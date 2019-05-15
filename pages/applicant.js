import React, { Component } from 'react'
import axios from 'axios'

import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Applicant extends Component {
    static async getInitialProps({ query }) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:3001/users/find`,
            data: {
                _id: query.id
            }
        })
        return { user: res.data[0] }
    }
    render() {
        const { user } = this.props
        const application = user.applicationJSON && SON.parse(user.applicationJSON);
        console.log(user);
        return (
            <div>
                <Navbar loggedIn={this.props.auth.loggedIn()} />
                <div className="content">
                    <Panel title="Applicant" styleName="panel-sm">
                        <table className="proto-table">
                            <tbody>
                                <tr>
                                    <td>Character Name</td>
                                    <td>{user.characterName}</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>{user.playerClass}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{user.playerRole}</td>
                                </tr>
                                <tr>
                                    <td>Rank</td>
                                    <td>{user.rank}</td>
                                </tr>
                                <tr>
                                    <td>Professions</td>
                                    <td>
                                        {user.professionOne}/
                                        {user.professionTwo}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Discord Tag</td>
                                    <td>{user.discordTag}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <button className="proto-btn">
                                            Decline
                                        </button>
                                    </td>
                                    <td>
                                        <button className="proto-btn">
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default withAuth(Applicant)
