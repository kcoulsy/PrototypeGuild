import React from 'react';
import Panel from './Panel';
import EventsActions from './EventsActions';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/helpers/auth';

export default async function Events() {
    const session = await requireAuth();

    const events = await prisma.event.findMany({
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

    const isAdmin = session.user.admin;

    return (
        <Panel title="Events" styleName="no-padding">
            <EventsActions events={events} isAdmin={!!isAdmin} />
        </Panel>
    );
}
