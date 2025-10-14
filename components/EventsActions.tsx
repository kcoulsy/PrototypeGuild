'use client';

import React, { useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import CreateEvent from './admin/CreateEvent';
import Modal from './utils/Modal';
import EditEvent from './admin/EditEvent';
import { Event, User, EventAttendance } from '@prisma/client';

interface EventWithRelations extends Event {
    creator?: User | null;
    eventAttendance?: EventAttendance[];
}

interface EventsActionsProps {
    events: EventWithRelations[];
    isAdmin: boolean;
}

export default function EventsActions({ events, isAdmin }: EventsActionsProps) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editEventId, setEditEventId] = useState<number | null>(null);
    const [editEventModalOpen, setEditEventModalOpen] = useState(false);

    const closeCreateModal = () => {
        setCreateModalOpen(false);
        // Refresh the page to get updated events
        window.location.reload();
    };

    const closeEditModal = () => {
        setEditEventModalOpen(false);
        setEditEventId(null);
        // Refresh the page to get updated events
        window.location.reload();
    };

    const openEditModal = (eventId: number) => {
        setEditEventId(eventId);
        setEditEventModalOpen(true);
    };

    return (
        <>
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
                {isAdmin && (
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
                                            {event.creator?.characterName ||
                                                event.creator?.username ||
                                                'Unknown'}
                                        </td>
                                        <td>{event.eventAttendance?.length || 0}</td>
                                        {isAdmin && (
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
        </>
    );
}
