'use client';

import Navbar from '@/components/Navbar';
import Events from '@/components/Events';
import Applicants from '@/components/admin/Applicants';
import Recruitment from '@/components/admin/Recruitment';
import PostList from '@/components/PostList';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminPage() {
    return (
        <ProtectedRoute requireAdmin>
            <div className="page-dashboard">
                <Navbar />
                <div className="content">
                    <div className="container">
                        <h2>Admin Dashboard</h2>
                        <div className="dashboard-content">
                            <div className="sidebar">
                                <Applicants />
                                <Recruitment />
                            </div>
                            <div className="main-content">
                                <Events />
                                <PostList posts={[]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
