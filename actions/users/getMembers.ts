'use server';

import { prisma } from '@/lib/prisma';

// Action
export const getMembersAction = async () => {
    try {
        const members = await prisma.user.findMany({
            where: {
                enabled: true,
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
                admin: true,
            },
            orderBy: { characterName: 'asc' },
        });

        return {
            success: true,
            members,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch members',
        );
    }
};
