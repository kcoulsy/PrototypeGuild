import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ServerProfile from '@/components/Profile';
import ServerEvents from '@/components/Events';
import UpdatePassword from '@/components/UpdatePassword';
import { requireAuth } from '@/lib/helpers/auth';
import Loader from '@/components/Loader';

export default async function DashboardPage() {
    await requireAuth();

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
