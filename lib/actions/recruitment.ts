'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@/lib/auth';

const action = createSafeActionClient();

// Schemas
const updateRecruitmentSchema = z.object({
    id: z.number(),
    playerClass: z.string(),
    recruiting: z.boolean(),
});

// Actions
export const updateRecruitmentAction = action
    .inputSchema(updateRecruitmentSchema)
    .action(async ({ parsedInput }) => {
        const { id, playerClass, recruiting } = parsedInput;

        try {
            // Get session from better-auth
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                throw new Error('Not authenticated');
            }

            // Check if user is admin
            if (!session.user.admin) {
                throw new Error('Not authorized');
            }

            const recruitment = await prisma.recruitment.update({
                where: { id },
                data: {
                    playerClass,
                    recruiting,
                },
            });

            return {
                success: true,
                recruitment,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error
                    ? error.message
                    : 'Recruitment update failed',
            );
        }
    });

export const getRecruitmentAction = async () => {
    try {
        const recruitment = await prisma.recruitment.findMany({
            orderBy: { playerClass: 'asc' },
        });

        return {
            success: true,
            recruitment,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Failed to fetch recruitment data',
        );
    }
};
