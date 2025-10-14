'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@/lib/auth';

const action = createSafeActionClient();

// Schemas
const createEventSchema = z.object({
    title: z.string().min(3),
    description: z.string().max(200).optional(),
    type: z.string().optional(),
    date: z.string().optional(),
});

const updateEventSchema = z.object({
    id: z.number(),
    title: z.string().min(3),
    description: z.string().max(200).optional(),
    type: z.string().optional(),
    date: z.string().optional(),
});

const removeEventSchema = z.object({
    id: z.number(),
});

// Actions
export const createEventAction = action
    .inputSchema(createEventSchema)
    .action(async ({ parsedInput }) => {
        const { title, description, type, date } = parsedInput;

        try {
            // Get session from better-auth
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                throw new Error('Not authenticated');
            }

            const event = await prisma.event.create({
                data: {
                    title,
                    description,
                    type,
                    date: date ? new Date(date) : null,
                    createdBy: parseInt(session.user.id),
                    hidden: false,
                },
                include: {
                    creator: {
                        select: {
                            id: true,
                            username: true,
                            characterName: true,
                        },
                    },
                },
            });

            return {
                success: true,
                event,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error
                    ? error.message
                    : 'Event creation failed',
            );
        }
    });

export const updateEventAction = action
    .inputSchema(updateEventSchema)
    .action(async ({ parsedInput }) => {
        const { id, title, description, type, date } = parsedInput;

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
                data: {
                    title,
                    description,
                    type,
                    date: date ? new Date(date) : null,
                },
                include: {
                    creator: {
                        select: {
                            id: true,
                            username: true,
                            characterName: true,
                        },
                    },
                },
            });

            return {
                success: true,
                event,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Event update failed',
            );
        }
    });

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
