'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getEventsAction, updateEventAction } from '@/lib/actions/events';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Panel from '../Panel';
import Loader from '../Loader';

interface EditEventProps {
    eventId: number;
    onEventUpdated?: () => void;
}

export default function EditEvent({ eventId, onEventUpdated }: EditEventProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        error: '',
        date: null as moment.Moment | null,
        focused: false,
        isLoading: true,
    });

    const fetchEvents = async () => {
        try {
            const result = await getEventsAction();
            if (result.success) {
                const event = result.events.find(
                    (evt: any) => evt.id.toString() === eventId.toString()
                );
                if (event) {
                    setFormData((prev) => ({
                        ...prev,
                        title: event.title || '',
                        description: event.description || '',
                        type: event.type || '',
                        date: event.date ? moment(event.date) : null,
                        isLoading: false,
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setFormData((prev) => ({ ...prev, isLoading: false }));
        }
    };

    const { execute: updateEvent, isExecuting } = useAction(updateEventAction, {
        onSuccess: () => {
            setFormData((prev) => ({ ...prev, error: '' }));
            alert('Event updated successfully!');
            if (onEventUpdated) {
                onEventUpdated();
            }
        },
        onError: ({ error }) => {
            setFormData((prev) => ({
                ...prev,
                error: 'Failed to update event',
            }));
        },
    });

    useEffect(() => {
        fetchEvents();
    }, [eventId]);

    const handleInput = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            error: '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { title, description, type, date } = formData;

        if (!title) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must enter a title!',
            }));
            return;
        }

        if (!description) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must enter a description!',
            }));
            return;
        }

        if (!date) {
            setFormData((prev) => ({
                ...prev,
                error: 'You must select a date!',
            }));
            return;
        }

        updateEvent({
            id: eventId,
            title,
            description,
            type,
            date: date.toISOString(),
        });
    };

    if (formData.isLoading) {
        return (
            <Panel title="Edit Event" styleName="panel-md">
                <Loader />
            </Panel>
        );
    }

    return (
        <Panel title="Edit Event" styleName="panel-md">
            <form className="proto-form" onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInput}
                    placeholder="Event Title"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInput}
                    placeholder="Event Description"
                    rows={4}
                />
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleInput}
                >
                    <option value="">Select Event Type</option>
                    <option value="raid">Raid</option>
                    <option value="dungeon">Dungeon</option>
                    <option value="pvp">PvP</option>
                    <option value="social">Social</option>
                </select>
                <SingleDatePicker
                    date={formData.date}
                    onDateChange={(date: moment.Moment | null) =>
                        setFormData((prev) => ({ ...prev, date }))
                    }
                    focused={formData.focused}
                    onFocusChange={({ focused }: { focused: boolean | null }) =>
                        setFormData((prev) => ({ ...prev, focused: !!focused }))
                    }
                    numberOfMonths={1}
                    placeholder="Select Date"
                />
                <button
                    className="proto-btn"
                    type="submit"
                    disabled={isExecuting}
                >
                    {isExecuting ? 'Updating...' : 'Update Event'}
                </button>
                {formData.error && (
                    <div className="error-message">{formData.error}</div>
                )}
            </form>
        </Panel>
    );
}
