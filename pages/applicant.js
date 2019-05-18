import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'

import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Applicant extends Component {
    static async getInitialProps({ query }) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:3001/applicants`,
            data: {
                _id: query.id
            }
        })
        return { user: res.data[0] }
    }
    state = {
        accepted: false,
        declined: false
    }
    handleAccept = e => {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            axios({
                method: 'patch',
                url: `http://localhost:3001/applicants/accept/${this.props.user._id}`,
                data: {
                    enabled: true
                }
            }).then(res => {
                this.setState({ accepted: true })
            })
        }
    }
    handleDecline = e => {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            axios({
                method: 'patch',
                url: `http://localhost:3001/applicants/decline/${this.props.user._id}`,
                data: {
                    deleted: true
                }
            }).then(res => {
                this.setState({ declined: true })
            })
        }
    }
    render() {
        const { user } = this.props
        const application =
            user && user.applicationJSON && JSON.parse(user.applicationJSON)
        if (!user) {
            return (
                <div>
                    <Navbar loggedIn={this.props.auth.loggedIn()} />
                    <div className="content">
                        <Panel title="Applicant not found!" styleName="panel-sm">
                            <Link href="/applicants">
                                <a>Click here to see more applicants</a>
                            </Link>
                        </Panel>
                    </div>
                </div>
            )
        }
        if (this.state.accepted) {
            return (
                <div>
                    <Navbar loggedIn={this.props.auth.loggedIn()} />
                    <div className="content">
                        <Panel title="Applicant Accepted!" styleName="panel-sm">
                            <Link href="/applicants">
                                <a>Click here to see more applicants</a>
                            </Link>
                        </Panel>
                    </div>
                </div>
            )
        }
        if (this.state.declined) {
            return (
                <div>
                    <Navbar loggedIn={this.props.auth.loggedIn()} />
                    <div className="content">
                        <Panel title="Applicant Declined!" styleName="panel-sm">
                            <Link href="/applicants">
                                <a>Click here to see more applicants</a>
                            </Link>
                        </Panel>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Navbar loggedIn={this.props.auth.loggedIn()} />
                <div className="content">
                    <Panel title="Applicant" styleName="panel-md">
                        <table className="proto-table applicant-table">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>Discord Tag</td>
                                    <td>{user.discordTag}</td>
                                </tr>
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
                                    <td>Professions</td>
                                    <td>
                                        {user.professionOne}/
                                        {user.professionTwo}
                                    </td>
                                </tr>
                                {Object.keys(application).map(key => {
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{application[key]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="application-buttons">
                            <button
                                className="proto-btn"
                                onClick={this.handleDecline}
                            >
                                Decline
                            </button>
                            <button
                                className="proto-btn"
                                onClick={this.handleAccept}
                            >
                                Accept
                            </button>
                        </div>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default withAuth(Applicant)
