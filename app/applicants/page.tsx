'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import {
    getApplicantsAction,
    acceptApplicantAction,
    declineApplicantAction,
} from '@/lib/actions/applicants';

export default function ApplicantsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState<any[]>([]);
    const router = useRouter();

    const fetchApplicants = async () => {
        try {
            const result = await getApplicantsAction();
            if (result.success) {
                setApplicants(result.applicants);
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
        }
    };

    const { execute: acceptApplicant } = useAction(acceptApplicantAction, {
        onSuccess: () => {
            fetchApplicants();
        },
    });

    const { execute: declineApplicant } = useAction(declineApplicantAction, {
        onSuccess: () => {
            fetchApplicants();
        },
    });

    useEffect(() => {
        const profile = localStorage.getItem('profile');
        const token = localStorage.getItem('token');

        if (!profile || !token) {
            router.push('/login');
            return;
        }

        try {
            const userData = JSON.parse(profile);
            if (!userData.admin) {
                router.push('/dashboard');
                return;
            }
            setUser(userData);
            fetchApplicants();
        } catch (error) {
            console.error('Error parsing user data:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router, fetchApplicants]);

    const handleAccept = (id: number) => {
        acceptApplicant({ id, enabled: true });
    };

    const handleDecline = (id: number) => {
        declineApplicant({ id, deleted: true });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Redirecting...</div>;
    }

    return (
        <div className="applicants-container">
            <header className="applicants-header">
                <h1>Manage Applicants</h1>
                <div className="applicants-nav">
                    <a href="/admin" className="nav-link">
                        Back to Admin
                    </a>
                </div>
            </header>

            <div className="applicants-content">
                <div className="applicants-list">
                    <h2>Pending Applications</h2>
                    {applicants.length === 0 ? (
                        <p>No pending applications.</p>
                    ) : (
                        <div className="applicants-table">
                            <table className="proto-table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Character Name</th>
                                        <th>Discord Tag</th>
                                        <th>Player Class</th>
                                        <th>Player Role</th>
                                        <th>Professions</th>
                                        <th>Application Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.map((applicant) => (
                                        <tr key={applicant.id}>
                                            <td>{applicant.username}</td>
                                            <td>
                                                {applicant.characterName ||
                                                    'Not set'}
                                            </td>
                                            <td>
                                                {applicant.discordTag ||
                                                    'Not set'}
                                            </td>
                                            <td>
                                                {applicant.playerClass ||
                                                    'Not set'}
                                            </td>
                                            <td>
                                                {applicant.playerRole ||
                                                    'Not set'}
                                            </td>
                                            <td>
                                                {applicant.professionOne &&
                                                applicant.professionTwo
                                                    ? `${applicant.professionOne}, ${applicant.professionTwo}`
                                                    : applicant.professionOne ||
                                                      applicant.professionTwo ||
                                                      'Not set'}
                                            </td>
                                            <td>
                                                {new Date(
                                                    applicant.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() =>
                                                            handleAccept(
                                                                applicant.id
                                                            )
                                                        }
                                                        className="accept-btn"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDecline(
                                                                applicant.id
                                                            )
                                                        }
                                                        className="decline-btn"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
