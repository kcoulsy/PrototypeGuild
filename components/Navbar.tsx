'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from './SessionProvider';

export default function Navbar() {
    const { session, loading, signOut } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

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

    const links = session ? loggedInLinks : loggedOutLinks;

    const adminLinks = (
        <Fragment>
            <Link href="/admin">
                <div className="nav-item right">Admin</div>
            </Link>
        </Fragment>
    );

    if (loading) {
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
                        <div className="nav-item">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

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
                    {session?.user.admin && adminLinks}
                    {links}
                </div>
            </div>
        </div>
    );
}
