'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';

const action = createSafeActionClient();

// Schema
const updateUserSchema = z.object({
    id: z.number(),
    characterName: z.string().optional(),
    discordTag: z.string().optional(),
    playerClass: z.string().optional(),
    playerRole: z.string().optional(),
    rank: z.string().optional(),
    professionOne: z.string().optional(),
    professionTwo: z.string().optional(),
});

// Action
export const updateUserAction = action
    .inputSchema(updateUserSchema)
    .action(async ({ parsedInput }) => {
        const {
            id,
            characterName,
            discordTag,
            playerClass,
            playerRole,
            rank,
            professionOne,
            professionTwo,
        } = parsedInput;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    characterName,
                    discordTag,
                    playerClass,
                    playerRole,
                    rank,
                    professionOne,
                    professionTwo,
                },
                select: {
                    id: true,
                    username: true,
                    characterName: true,
                    discordTag: true,
                    playerClass: true,
                    playerRole: true,
                    rank: true,
                    professionOne: true,
                    professionTwo: true,
                    enabled: true,
                    admin: true,
                },
            });

            return {
                success: true,
                user,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'User update failed',
            );
        }
    });
