'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { createPostAction } from '@/lib/actions/posts';
import Panel from '../Panel';

interface CreatePostProps {
    onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        imageUrl: '',
    });

    const {
        execute: createPost,
        isExecuting,
        result,
    } = useAction(createPostAction, {
        onSuccess: ({ data }) => {
            if (data?.success && onPostCreated) {
                onPostCreated();
            }
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost(formData);
    };

    return (
        <Panel title="Create Post" styleName="">
            <form className="proto-form form-apply" onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    placeholder="Title of post"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="body"
                    value={formData.body}
                    placeholder="Post content"
                    onChange={handleChange}
                    rows={5}
                />
                <input
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    placeholder="Image URL"
                    onChange={handleChange}
                />
                <input
                    className="proto-btn"
                    type="submit"
                    value={isExecuting ? 'Creating...' : 'Create Post'}
                    disabled={isExecuting}
                />
                {result?.serverError && (
                    <div className="error-message">{result.serverError}</div>
                )}
            </form>
        </Panel>
    );
}
