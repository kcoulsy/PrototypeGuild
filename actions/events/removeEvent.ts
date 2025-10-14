'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@/lib/auth';

const action = createSafeActionClient();

// Schema
const removeEventSchema = z.object({
    id: z.number(),
});

// Action
export const removeEventAction = action
    .inputSchema(removeEventSchema)
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

            const event = await prisma.event.update({
                where: { id },
                data: { hidden: true },
            });

            return {
                success: true,
                event,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Event removal failed',
            );
        }
    });
