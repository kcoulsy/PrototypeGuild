import React, { Component } from 'react'
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
        const loggedOutLinks = (
            <div>
                <Link href="/login">
                    <div className="nav-item right">Login</div>
                </Link>
                <Link href="/apply">
                    <div className="nav-item right">Apply</div>
                </Link>
            </div>
        )
        const loggedInLinks = (
            <div>
                <Link href="/members">
                    <div className="nav-item right">Members</div>
                </Link>
                <div className="nav-item right" onClick={this.handleLogout}>Logout</div>
            </div>
        )
        const links = this.props.loggedIn ? loggedInLinks : loggedOutLinks
        return (
            <div className="proto-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link href="/">
                            <div className="nav-item">Home</div>
                        </Link>
                    </div>
                    <div className="nav-right">
                    {links}
                    </div>
                </div>
            </div>
        )
    }
}
