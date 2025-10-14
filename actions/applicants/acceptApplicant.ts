'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { adminAction } from '@/lib/middleware/actionMiddleware';

// Schema
const acceptApplicantSchema = z.object({
    id: z.string(),
    enabled: z.boolean().optional(),
});

// Action
export const acceptApplicantAction = adminAction
    .inputSchema(acceptApplicantSchema)
    .action(async ({ parsedInput, ctx }) => {
        const { id, enabled } = parsedInput;
        const session = ctx.session;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    enabled: enabled || true,
                    enabledBy: parseInt(session.user.id),
                },
                select: {
                    id: true,
                    username: true,
                    characterName: true,
                    enabled: true,
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
                    : 'Failed to accept applicant',
            );
        }
    });
