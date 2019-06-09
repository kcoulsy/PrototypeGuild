import React, { Component } from 'react';
import Panel from '../components/Panel';

export default class UpdatePassword extends Component {
    render() {
        const { auth, requirePrevious } = this.props;
        const isAdmin = auth && auth.isAdmin();
        return (
            <Panel title="Update Password" styleName="panel-sm">
                <form className="proto-form">
                    {(!isAdmin || requirePrevious) && (
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleInput}
                            placeholder="Current Password"
                            autoComplete="current-password"
                        />
                    )}

                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInput}
                        placeholder="New Password"
                        autoComplete="current-password"
                    />
                    <input
                        type="password"
                        name="password"
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
