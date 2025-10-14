'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';

const action = createSafeActionClient();

// Schema
const declineApplicantSchema = z.object({
    id: z.number(),
    deleted: z.boolean().optional(),
});

// Action
export const declineApplicantAction = action
    .inputSchema(declineApplicantSchema)
    .action(async ({ parsedInput }) => {
        const { id, deleted } = parsedInput;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    deleted: deleted || true,
                    enabledBy: 1, // TODO: Get from session
                },
                select: {
                    id: true,
                    username: true,
                    characterName: true,
                    deleted: true,
                },
            });

            return {
                success: true,
                returnedUser: user,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error
                    ? error.message
                    : 'Failed to decline applicant',
            );
        }
    });
