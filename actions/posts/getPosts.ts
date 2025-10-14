'use server';

import { prisma } from '@/lib/prisma';

// Action
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
