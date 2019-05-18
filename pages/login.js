import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

const auth = new AuthService();

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        error: ''
    };

    componentDidMount() {
        if (auth.loggedIn()) {
            Router.push('http://localhost:3001/members');
        }
    }

    handleInput = ({ target }) => {
        const { name, value } = target;
        const newState = {
            error: ''
        };
        newState[name] = value;
        this.setState(newState);
    };

    handleSubmit = e => {
        const { username, password } = this.state;

        e.preventDefault();
        auth.login(username, password)
            .then(() => {
                Router.push('http://localhost:3001/members');
            })
            .catch(() => {
                this.setState({ error: 'Unable to login' });
            });
    };

    render() {
        const { error } = this.state;
        return (
            <div>
                <Navbar loggedIn={false} />
                <div className="content">
                    <Panel styleName="panel-sm">
                        <div className="proto-form">
                            {error}
                            <input
                                type="text"
                                name="username"
                                onChange={this.handleInput}
                                placeholder="Username"
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleInput}
                                placeholder="Password"
                            />
                            <button
                                className="proto-btn"
                                onClick={this.handleSubmit}
                                type="submit"
                            >
                                Login
                            </button>
                            <Link href="/apply">
                                <button className="link-button" type="button">Click here to Apply</button>
                            </Link>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}
