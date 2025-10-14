'use client';

import { useSession } from './SessionProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    requireAdmin = false,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { session, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!session) {
                router.push(redirectTo);
            } else if (requireAdmin && !session.user.admin) {
                router.push('/dashboard');
            }
        }
    }, [session, loading, requireAdmin, redirectTo, router]);

    if (loading) {
        return (
            <div className="content">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    if (requireAdmin && !session.user.admin) {
        return null;
    }

    return <>{children}</>;
}
