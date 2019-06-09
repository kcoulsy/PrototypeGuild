import React, { Component, Fragment } from 'react';
import upperFirst from 'lodash/upperFirst';

import { CLASSES, ROLES, RANKS } from '../constants/users';
import { PROFESSIONS } from '../constants/professions';

import Panel from '../components/Panel';
import Loader from '../components/Loader';
import UpdatePassword from './UpdatePassword';

export default class Profile extends Component {
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
        const { auth, canEdit } = this.props;
        if (auth && auth.isAdmin && canEdit) {
            this.setState({ editMode: !this.state.editMode });
        }
    };
    render() {
        const { user, isLoading } = this.state;
        const { auth, canEdit } = this.props;
        const isAdmin = auth && auth.isAdmin();
        const isEditMode = this.state.editMode && canEdit && isAdmin;
        return (
            <>
            <Panel title="Profile" styleName="panel-md no-padding">
                {isLoading ? (
                    <Loader />
                ) : (
                    <form className="proto-form full-width">
                        <table className="proto-table no-hover">
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
                                                {upperFirst(user.characterName)}
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
                                                {CLASSES.map(playerClass => {
                                                    return (
                                                        <option
                                                            key={playerClass}
                                                            value={playerClass.toLowerCase()}
                                                        >
                                                            {playerClass}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span>
                                                {upperFirst(user.playerClass)}
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
                                                            key={role}
                                                            value={role.toLowerCase()}
                                                        >
                                                            {role}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span>
                                                {upperFirst(user.playerRole)}
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
                                                            key={rank}
                                                            value={rank.toLowerCase()}
                                                        >
                                                            {rank}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span>{upperFirst(user.rank)}</span>
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
                                                {PROFESSIONS.map(prof => {
                                                    return (
                                                        <option
                                                            key={prof}
                                                            value={prof}
                                                        >
                                                            {prof}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span>
                                                {upperFirst(user.professionOne)}
                                            </span>
                                        )}
                                        /
                                        {isEditMode ? (
                                            <select
                                                defaultValue={user.professionTwo.toLowerCase()}
                                            >
                                                {PROFESSIONS.map(prof => {
                                                    return (
                                                        <option
                                                            key={prof}
                                                            value={prof.toLowerCase()}
                                                        >
                                                            {prof}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span>
                                                {upperFirst(user.professionTwo)}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                )}
                {isAdmin &&
                    canEdit &&
                    (this.state.editMode ? (
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
                    ))}
            </Panel>
            {
                isAdmin && canEdit && <UpdatePassword auth={auth} requirePrevious={false} />
            }
            </>
        );
    }
}
