import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export default async function Navbar() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const loggedOutLinks = (
        <>
            <Link href="/login">
                <div className="nav-item right">Login</div>
            </Link>
            <Link href="/apply">
                <div className="nav-item right">Apply</div>
            </Link>
        </>
    );

    const loggedInLinks = (
        <>
            <Link href="/members">
                <div className="nav-item right">Members</div>
            </Link>
            <Link href="/dashboard">
                <div className="nav-item right">Dashboard</div>
            </Link>
            <Link href="/api/auth/sign-out">
                <div className="nav-item right">Logout</div>
            </Link>
        </>
    );

    const links = session ? loggedInLinks : loggedOutLinks;

    const adminLinks = (
        <>
            <Link href="/admin">
                <div className="nav-item right">Admin</div>
            </Link>
        </>
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
                    {session?.user.admin && adminLinks}
                    {links}
                </div>
            </div>
        </div>
    );
}
