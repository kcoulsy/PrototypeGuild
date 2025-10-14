'use client';

import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import Events from '@/components/Events';
import UpdatePassword from '@/components/UpdatePassword';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="page-dashboard">
                <Navbar />
                <div className="content">
                    <div className="container">
                        <h2>Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                                <Profile />
                                <UpdatePassword requirePrevious />
                            </div>
                            <div className="main-content">
                                <Events />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
