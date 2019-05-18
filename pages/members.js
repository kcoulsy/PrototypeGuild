import React, { Component } from 'react'
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link'
import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Members extends Component {
    static async getInitialProps() {}

    state = {
        members: []
    }

    componentDidMount() {
        this.props.auth.api('post', '/users/find', {
            data: {
                enabled: true
            }
        }).then(res => {
            this.setState({ members: res });
        })
    }

    render() {

        return (
            <div>
                <Navbar auth={this.props.auth} />
                <div className="content">
                    <Panel title="Members" styleName="panel-md">
                        <table className="proto-table">
                            <tbody>
                                {this.state.members && this.state.members.map(member => {
                                    return (
                                        <Link
                                            key={member._id}
                                            href={`/profile?id=${member._id}`}
                                        >
                                            <tr>
                                                <td>{member.characterName}</td>
                                                <td>{upperFirst(member.playerClass)}</td>
                                                <td>{upperFirst(member.playerRole)}</td>
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
