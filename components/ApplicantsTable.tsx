'use client';

import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { acceptApplicantAction } from '@/actions/applicants/acceptApplicant';
import { declineApplicantAction } from '@/actions/applicants/declineApplicant';
import Link from 'next/link';

interface Applicant {
    id: string;
    username: string | null;
    characterName: string | null;
    discordTag: string | null;
    playerClass: string | null;
    playerRole: string | null;
    professionOne: string | null;
    professionTwo: string | null;
    createdAt: Date;
}

interface ApplicantsTableProps {
    applicants: Applicant[];
    onRefresh?: () => void;
}

export default function ApplicantsTable({
    applicants,
    onRefresh,
}: ApplicantsTableProps) {
    const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

    const { execute: acceptApplicant } = useAction(acceptApplicantAction, {
        onSuccess: () => {
            onRefresh?.();
        },
    });

    const { execute: declineApplicant } = useAction(declineApplicantAction, {
        onSuccess: () => {
            onRefresh?.();
        },
    });

    const handleAccept = (id: string) => {
        if (window.confirm('Are you sure you want to accept this applicant?')) {
            setProcessingIds((prev) => new Set(prev).add(id));
            acceptApplicant({ id, enabled: true });
        }
    };

    const handleDecline = (id: string) => {
        if (
            window.confirm('Are you sure you want to decline this applicant?')
        ) {
            setProcessingIds((prev) => new Set(prev).add(id));
            declineApplicant({ id, deleted: true });
        }
    };

    if (applicants.length === 0) {
        return <p>No pending applications.</p>;
    }

    return (
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
                    {applicants.map((applicant) => {
                        const isProcessing = processingIds.has(applicant.id);
                        return (
                            <tr key={applicant.id}>
                                <td>
                                    <Link
                                        href={`/applicant/${applicant.id}`}
                                        className="applicant-link"
                                    >
                                        {applicant.username || 'Not set'}
                                    </Link>
                                </td>
                                <td>{applicant.characterName || 'Not set'}</td>
                                <td>{applicant.discordTag || 'Not set'}</td>
                                <td>{applicant.playerClass || 'Not set'}</td>
                                <td>{applicant.playerRole || 'Not set'}</td>
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
                                        applicant.createdAt,
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() =>
                                                handleAccept(applicant.id)
                                            }
                                            className="accept-btn"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing
                                                ? 'Processing...'
                                                : 'Accept'}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDecline(applicant.id)
                                            }
                                            className="decline-btn"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing
                                                ? 'Processing...'
                                                : 'Decline'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
