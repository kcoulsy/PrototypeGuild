'use client';

import React, { useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import { CLASSES, ROLES, RANKS } from '../constants/users';
import { PROFESSIONS } from '../constants/professions';
import Panel from './Panel';
import { useSession } from './SessionProvider';

interface ProfileProps {
    id?: string;
    canEdit?: boolean;
}

export default function Profile({ id, canEdit }: ProfileProps) {
    const { session } = useSession();
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        if (session?.user.admin && canEdit) {
            setEditMode(!editMode);
        }
    };

    if (!session) {
        return (
            <Panel title="Profile" styleName="panel-sm">
                <div>Not logged in</div>
            </Panel>
        );
    }

    const user = session.user;
    const {
        name,
        email,
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
                    <h3>{characterName || name || email}</h3>
                    {canEdit && session.user.admin && (
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
                        <span className="label">Name:</span>
                        <span className="value">{name || 'Not set'}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Email:</span>
                        <span className="value">{email}</span>
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
