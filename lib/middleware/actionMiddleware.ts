import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createSafeActionClient } from 'next-safe-action';

/**
 * Base action client without any middleware
 * Use this for public actions that don't require authentication
 */
export const action = createSafeActionClient();

/**
 * Action client with authentication middleware
 * Automatically checks if user is authenticated before executing the action
 *
 * Usage:
 * ```ts
 * export const myAction = authenticatedAction
 *   .inputSchema(mySchema)
 *   .action(async ({ parsedInput, ctx }) => {
 *     const session = ctx.session; // Session is available from middleware
 *     // Use session.user.id, session.user.admin, etc.
 *   });
 * ```
 */
export const authenticatedAction = createSafeActionClient().use(
    async ({ next }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            throw new Error('Not authenticated');
        }

        // Pass session to context for the action
        return next({ ctx: { session } });
    },
);

/**
 * Action client with admin authentication middleware
 * Automatically checks if user is authenticated and is an admin before executing the action
 *
 * Usage:
 * ```ts
 * export const adminAction = adminAction
 *   .inputSchema(mySchema)
 *   .action(async ({ parsedInput, ctx }) => {
 *     const session = ctx.session; // Session is available and user.admin is guaranteed to be true
 *   });
 * ```
 */
export const adminAction = createSafeActionClient().use(async ({ next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error('Not authenticated');
    }

    if (!session.user.admin) {
        throw new Error('Not authorized - Admin access required');
    }

    // Pass session to context for the action
    return next({ ctx: { session } });
});
