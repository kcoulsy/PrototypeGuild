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
        const { auth, id, requirePrevious } = this.props;
        const { current, newPass, confirm } = this.state;
        const endpoint =
            this.isAdmin() && !requirePrevious
                ? '/users/reset'
                : '/users/update';

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

        auth.api('patch', endpoint, {
            data: {
                _id: id,
                current,
                password: newPass
            }
        }).then(() => {
            this.handleError('Password Updated!');
            this.setState({
                current: '',
                newPass: '',
                confirm: ''
            });
        });
    };

    handleError = value => {
        this.setState({ error: value });
    };

    isAdmin = () => {
        const { auth } = this.props;
        return auth && auth.isAdmin();
    };

    render() {
        const { requirePrevious } = this.props;

        return (
            <Panel title="Update Password" styleName="panel-sm">
                {this.state.error}
                <form className="proto-form">
                    {(!this.isAdmin() || requirePrevious) && (
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
