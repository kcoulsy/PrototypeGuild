'use client';

import React, { useEffect, useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import { CLASSES, ROLES, RANKS } from '../constants/users';
import { PROFESSIONS } from '../constants/professions';
import Panel from './Panel';
import Loader from './Loader';

interface ProfileProps {
    id?: string;
    canEdit?: boolean;
}

export default function Profile({ id, canEdit }: ProfileProps) {
    const [user, setUser] = useState<any>({});
    const [cleanUser, setCleanUser] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                // TODO: Create a server action for finding users by ID
                // For now, we'll use a placeholder
                setUser({});
                setCleanUser({});
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleEditClick = () => {
        // Check if user is admin
        const profile = localStorage.getItem('profile');
        if (profile) {
            try {
                const userData = JSON.parse(profile);
                if (userData.admin && canEdit) {
                    setEditMode(!editMode);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <Panel title="Profile" styleName="panel-sm">
                <Loader />
            </Panel>
        );
    }

    if (!user || Object.keys(user).length === 0) {
        return (
            <Panel title="Profile" styleName="panel-sm">
                <div>User not found</div>
            </Panel>
        );
    }

    const {
        username,
        characterName,
        discordTag,
        playerClass,
        playerRole,
        professionOne,
        professionTwo,
        rank,
        enabled,
    } = user;

    return (
        <Panel title="Profile" styleName="panel-sm">
            <div className="profile-content">
                <div className="profile-header">
                    <h3>{characterName || username}</h3>
                    {canEdit && (
                        <button
                            className="proto-btn edit-btn"
                            onClick={handleEditClick}
                            type="button"
                        >
                            {editMode ? 'Cancel' : 'Edit'}
                        </button>
                    )}
                </div>

                <div className="profile-details">
                    <div className="profile-row">
                        <span className="label">Username:</span>
                        <span className="value">{username}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Character Name:</span>
                        <span className="value">
                            {characterName || 'Not set'}
                        </span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Discord Tag:</span>
                        <span className="value">{discordTag || 'Not set'}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Class:</span>
                        <span className="value">
                            {upperFirst(playerClass || 'Not set')}
                        </span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Role:</span>
                        <span className="value">
                            {upperFirst(playerRole || 'Not set')}
                        </span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Professions:</span>
                        <span className="value">
                            {upperFirst(professionOne || 'Not set')} /{' '}
                            {upperFirst(professionTwo || 'Not set')}
                        </span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Rank:</span>
                        <span className="value">
                            {upperFirst(rank || 'Not set')}
                        </span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Status:</span>
                        <span className="value">
                            {enabled ? 'Active' : 'Pending'}
                        </span>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
