import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';

export default class Navbar extends Component {
    handleLogout = () => {
        const { auth } = this.props;
        auth.logout();
        Router.push('http://localhost:3001/');
    };

    render() {
        const { auth } = this.props;
        const isAdmin = auth && auth.isAdmin();
        const loggedIn = auth && auth.loggedIn();

        const loggedOutLinks = (
            <Fragment>
                <Link href="/login">
                    <div className="nav-item right">Login</div>
                </Link>
                <Link href="/apply">
                    <div className="nav-item right">Apply</div>
                </Link>
            </Fragment>
        );
        const loggedInLinks = (
            <Fragment>
                <Link href="/members">
                    <div className="nav-item right">Members</div>
                </Link>
                <Link href="/dashboard">
                    <div className="nav-item right">Dashboard</div>
                </Link>
                <div
                    className="nav-item right"
                    role="link"
                    onClick={this.handleLogout}
                    onKeyUp={() => {}}
                    tabIndex={0}
                >
                    Logout
                </div>
            </Fragment>
        );
        const links = loggedIn ? loggedInLinks : loggedOutLinks;

        const adminLinks = (
            <Fragment>
                <Link href="/admin">
                    <div className="nav-item right">Admin</div>
                </Link>
            </Fragment>
        );

        return (
            <div className="proto-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link href="/">
                            <div className="nav-item">Home</div>
                        </Link>
                        <Link href="/about">
                            <div className="nav-item">About</div>
                        </Link>
                    </div>
                    <div className="nav-right">
                        {isAdmin && adminLinks}
                        {links}
                    </div>
                </div>
            </div>
        );
    }
}
