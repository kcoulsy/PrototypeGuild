import React, { Component } from 'react'
import Router from 'next/router'
import withAuth from  '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Members extends Component {
  render() {
    return (
        <div>
            <Navbar loggedIn={this.props.auth.loggedIn()} />
            <div className="content">
                <Panel title="Members" styleName="panel-md">
                    <table class="proto-table">
                        <tbody>
                            <tr>
                                <td>Syth</td>
                                <td>Warrior</td>
                                <td>Tank</td>
                            </tr>
                            <tr>
                                <td>Syth</td>
                                <td>Warrior</td>
                                <td>Tank</td>
                            </tr>
                        </tbody>
                    </table>
                </Panel>
            </div>
        </div>
    )
  }
}

export default withAuth(Members);