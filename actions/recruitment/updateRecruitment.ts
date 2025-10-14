'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { adminAction } from '@/lib/middleware/actionMiddleware';

// Schema
const updateRecruitmentSchema = z.object({
    id: z.number(),
    playerClass: z.string(),
    recruiting: z.boolean(),
});

// Action
export const updateRecruitmentAction = adminAction
    .inputSchema(updateRecruitmentSchema)
    .action(async ({ parsedInput, ctx }) => {
        const { id, playerClass, recruiting } = parsedInput;
        const session = ctx.session; // Session is guaranteed to be admin

        try {
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
