'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { updateUserAction } from '@/lib/actions/users';
import Panel from './Panel';

interface UpdatePasswordProps {
    id?: string;
    requirePrevious?: boolean;
}

export default function UpdatePassword({
    id,
    requirePrevious,
}: UpdatePasswordProps) {
    const [formData, setFormData] = useState({
        current: '',
        newPass: '',
        confirm: '',
        error: '',
    });

    const { execute, isExecuting } = useAction(updateUserAction, {
        onSuccess: () => {
            setFormData({
                current: '',
                newPass: '',
                confirm: '',
                error: '',
            });
            alert('Password updated successfully!');
        },
        onError: ({ error }) => {
            setFormData((prev) => ({
                ...prev,
                error: 'Failed to update password',
            }));
        },
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            error: '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { current, newPass, confirm } = formData;

        if (!newPass) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must enter a new password',
            }));
            return;
        }

        if (newPass.length < 6) {
            setFormData((prev) => ({
                ...prev,
                error: 'Your password must be greater than 6 characters!',
            }));
            return;
        }

        if (!confirm) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must enter your password confirmation!',
            }));
            return;
        }

        if (confirm !== newPass) {
            setFormData((prev) => ({
                ...prev,
                error: 'Your passwords must match!',
            }));
            return;
        }

        if (requirePrevious && !current) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must enter your current password!',
            }));
            return;
        }

        // Check if user is admin
        const profile = localStorage.getItem('profile');
        let isAdmin = false;
        if (profile) {
            try {
                const userData = JSON.parse(profile);
                isAdmin = userData.admin || false;
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        const endpoint = isAdmin && !requirePrevious ? 'reset' : 'update';

        execute({
            id: id || '',
            password: newPass,
            currentPassword: requirePrevious ? current : undefined,
            endpoint,
        });
    };

    return (
        <Panel title="Update Password" styleName="panel-sm">
            <form className="proto-form" onSubmit={handleSubmit}>
                {requirePrevious && (
                    <input
                        name="current"
                        type="password"
                        value={formData.current}
                        onChange={handleInput}
                        placeholder="Current Password"
                        autoComplete="current-password"
                    />
                )}
                <input
                    name="newPass"
                    type="password"
                    value={formData.newPass}
                    onChange={handleInput}
                    placeholder="New Password"
                    autoComplete="new-password"
                />
                <input
                    name="confirm"
                    type="password"
                    value={formData.confirm}
                    onChange={handleInput}
                    placeholder="Confirm New Password"
                    autoComplete="new-password"
                />
                <button
                    className="proto-btn"
                    type="submit"
                    disabled={isExecuting}
                >
                    {isExecuting ? 'Updating...' : 'Update Password'}
                </button>
                {formData.error && (
                    <div className="error-message">{formData.error}</div>
                )}
            </form>
        </Panel>
    );
}
