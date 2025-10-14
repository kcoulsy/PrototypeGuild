'use client';

import React, { useState, Fragment } from 'react';
import Modal from './utils/Modal';

interface Post {
    id: string;
    _id?: string;
    imageUrl: string;
    title: string;
}

interface SkewedImageRowProps {
    posts: Post[];
}

export default function SkewedImageRow({ posts }: SkewedImageRowProps) {
    const [selected, setSelected] = useState<{ id?: string; src?: string }>({});

    return (
        <Fragment>
            <Modal on={!!(selected && selected.src)} toggle={() => setSelected({})}>
                <img src={selected.src} alt={selected.id} />
            </Modal>

            <div className="skewed-image-row">
                <div className="skewed-image-container">
                    {posts.map((post, idx) => {
                        return (
                            idx < 5 && (
                                <div
                                    className="image"
                                    key={post.id || post._id}
                                    role="button"
                                    tabIndex={0}
                                    onKeyUp={() => null}
                                    onClick={() =>
                                        setSelected({
                                            id: post.id || post._id,
                                            src: post.imageUrl,
                                        })
                                    }
                                >
                                    <img src={post.imageUrl} alt={post.title} />
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}
