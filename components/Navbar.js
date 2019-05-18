import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import AuthService from '../utils/AuthService'

const auth = new AuthService();

export default class Navbar extends Component {
    handleLogout = () => {
        console.log('hello')
        auth.logout();
        Router.push('http://localhost:3001/')
    }

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
        )
        const loggedInLinks = (
            <Fragment>
                <Link href="/members">
                    <div className="nav-item right">Members</div>
                </Link>
                <div className="nav-item right" onClick={this.handleLogout}>Logout</div>
            </Fragment>
        )
        const links = loggedIn ? loggedInLinks : loggedOutLinks;

        const adminLinks = (
            <Fragment>
                <Link href="/applicants">
                    <div className="nav-item right">Applications</div>
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
        )
    }
}
