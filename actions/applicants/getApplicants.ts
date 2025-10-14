'use server';

import { prisma } from '@/lib/prisma';

// Action
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
                : 'Failed to fetch applicants',
        );
    }
};
