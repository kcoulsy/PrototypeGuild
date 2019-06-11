import React, { Component } from 'react';
import Panel from '../components/Panel';

export default class UpdatePassword extends Component {
    state = {
        current: '',
        newPass: '',
        confirm: '',
        error: ''
    };
    handleInput = ev => {
        const { value, name } = ev.target;
        this.handleError();
        this.setState({ [name]: value });
    };
    handleSubmit = ev => {
        const {auth, id, requirePrevious} = this.props;
        const {
            current,
            newPass,
            confirm
        } = this.state;

        ev.preventDefault();

        // reset errors
        this.handleError();

        if (newPass !== confirm) {
            this.handleError('Passwords Must Match!');
            return;
        }
        if (requirePrevious && !current) {
            this.handleError('You must enter your current password');
        }
        auth.api('patch', '/users/reset', {
            data: {
                _id: id,
                password: newPass
            }
        }).then(user => {
            console.log(user);
        })
    };
    handleError = value => {
        this.setState({ error: value });
    };
    render() {
        const { auth, requirePrevious } = this.props;
        const isAdmin = auth && auth.isAdmin();
        console.log(this.props);
        return (
            <Panel title="Update Password" styleName="panel-sm">
                {this.state.error}
                <form className="proto-form">
                    {(!isAdmin || requirePrevious) && (
                        <input
                            type="password"
                            name="current"
                            onChange={this.handleInput}
                            placeholder="Current Password"
                            autoComplete="current-password"
                        />
                    )}

                    <input
                        type="password"
                        name="newPass"
                        onChange={this.handleInput}
                        placeholder="New Password"
                        autoComplete="current-password"
                    />
                    <input
                        type="password"
                        name="confirm"
                        onChange={this.handleInput}
                        placeholder="Confirm Password"
                        autoComplete="current-password"
                    />
                    <button
                        className="proto-btn"
                        onClick={this.handleSubmit}
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>
            </Panel>
        );
    }
}
