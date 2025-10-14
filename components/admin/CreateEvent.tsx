'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { createEventAction } from '@/lib/actions/events';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
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
    const [focused, setFocused] = useState(false);

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
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: any) => {
        setFormData((prev) => ({
            ...prev,
            date: date ? date.format('YYYY-MM-DD') : '',
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
                <SingleDatePicker
                    date={formData.date ? moment(formData.date) : null}
                    onDateChange={handleDateChange}
                    focused={focused}
                    onFocusChange={({ focused }) => setFocused(focused)}
                    id="date-picker"
                    numberOfMonths={1}
                    hideKeyboardShortcutsPanel
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
