import React from 'react';
import { headers } from 'next/headers';
import Panel from './Panel';
import PostListActions from './PostListActions';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Post {
    id: number;
    title: string;
    body?: string;
    imageUrl?: string;
    hidden?: boolean;
    createdAt: string;
    updatedAt: string;
}

export default async function PostList() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <Panel title="Featured Posts" styleName="no-padding">
                <div>Not logged in</div>
            </Panel>
        );
    }

    // Fetch posts data
    let posts: Post[] = [];
    try {
        const result = await prisma.post.findMany({
            where: { hidden: false },
            orderBy: { createdAt: 'desc' },
        });
        posts = result;
    } catch (error) {
        console.error('Error fetching posts:', error);
        posts = [];
    }

    return (
        <Panel title="Featured Posts" styleName="no-padding">
            <PostListActions posts={posts} />
        </Panel>
    );
}
