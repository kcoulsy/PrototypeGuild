'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getEventsAction } from '@/actions/events/getEvents';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import Loader from '@/components/Loader';

interface EventPageProps {
    params: {
        id: string;
    };
}

export default function EventPage({ params }: EventPageProps) {
    const [event, setEvent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchEvents = async () => {
        try {
            const result = await getEventsAction();
            if (result.success) {
                const foundEvent = result.events.find(
                    (evt: any) => evt.id.toString() === params.id,
                );
                setEvent(foundEvent);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvent(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Check if user is logged in
        const profile = localStorage.getItem('profile');
        if (!profile) {
            router.push('/login');
            return;
        }

        fetchEvents();
    }, [params.id, router]);

    const acceptEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: Implement event attendance actions
        console.log('Accept event attendance');
    };

    const declineEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: Implement event attendance actions
        console.log('Decline event attendance');
    };

    let tanks: any[] = [];
    let healers: any[] = [];
    let melees: any[] = [];
    let rangeds: any[] = [];

    if (event && event.eventAttendance) {
        tanks = event.eventAttendance.filter((user: any) => {
            return user.user.playerRole === 'tank';
        });
        healers = event.eventAttendance.filter((user: any) => {
            return user.user.playerRole === 'healer';
        });
        melees = event.eventAttendance.filter((user: any) => {
            return user.user.playerRole === 'melee';
        });
        rangeds = event.eventAttendance.filter((user: any) => {
            return user.user.playerRole === 'ranged';
        });
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel
                    title="Event"
                    styleName="panel-md no-padding panel-event"
                >
                    {isLoading ? (
                        <Loader />
                    ) : event ? (
                        <>
                            <table className="proto-table no-hover">
                                <tbody>
                                    <tr>
                                        <td>{upperFirst(event.title)}</td>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(event.description)}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {event.date &&
                                                new Date(
                                                    event.date,
                                                ).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
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
                                                        event.creator
                                                            .characterName ||
                                                            event.creator
                                                                .username,
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
                                                {tanks.map((player: any) => {
                                                    return (
                                                        <li
                                                            key={player.user.id}
                                                            className={
                                                                player.user
                                                                    .playerClass
                                                            }
                                                        >
                                                            <Link
                                                                href={`/profile?id=${player.user.id}`}
                                                            >
                                                                {player.user
                                                                    .characterName ||
                                                                    player.user
                                                                        .username}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {healers.map((player: any) => {
                                                    return (
                                                        <li
                                                            key={player.user.id}
                                                        >
                                                            <Link
                                                                href={`/profile?id=${player.user.id}`}
                                                            >
                                                                {player.user
                                                                    .characterName ||
                                                                    player.user
                                                                        .username}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {melees.map((player: any) => {
                                                    return (
                                                        <li
                                                            key={player.user.id}
                                                        >
                                                            <Link
                                                                href={`/profile?id=${player.user.id}`}
                                                            >
                                                                {player.user
                                                                    .characterName ||
                                                                    player.user
                                                                        .username}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {rangeds.map((player: any) => {
                                                    return (
                                                        <li
                                                            key={player.user.id}
                                                        >
                                                            <Link
                                                                href={`/profile?id=${player.user.id}`}
                                                            >
                                                                {player.user
                                                                    .characterName ||
                                                                    player.user
                                                                        .username}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="application-buttons">
                                <button
                                    className="proto-btn"
                                    type="button"
                                    onClick={acceptEvent}
                                >
                                    Accept
                                </button>
                                <button
                                    className="proto-btn"
                                    type="button"
                                    onClick={declineEvent}
                                >
                                    Decline
                                </button>
                            </div>
                        </>
                    ) : (
                        <div>Event not found</div>
                    )}
                </Panel>
            </div>
        </div>
    );
}
