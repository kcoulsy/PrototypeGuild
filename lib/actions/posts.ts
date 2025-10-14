'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@/lib/auth';

const action = createSafeActionClient();

// Schemas
const createPostSchema = z.object({
    title: z.string().min(1).max(50),
    body: z.string().max(5000).optional(),
    imageUrl: z.string().optional(),
});

const removePostSchema = z.object({
    id: z.number(),
});

// Actions
export const createPostAction = action
    .inputSchema(createPostSchema)
    .action(async ({ parsedInput }) => {
        const { title, body, imageUrl } = parsedInput;

        try {
            // Get session from better-auth
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                throw new Error('Not authenticated');
            }

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

export const removePostAction = action
    .inputSchema(removePostSchema)
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

            const post = await prisma.post.update({
                where: { id },
                data: { hidden: true },
            });

            return {
                success: true,
                post,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Post removal failed',
            );
        }
    });

export const getPostsAction = async () => {
    try {
        const posts = await prisma.post.findMany({
            where: { hidden: false },
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            posts,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch posts',
        );
    }
};
