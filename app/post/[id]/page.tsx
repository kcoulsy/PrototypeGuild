'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getPostsAction } from '@/lib/actions/posts';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import Loader from '@/components/Loader';

interface PostPageProps {
    params: {
        id: string;
    };
}

export default function PostPage({ params }: PostPageProps) {
    const [post, setPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const result = await getPostsAction();
            if (result.success) {
                const foundPost = result.posts.find(
                    (p: any) => p.id.toString() === params.id
                );
                setPost(foundPost);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPost(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [params.id]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Post" styleName="panel-md">
                    {isLoading ? (
                        <Loader />
                    ) : post ? (
                        <>
                            <h1>{post.title}</h1>
                            {post.imageUrl && (
                                <img src={post.imageUrl} alt={post.title} />
                            )}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.body || '',
                                }}
                            />
                        </>
                    ) : (
                        <div>Post not found</div>
                    )}
                </Panel>
            </div>
        </div>
    );
}
