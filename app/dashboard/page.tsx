import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ServerProfile from '@/components/ServerProfile';
import ServerEvents from '@/components/Events';
import UpdatePassword from '@/components/UpdatePassword';
import { auth } from '@/lib/auth';
import Loader from '@/components/Loader';

export default async function DashboardPage() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Redirect to login if not authenticated
    if (!session) {
        redirect('/login');
    }

    return (
        <div className="page-dashboard">
            <Navbar />
            <div className="content">
                <div className="container">
                    <h2>Dashboard</h2>
                    <div className="dashboard-content">
                        <div className="sidebar">
                            <Suspense fallback={<Loader />}>
                                <ServerProfile />
                            </Suspense>
                            <UpdatePassword requirePrevious />
                        </div>
                        <div className="main-content">
                            <Suspense fallback={<Loader />}>
                                <ServerEvents />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
