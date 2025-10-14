'use server';

import { prisma } from '@/lib/prisma';

// Action
export const getEventsAction = async () => {
    try {
        const events = await prisma.event.findMany({
            where: { hidden: false },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        characterName: true,
                    },
                },
                eventAttendance: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                characterName: true,
                            },
                        },
                    },
                },
            },
            orderBy: { date: 'asc' },
        });

        return {
            success: true,
            events,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch events',
        );
    }
};
