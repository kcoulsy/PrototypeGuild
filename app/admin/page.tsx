import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Events from '@/components/Events';
import ServerApplicants from '@/components/admin/Applicants';
import ServerRecruitment from '@/components/admin/Recruitment';
import ServerPostList from '@/components/ServerPostList';
import { auth } from '@/lib/auth';
import Loader from '@/components/Loader';

export default async function AdminPage() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Redirect to login if not authenticated
    if (!session) {
        redirect('/login');
    }

    // Check if user is admin
    if (!session.user.admin) {
        redirect('/dashboard');
    }

    return (
        <div className="page-dashboard">
            <Navbar />
            <div className="content">
                <div className="container">
                    <h2>Admin Dashboard</h2>
                    <div className="dashboard-content">
                        <div className="sidebar">
                            <Suspense fallback={<Loader />}>
                                <ServerApplicants />
                            </Suspense>
                            <Suspense fallback={<Loader />}>
                                <ServerRecruitment />
                            </Suspense>
                        </div>
                        <div className="main-content">
                            <Suspense fallback={<Loader />}>
                                <Events />
                            </Suspense>
                            <Suspense fallback={<Loader />}>
                                <ServerPostList />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
