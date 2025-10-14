'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getEventsAction } from '@/lib/actions/events';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';

import CreateEvent from './admin/CreateEvent';
import Modal from './utils/Modal';
import Panel from './Panel';
import Loader from './Loader';
import EditEvent from './admin/EditEvent';

interface Event {
    id: number;
    title: string;
    description?: string;
    type?: string;
    date?: string;
    createdBy: number;
    creator: {
        id: number;
        username: string;
        characterName?: string;
    };
    eventAttendance: Array<{
        id: number;
        userId: number;
        eventId: number;
        user: {
            id: number;
            username: string;
            characterName?: string;
        };
    }>;
    hidden?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface EventsProps {
    onEventsUpdate?: () => void;
}

export default function Events({ onEventsUpdate }: EventsProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<Event[]>([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editEventId, setEditEventId] = useState<number | null>(null);
    const [editEventModalOpen, setEditEventModalOpen] = useState(false);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const result = await getEventsAction();
            if (result.success) {
                setEvents(result.events);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const isAdmin = () => {
        if (typeof window === 'undefined') return false;
        const profile = localStorage.getItem('profile');
        if (!profile) return false;
        try {
            const user = JSON.parse(profile);
            return user.admin;
        } catch {
            return false;
        }
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
        if (onEventsUpdate) {
            onEventsUpdate();
        }
    };

    const closeEditModal = () => {
        setEditEventModalOpen(false);
        setEditEventId(null);
        if (onEventsUpdate) {
            onEventsUpdate();
        }
    };

    const openEditModal = (eventId: number) => {
        setEditEventId(eventId);
        setEditEventModalOpen(true);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Panel title="Events" styleName="no-padding">
            <Modal on={createModalOpen} toggle={closeCreateModal}>
                <CreateEvent onEventCreated={closeCreateModal} />
            </Modal>
            <Modal on={editEventModalOpen} toggle={closeEditModal}>
                {editEventId && (
                    <EditEvent
                        eventId={editEventId}
                        onEventUpdated={closeEditModal}
                    />
                )}
            </Modal>
            <div className="panel-header">
                Events
                {isAdmin() && (
                    <button
                        className="proto-btn"
                        type="button"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        Create Event
                    </button>
                )}
            </div>
            <div>
                <table className="proto-table">
                    <tbody>
                        {(!events || !events.length) && (
                            <tr>
                                <td style={{ textAlign: 'center' }}>
                                    No Events Found!
                                </td>
                            </tr>
                        )}
                        {events &&
                            events.map((event) => {
                                return (
                                    <tr key={event.id}>
                                        <td>
                                            <Link href={`/event/${event.id}`}>
                                                {event.title}
                                            </Link>
                                        </td>
                                        <td>{event.description}</td>
                                        <td>
                                            {event.type &&
                                                upperFirst(event.type)}
                                        </td>
                                        <td>
                                            {event.date &&
                                                new Date(
                                                    event.date,
                                                ).toLocaleDateString('en-US')}
                                        </td>
                                        <td>
                                            {event.creator.characterName ||
                                                event.creator.username}
                                        </td>
                                        <td>{event.eventAttendance.length}</td>
                                        {isAdmin() && (
                                            <td>
                                                <button
                                                    className="proto-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(event.id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}
