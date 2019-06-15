import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';

import { CLASSES, ROLES, RANKS } from '../constants/users';
import { PROFESSIONS } from '../constants/professions';

import Panel from '../components/Panel';
import Loader from '../components/Loader';

export default class Profile extends Component {
    state = {
        user: {},
        cleanUser: {},
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
                cleanUser: Object.assign({}, res[0]),
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

    handleChange = ev => {
        const { name, value } = ev.target;
        let user = this.state.user;
        user[name] = value;
        this.setState({ user });
    };

    handleCancel = ev => {
        const { cleanUser } = this.state;

        ev.preventDefault();

        this.setState({
            user: cleanUser,
            editMode: false
        });
    };

    handleSubmit = ev => {
        const { auth } = this.props;
        const { user } = this.state;

        ev.preventDefault();

        if (!this.isDirty()) {
            this.setState({ editMode: false });
            return;
        }

        auth.api('patch', '/users', {
            data: user
        }).then(() => {
            this.setState({
                editMode: false,
                user: user,
                cleanUser: Object.assign({}, user)
            });
        });
    };

    isDirty = () => {
        const { user, cleanUser } = this.state;
        let isDirty = false;

        Object.keys(user).forEach(key => {
            if (user[key] !== cleanUser[key]) {
                console.log(key, user[key], cleanUser[key]);
                isDirty = true;
            }
        });

        return isDirty;
    };

    render() {
        const { user, isLoading } = this.state;
        const { auth, canEdit } = this.props;
        const isAdmin = auth && auth.isAdmin();
        const isEditMode = this.state.editMode && canEdit && isAdmin;

        return (
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
                                                onChange={this.handleChange}
                                                name="characterName"
                                            />
                                        ) : (
                                            <span>
                                                {upperFirst(user.characterName)}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Discord Tag</td>
                                    <td>
                                        {isEditMode ? (
                                            <input
                                                className=""
                                                defaultValue={user.discordTag}
                                                onChange={this.handleChange}
                                                name="discordTag"
                                            />
                                        ) : (
                                            <span>
                                                {upperFirst(user.discordTag)}
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
                                                onChange={this.handleChange}
                                                name="playerClass"
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
                                                onChange={this.handleChange}
                                                name="playerRole"
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
                                                onChange={this.handleChange}
                                                name="rank"
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
                                                onChange={this.handleChange}
                                                name="professionOne"
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
                                                onChange={this.handleChange}
                                                name="professionTwo"
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
                                onClick={this.handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="proto-btn"
                                onClick={this.handleSubmit}
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
        );
    }
}
