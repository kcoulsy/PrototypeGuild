'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Events from '@/components/Events';
import Applicants from '@/components/admin/Applicants';
import Recruitment from '@/components/admin/Recruitment';
import PostList from '@/components/PostList';

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const profile = localStorage.getItem('profile');
        const token = localStorage.getItem('token');

        if (!profile || !token) {
            router.push('/login');
            return;
        }

        try {
            const userData = JSON.parse(profile);
            if (!userData.admin) {
                router.push('/dashboard');
                return;
            }
            setUser(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error</div>;
    }

    return (
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
    );
}
