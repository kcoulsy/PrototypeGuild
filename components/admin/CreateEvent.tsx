'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { createEventAction } from '@/lib/actions/events';
import Panel from '../Panel';

interface CreateEventProps {
    onEventCreated?: () => void;
}

export default function CreateEvent({ onEventCreated }: CreateEventProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        date: '',
    });

    const {
        execute: createEvent,
        isExecuting,
        result,
    } = useAction(createEventAction, {
        onSuccess: ({ data }) => {
            if (data?.success && onEventCreated) {
                onEventCreated();
            }
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            date: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createEvent(formData);
    };

    return (
        <Panel title="Create Event">
            <form className="proto-form form-apply" onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    rows={5}
                />
                <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    required
                />
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="Raid">Raid</option>
                    <option value="Dungeon">Dungeon</option>
                    <option value="PVP">PVP</option>
                    <option value="Other">Other</option>
                </select>
                <button
                    className="proto-btn"
                    type="submit"
                    disabled={isExecuting}
                >
                    {isExecuting ? 'Creating...' : 'Create Event'}
                </button>
                {result?.serverError && (
                    <div className="error-message">{result.serverError}</div>
                )}
            </form>
        </Panel>
    );
}
