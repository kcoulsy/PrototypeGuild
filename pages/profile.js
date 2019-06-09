import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';

import withAuth from '../utils/withAuth';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

import { CLASSES, ROLES, RANKS } from '../constants/users';
import { PROFESSIONS } from '../constants/professions';

class Profile extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    state = {
        user: {},
        isLoading: true,
        editMode: false
    };

    componentDidMount() {
        const { auth, id } = this.props;

        auth.api('post', '/users/find', {
            data: {
                _id: id
            }
        }).then(res => {
            this.setState({
                user: res[0],
                isLoading: false
            });
        });
    }

    handleEditClick = () => {
        const { auth } = this.props;
        if (auth && auth.isAdmin) {
            this.setState({ editMode: !this.state.editMode });
        }
    };

    render() {
        const { user, isLoading } = this.state;
        const { auth } = this.props;
        const isAdmin = auth && auth.isAdmin();
        const isEditMode = this.state.editMode && isAdmin;

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Profile" styleName="panel-md no-padding">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <form className="proto-form full-width">
                                <table className="proto-table">
                                    <tbody>
                                        <tr>
                                            <td>Character Name</td>
                                            <td>
                                                {isEditMode ? (
                                                    <input
                                                        className=""
                                                        defaultValue={
                                                            user.characterName
                                                        }
                                                    />
                                                ) : (
                                                    <span>
                                                        {upperFirst(
                                                            user.characterName
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Class</td>
                                            <td>
                                                {isEditMode ? (
                                                    <select
                                                        defaultValue={user.playerClass.toLowerCase()}
                                                    >
                                                        {CLASSES.map(
                                                            playerClass => {
                                                                return (
                                                                    <option
                                                                        value={playerClass.toLowerCase()}
                                                                    >
                                                                        {
                                                                            playerClass
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {upperFirst(
                                                            user.playerClass
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Role</td>
                                            <td>
                                                {isEditMode ? (
                                                    <select
                                                        defaultValue={user.playerRole.toLowerCase()}
                                                    >
                                                        {ROLES.map(role => {
                                                            return (
                                                                <option
                                                                    value={role.toLowerCase()}
                                                                >
                                                                    {role}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {upperFirst(
                                                            user.playerRole
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rank</td>
                                            <td>
                                                {isEditMode ? (
                                                    <select
                                                        defaultValue={user.rank.toLowerCase()}
                                                    >
                                                        {RANKS.map(rank => {
                                                            return (
                                                                <option
                                                                    value={rank.toLowerCase()}
                                                                >
                                                                    {rank}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {upperFirst(user.rank)}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Professions</td>
                                            <td>
                                                {isEditMode ? (
                                                    <select
                                                        defaultValue={user.professionOne.toLowerCase()}
                                                    >
                                                        {PROFESSIONS.map(
                                                            prof => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            prof
                                                                        }
                                                                    >
                                                                        {prof}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {upperFirst(
                                                            user.professionOne
                                                        )}
                                                    </span>
                                                )}
                                                /
                                                {isEditMode ? (
                                                    <select
                                                        defaultValue={user.professionTwo.toLowerCase()}
                                                    >
                                                        {PROFESSIONS.map(
                                                            prof => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            prof.toLowerCase()
                                                                        }
                                                                    >
                                                                        {prof}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {upperFirst(
                                                            user.professionTwo
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        )}
                        {isAdmin && this.state.editMode ? (
                            <div>
                                <button
                                    className="proto-btn"
                                    onClick={this.handleEditClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="proto-btn"
                                    onClick={this.handleEditClick}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <button
                                className="proto-btn"
                                onClick={this.handleEditClick}
                            >
                                Edit
                            </button>
                        )}
                    </Panel>
                </div>
            </div>
        );
    }
}

export default withAuth(Profile);
