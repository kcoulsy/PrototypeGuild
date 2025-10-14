import { notFound } from 'next/navigation';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import { requireAuth } from '@/lib/helpers/auth';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import EventAttendanceActions from '@/components/EventAttendanceActions';

interface EventPageProps {
    params: {
        id: string;
    };
}

async function getEvent(id: string) {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(id),
            },
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
                                playerClass: true,
                                playerRole: true,
                            },
                        },
                    },
                },
            },
        });
        return event;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export default async function EventPage({ params }: EventPageProps) {
    // Require authentication
    await requireAuth();

    if (!params.id) {
        notFound();
    }

    const event = await getEvent(params.id);

    if (!event) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Event not found" styleName="panel-sm">
                        <div>Event not found</div>
                    </Panel>
                </div>
            </div>
        );
    }

    // Group attendees by role
    const tanks = event.eventAttendance.filter(
        (attendance) => attendance.user.playerRole === 'tank',
    );
    const healers = event.eventAttendance.filter(
        (attendance) => attendance.user.playerRole === 'healer',
    );
    const melees = event.eventAttendance.filter(
        (attendance) => attendance.user.playerRole === 'melee',
    );
    const rangeds = event.eventAttendance.filter(
        (attendance) => attendance.user.playerRole === 'ranged',
    );

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel
                    title="Event"
                    styleName="panel-md no-padding panel-event"
                >
                    <table className="proto-table no-hover">
                        <tbody>
                            <tr>
                                <td>{upperFirst(event.title)}</td>
                            </tr>
                            <tr>
                                <td>{upperFirst(event.description || '')}</td>
                            </tr>
                            <tr>
                                <td>
                                    {event.date &&
                                        new Date(event.date).toLocaleDateString(
                                            'en-US',
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            },
                                        )}
                                </td>
                            </tr>
                            {event.creator && (
                                <tr>
                                    <td>
                                        Event created By:
                                        <Link
                                            href={`/profile?id=${event.creator.id}`}
                                        >
                                            {upperFirst(
                                                event.creator.characterName ||
                                                    event.creator.username ||
                                                    '',
                                            )}
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h2>Signed Up</h2>
                    <table className="proto-table signup-table class-colors no-hover">
                        <thead>
                            <tr>
                                <td>Tanks</td>
                                <td>Healers</td>
                                <td>Melee</td>
                                <td>Ranged</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <ul>
                                        {tanks.map((attendance) => (
                                            <li
                                                key={attendance.user.id}
                                                className={
                                                    attendance.user
                                                        .playerClass || ''
                                                }
                                            >
                                                <Link
                                                    href={`/profile?id=${attendance.user.id}`}
                                                >
                                                    {attendance.user
                                                        .characterName ||
                                                        attendance.user
                                                            .username ||
                                                        'Unknown'}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {healers.map((attendance) => (
                                            <li key={attendance.user.id}>
                                                <Link
                                                    href={`/profile?id=${attendance.user.id}`}
                                                >
                                                    {attendance.user
                                                        .characterName ||
                                                        attendance.user
                                                            .username ||
                                                        'Unknown'}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {melees.map((attendance) => (
                                            <li key={attendance.user.id}>
                                                <Link
                                                    href={`/profile?id=${attendance.user.id}`}
                                                >
                                                    {attendance.user
                                                        .characterName ||
                                                        attendance.user
                                                            .username ||
                                                        'Unknown'}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {rangeds.map((attendance) => (
                                            <li key={attendance.user.id}>
                                                <Link
                                                    href={`/profile?id=${attendance.user.id}`}
                                                >
                                                    {attendance.user
                                                        .characterName ||
                                                        attendance.user
                                                            .username ||
                                                        'Unknown'}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <EventAttendanceActions eventId={event.id.toString()} />
                </Panel>
            </div>
        </div>
    );
}
