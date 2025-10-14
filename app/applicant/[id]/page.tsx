'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
    getApplicantsAction,
    acceptApplicantAction,
    declineApplicantAction,
} from '@/lib/actions/applicants';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import Loader from '@/components/Loader';

interface ApplicantPageProps {
    params: {
        id: string;
    };
}

export default function ApplicantPage({ params }: ApplicantPageProps) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const router = useRouter();

    const fetchApplicants = async () => {
        try {
            const result = await getApplicantsAction();
            if (result.success) {
                const applicant = result.applicants.find(
                    (app: any) => app.id.toString() === params.id
                );
                setUser(applicant);
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const { execute: acceptApplicant } = useAction(acceptApplicantAction, {
        onSuccess: () => {
            setAccepted(true);
        },
    });

    const { execute: declineApplicant } = useAction(declineApplicantAction, {
        onSuccess: () => {
            setDeclined(true);
        },
    });

    useEffect(() => {
        // Check if user is admin
        const profile = localStorage.getItem('profile');
        if (!profile) {
            router.push('/login');
            return;
        }

        try {
            const userData = JSON.parse(profile);
            if (!userData.admin) {
                router.push('/dashboard');
                return;
            }
        } catch (error) {
            router.push('/login');
            return;
        }

        if (!params.id) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        fetchApplicants();
    }, [params.id, router]);

    const handleAccept = (e: React.MouseEvent) => {
        e.preventDefault();
        if (user && window.confirm('Are you sure?')) {
            acceptApplicant({ id: user.id, enabled: true });
        }
    };

    const handleDecline = (e: React.MouseEvent) => {
        e.preventDefault();
        if (user && window.confirm('Are you sure?')) {
            declineApplicant({ id: user.id, deleted: true });
        }
    };

    const applicationJSON = (user && user.applicationJSON) || '';
    let application = applicationJSON.length && JSON.parse(applicationJSON);

    if (typeof application === 'string') {
        application = JSON.parse(application);
    }

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Applicant" styleName="panel-md">
                        <Loader />
                    </Panel>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Applicant not found!" styleName="panel-sm">
                        <Link href="/applicants" className="link-button">
                            Click here to see more applicants
                        </Link>
                    </Panel>
                </div>
            </div>
        );
    }

    if (accepted) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Applicant Accepted!" styleName="panel-sm">
                        <Link href="/applicants" className="link-button">
                            Click here to see more applicants
                        </Link>
                    </Panel>
                </div>
            </div>
        );
    }

    if (declined) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Applicant Declined!" styleName="panel-sm">
                        <Link href="/applicants" className="link-button">
                            Click here to see more applicants
                        </Link>
                    </Panel>
                </div>
            </div>
        );
    }

    const {
        username,
        discordTag,
        characterName,
        playerClass,
        playerRole,
        professionOne,
        professionTwo,
    } = user;

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Applicant" styleName="panel-md">
                    <table className="proto-table applicant-table">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{upperFirst(username)}</td>
                            </tr>
                            <tr>
                                <td>Discord Tag</td>
                                <td>{upperFirst(discordTag)}</td>
                            </tr>
                            <tr>
                                <td>Character Name</td>
                                <td>{upperFirst(characterName)}</td>
                            </tr>
                            <tr>
                                <td>Class</td>
                                <td>{upperFirst(playerClass)}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{upperFirst(playerRole)}</td>
                            </tr>
                            <tr>
                                <td>Professions</td>
                                <td>
                                    {upperFirst(professionOne)}/
                                    {upperFirst(professionTwo)}
                                </td>
                            </tr>
                            {application &&
                                Object.keys(application).map((key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{application[key]}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <div className="application-buttons">
                        <button
                            className="proto-btn"
                            onClick={handleDecline}
                            type="button"
                        >
                            Decline
                        </button>
                        <button
                            className="proto-btn"
                            onClick={handleAccept}
                            type="button"
                        >
                            Accept
                        </button>
                    </div>
                </Panel>
            </div>
        </div>
    );
}
