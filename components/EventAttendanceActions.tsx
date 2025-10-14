'use client';

import { useState } from 'react';

interface EventAttendanceActionsProps {
    eventId: string;
    onAccept?: () => void;
    onDecline?: () => void;
}

export default function EventAttendanceActions({
    eventId,
    onAccept,
    onDecline,
}: EventAttendanceActionsProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const acceptEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // TODO: Implement event attendance actions
        console.log('Accept event attendance for event:', eventId);
        onAccept?.();
        // Simulate processing
        setTimeout(() => setIsProcessing(false), 1000);
    };

    const declineEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // TODO: Implement event attendance actions
        console.log('Decline event attendance for event:', eventId);
        onDecline?.();
        // Simulate processing
        setTimeout(() => setIsProcessing(false), 1000);
    };

    return (
        <div className="application-buttons">
            <button
                className="proto-btn"
                type="button"
                onClick={acceptEvent}
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Accept'}
            </button>
            <button
                className="proto-btn"
                type="button"
                onClick={declineEvent}
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Decline'}
            </button>
        </div>
    );
}
