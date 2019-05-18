import React, { Component } from 'react'
import upperFirst from 'lodash/upperFirst'

import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
import Loader from '../components/Loader'

class Profile extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id }
    }

    state = {
        user: {},
        isLoading: true
    }

    componentDidMount() {
        this.props.auth
            .api('post', '/users/find', {
                data: {
                    _id: this.props.id
                }
            })
            .then(res => {
                this.setState({
                    user: res[0],
                    isLoading: false
                })
            })
    }

    render() {
        const { user } = this.state

        return (
            <div>
                <Navbar auth={this.props.auth} />
                <div className="content">
                    <Panel title="Profile" styleName="panel-sm">
                        {this.state.isLoading ? (
                            <Loader />
                        ) : (
                            <table className="proto-table">
                                <tbody>
                                    <tr>
                                        <td>Character Name</td>
                                        <td>
                                            {upperFirst(user.characterName)}
                                        </td>
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
                                        <td>Rank</td>
                                        <td>{upperFirst(user.rank)}</td>
                                    </tr>
                                    <tr>
                                        <td>Professions</td>
                                        <td>
                                            {upperFirst(user.professionOne)}/
                                            {upperFirst(user.professionTwo)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </Panel>
                </div>
            </div>
        )
    }
}

export default withAuth(Profile)
