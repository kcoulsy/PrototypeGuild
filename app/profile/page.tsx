'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import Loader from '@/components/Loader';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const id = searchParams.get('id');

                if (!id) {
                    // Show current user's profile
                    const profile = localStorage.getItem('profile');
                    if (profile) {
                        setUser(JSON.parse(profile));
                    }
                } else {
                    // TODO: Fetch user by ID
                    // For now, we'll use a placeholder
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        // Check if user is logged in
        const profile = localStorage.getItem('profile');
        if (!profile) {
            router.push('/login');
            return;
        }

        fetchProfile();
    }, [searchParams, router]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Profile" styleName="panel-md">
                    {isLoading ? (
                        <Loader />
                    ) : user ? (
                        <>
                            <h1>{user.characterName || user.username}</h1>
                            <p>
                                <strong>Username:</strong> {user.username}
                            </p>
                            <p>
                                <strong>Character Name:</strong>{' '}
                                {user.characterName || 'Not set'}
                            </p>
                            <p>
                                <strong>Discord Tag:</strong>{' '}
                                {user.discordTag || 'Not set'}
                            </p>
                            <p>
                                <strong>Player Class:</strong>{' '}
                                {user.playerClass || 'Not set'}
                            </p>
                            <p>
                                <strong>Player Role:</strong>{' '}
                                {user.playerRole || 'Not set'}
                            </p>
                            <p>
                                <strong>Rank:</strong> {user.rank || 'Not set'}
                            </p>
                            <p>
                                <strong>Professions:</strong>{' '}
                                {user.professionOne || 'Not set'} /{' '}
                                {user.professionTwo || 'Not set'}
                            </p>
                        </>
                    ) : (
                        <div>Profile not found</div>
                    )}
                </Panel>
            </div>
        </div>
    );
}
