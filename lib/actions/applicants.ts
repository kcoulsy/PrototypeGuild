'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';

const action = createSafeActionClient();

// Schemas
const acceptApplicantSchema = z.object({
    id: z.number(),
    enabled: z.boolean().optional(),
});

const declineApplicantSchema = z.object({
    id: z.number(),
    deleted: z.boolean().optional(),
});

// Actions
export const acceptApplicantAction = action
    .inputSchema(acceptApplicantSchema)
    .action(async ({ parsedInput }) => {
        const { id, enabled } = parsedInput;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    enabled: enabled || true,
                    enabledBy: 1, // TODO: Get from session
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
                    : 'Failed to accept applicant'
            );
        }
    });

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
                    : 'Failed to decline applicant'
            );
        }
    });

export const getApplicantsAction = async () => {
    try {
        const applicants = await prisma.user.findMany({
            where: {
                enabled: false,
                deleted: false,
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
                applicationJSON: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            applicants,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Failed to fetch applicants'
        );
    }
};
