'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticatedAction } from '@/lib/middleware/actionMiddleware';

// Schema
const createEventSchema = z.object({
    title: z.string().min(3),
    description: z.string().max(200).optional(),
    type: z.string().optional(),
    date: z.string().optional(),
});

// Action
export const createEventAction = authenticatedAction
    .inputSchema(createEventSchema)
    .action(async ({ parsedInput, ctx }) => {
        const { title, description, type, date } = parsedInput;
        const session = ctx.session;

        try {
            const event = await prisma.event.create({
                data: {
                    title,
                    description,
                    type,
                    date: date ? new Date(date) : null,
                    createdBy: session.user.id,
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
