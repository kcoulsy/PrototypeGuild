import React, { Component } from 'react'
import upperFirst from 'lodash/upperFirst'
import Link from 'next/link'

import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Applicant extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id }
    }

    state = {
        accepted: false,
        declined: false
    }

    componentDidMount() {
        this.props.auth
            .api('post', '/applicants', {
                data: {
                    _id: this.props.id
                }
            })
            .then(res => {
                this.setState({ user: res[0] })
            })
    }

    handleAccept = e => {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            this.props.auth
                .api('patch', `applicants/accept/${this.state.user._id}`, {
                    data: {
                        enabled: true
                    }
                })
                .then(res => {
                    this.setState({ accepted: true })
                })
        }
    }
    handleDecline = e => {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            this.props.auth
                .api('patch', `applicants/decline/${this.state.user._id}`, {
                    data: {
                        deleted: true
                    }
                })
                .then(res => {
                    this.setState({ accepted: true })
                })
        }
    }
    render() {
        const { user } = this.state
        const applicationJSON = (user && user.applicationJSON) || ''
        let application = applicationJSON.length && JSON.parse(applicationJSON)

        if (typeof application === 'string') {
            application = JSON.parse(application)
        }

        if (!user) {
            return (
                <div>
                    <Navbar loggedIn={this.props.auth.loggedIn()} />
                    <div className="content">
                        <Panel
                            title="Applicant not found!"
                            styleName="panel-sm"
                        >
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
                <Navbar auth={this.props.auth} />
                <div className="content">
                    <Panel title="Applicant" styleName="panel-md">
                        <table className="proto-table applicant-table">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{upperFirst(user.username)}</td>
                                </tr>
                                <tr>
                                    <td>Discord Tag</td>
                                    <td>{upperFirst(user.discordTag)}</td>
                                </tr>
                                <tr>
                                    <td>Character Name</td>
                                    <td>{upperFirst(user.characterName)}</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>{upperFirst(user.playerClass)}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{upperFirst(user.playerRole)}</td>
                                </tr>
                                <tr>
                                    <td>Professions</td>
                                    <td>
                                        {upperFirst(user.professionOne)}/
                                        {upperFirst(user.professionTwo)}
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
