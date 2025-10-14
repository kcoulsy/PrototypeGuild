'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@/lib/auth';

const action = createSafeActionClient();

// Schema
const removePostSchema = z.object({
    id: z.number(),
});

// Action
export const removePostAction = action
    .inputSchema(removePostSchema)
    .action(async ({ parsedInput }) => {
        const { id } = parsedInput;

        try {
            // Get session from better-auth
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                throw new Error('Not authenticated');
            }

            const post = await prisma.post.update({
                where: { id },
                data: { hidden: true },
            });

            return {
                success: true,
                post,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Post removal failed',
            );
        }
    });
