'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavbarProps {
    loggedIn?: boolean;
}

export default function Navbar({ loggedIn }: NavbarProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check authentication status from localStorage
        const profile = localStorage.getItem('profile');
        const token = localStorage.getItem('token');

        if (profile && token) {
            setIsLoggedIn(true);
            try {
                const userData = JSON.parse(profile);
                setIsAdmin(userData.admin || false);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/');
    };

    const actualLoggedIn = loggedIn !== undefined ? loggedIn : isLoggedIn;

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
                onClick={handleLogout}
                onKeyUp={() => {}}
                tabIndex={0}
            >
                Logout
            </div>
        </Fragment>
    );

    const links = actualLoggedIn ? loggedInLinks : loggedOutLinks;

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
