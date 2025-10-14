import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

/**
 * Helper function to get authenticated session in server components
 * Redirects to login if not authenticated
 *
 * @param redirectTo - Optional redirect path (defaults to '/login')
 * @returns The authenticated session
 */
export async function requireAuth(redirectTo: string = '/login') {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(redirectTo);
    }

    return session;
}

/**
 * Helper function to get admin session in server components
 * Redirects to login if not authenticated, or dashboard if not admin
 *
 * @param redirectTo - Optional redirect path for non-admin users (defaults to '/dashboard')
 * @returns The authenticated admin session
 */
export async function requireAdmin(redirectTo: string = '/dashboard') {
    const session = await requireAuth();

    if (!session.user.admin) {
        redirect(redirectTo);
    }

    return session;
}

/**
 * Helper function to get session without redirecting
 * Useful for conditional rendering based on auth state
 *
 * @returns The session or null if not authenticated
 */
export async function getSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch {
        return null;
    }
}

/**
 * Helper function to check if user is admin without redirecting
 *
 * @returns True if user is authenticated and admin, false otherwise
 */
export async function isAdmin() {
    const session = await getSession();
    return session?.user.admin ?? false;
}
