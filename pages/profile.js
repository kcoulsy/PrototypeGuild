import React, { Component } from 'react'
import axios from 'axios'
import upperFirst from 'lodash/upperFirst'

import withAuth from '../utils/withAuth'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Profile extends Component {
    static async getInitialProps({query}) {
        const res = await axios({
            method: 'post',
          url: `http://localhost:3001/users/find`,
          data: {
              _id: query.id
          }
        });
        return {user: res.data[0]}
      }
    render() {
        const {user} = this.props;
        return (
            <div>
                <Navbar auth={this.props.auth} />
                <div className="content">
                    <Panel title="Profile" styleName="panel-sm">
                        <table className="proto-table">
                            <tbody>
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
                                    <td>Rank</td>
                                    <td>{upperFirst(user.rank)}</td>
                                </tr>
                                <tr>
                                    <td>Professions</td>
                                    <td>{upperFirst(user.professionOne)}/{upperFirst(user.professionTwo)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default withAuth(Profile)
