import React from 'react';
import { getPostsAction } from '@/actions/posts/getPosts';
import { getRecruitmentAction } from '@/actions/recruitment/getRecruitment';
import Navbar from '@/components/Navbar';
import SkewedImageRow from '@/components/SkewedImageRow';
import NewRecruitment from '@/components/NewRecruitment';

export default async function HomePage() {
    const [postsResult, recruitmentResult] = await Promise.all([
        getPostsAction(),
        getRecruitmentAction(),
    ]);

    const posts = postsResult.success ? postsResult.posts : [];
    const playerClasses = recruitmentResult.success
        ? recruitmentResult.recruitment
        : [];

    return (
        <div>
            <Navbar />
            <div className="content">
                <div className="proto-hero">
                    <img
                        src="/static/images/logo.png"
                        alt="Prototype Guild Logo"
                    />
                    <h2>A Classic WoW guild</h2>
                </div>
                <NewRecruitment classValues={playerClasses} />
                <SkewedImageRow posts={posts} />
            </div>
        </div>
    );
}
