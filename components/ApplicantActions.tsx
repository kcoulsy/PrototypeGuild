'use client';

import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { acceptApplicantAction } from '@/actions/applicants/acceptApplicant';
import { declineApplicantAction } from '@/actions/applicants/declineApplicant';
import { useRouter } from 'next/navigation';

interface ApplicantActionsProps {
    applicantId: string;
    onAccept?: () => void;
    onDecline?: () => void;
}

export default function ApplicantActions({
    applicantId,
    onAccept,
    onDecline,
}: ApplicantActionsProps) {
    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const router = useRouter();

    const { execute: acceptApplicant } = useAction(acceptApplicantAction, {
        onSuccess: () => {
            setAccepted(true);
            onAccept?.();
        },
    });

    const { execute: declineApplicant } = useAction(declineApplicantAction, {
        onSuccess: () => {
            setDeclined(true);
            onDecline?.();
        },
    });

    const handleAccept = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.confirm('Are you sure?')) {
            acceptApplicant({ id: applicantId, enabled: true });
        }
    };

    const handleDecline = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.confirm('Are you sure?')) {
            declineApplicant({ id: applicantId, deleted: true });
        }
    };

    if (accepted) {
        return (
            <div className="application-buttons">
                <div className="success-message">Applicant Accepted!</div>
            </div>
        );
    }

    if (declined) {
        return (
            <div className="application-buttons">
                <div className="success-message">Applicant Declined!</div>
            </div>
        );
    }

    return (
        <div className="application-buttons">
            <button className="proto-btn" onClick={handleDecline} type="button">
                Decline
            </button>
            <button className="proto-btn" onClick={handleAccept} type="button">
                Accept
            </button>
        </div>
    );
}
