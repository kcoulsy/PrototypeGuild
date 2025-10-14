'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticatedAction } from '@/lib/middleware/actionMiddleware';

// Schema
const createPostSchema = z.object({
    title: z.string().min(1).max(50),
    body: z.string().max(5000).optional(),
    imageUrl: z.string().optional(),
});

// Action
export const createPostAction = authenticatedAction
    .inputSchema(createPostSchema)
    .action(async ({ parsedInput }) => {
        const { title, body, imageUrl } = parsedInput;

        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    body,
                    imageUrl,
                    hidden: false,
                },
            });

            return {
                success: true,
                post,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Post creation failed',
            );
        }
    });
