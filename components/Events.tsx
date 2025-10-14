import React from 'react';
import { headers } from 'next/headers';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import Panel from './Panel';
import EventsActions from './EventsActions';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

export default async function Events() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <Panel title="Events" styleName="no-padding">
                <div>Not logged in</div>
            </Panel>
        );
    }

    // Fetch events data
    let events: Event[] = [];
    try {
        const result = await prisma.event.findMany({
            where: { hidden: false },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        characterName: true,
                    },
                },
                eventAttendance: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                characterName: true,
                            },
                        },
                    },
                },
            },
            orderBy: { date: 'asc' },
        });
        events = result;
    } catch (error) {
        console.error('Error fetching events:', error);
        events = [];
    }

    const isAdmin = session.user.admin;

    return (
        <Panel title="Events" styleName="no-padding">
            <EventsActions events={events} isAdmin={!!isAdmin} />
        </Panel>
    );
}
