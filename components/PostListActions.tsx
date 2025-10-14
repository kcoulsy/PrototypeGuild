'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { removePostAction } from '@/actions/posts/removePost';
import CreatePost from './admin/CreatePost';
import Modal from './utils/Modal';

interface Post {
    id: number;
    title: string;
    body?: string;
    imageUrl?: string;
    hidden?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface PostListActionsProps {
    posts: Post[];
}

export default function PostListActions({ posts }: PostListActionsProps) {
    const [createPostOpen, setCreatePostOpen] = useState(false);

    const { execute: removePost, isExecuting } = useAction(removePostAction, {
        onSuccess: () => {
            // Refresh the page to get updated posts
            window.location.reload();
        },
    });

    const handleRemovePost = (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            removePost({ id });
        }
    };

    const closeModal = () => {
        setCreatePostOpen(false);
        // Refresh the page to get updated posts
        window.location.reload();
    };

    return (
        <>
            <Modal on={createPostOpen} toggle={closeModal}>
                <CreatePost onPostCreated={closeModal} />
            </Modal>
            <div className="panel-header">
                Featured Posts
                <button
                    className="proto-btn"
                    type="button"
                    onClick={() => setCreatePostOpen(true)}
                >
                    Create Post
                </button>
            </div>
            <div>
                <table className="post-list-table">
                    <tbody>
                        {(!posts || !posts.length) && (
                            <tr>
                                <td style={{ textAlign: 'center' }}>
                                    No Posts Found!
                                </td>
                            </tr>
                        )}
                        {posts &&
                            posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <td>
                                            {post.imageUrl && (
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                />
                                            )}
                                        </td>
                                        <td>{post.title}</td>
                                        <td>
                                            <button
                                                className="proto-btn"
                                                type="button"
                                                onClick={() =>
                                                    handleRemovePost(post.id)
                                                }
                                                disabled={isExecuting}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
