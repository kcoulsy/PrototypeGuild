'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getApplicantsAction } from '@/lib/actions/applicants';
import Link from 'next/link';
import Loader from '../Loader';
import Panel from '../Panel';

export default function Applicants() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchApplicants = async () => {
        try {
            const result = await getApplicantsAction();
            if (result.success) {
                setApplicants(result.applicants);
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    if (isLoading) {
        return (
            <Panel title="Applicants" styleName="no-padding">
                <Loader />
            </Panel>
        );
    }

    return (
        <Panel title="Applicants" styleName="no-padding">
            <table className="proto-table">
                <tbody>
                    {applicants &&
                        applicants.map((applicant) => {
                            return (
                                <tr key={applicant.id}>
                                    <td>
                                        <Link
                                            href={`/applicant?id=${applicant.id}`}
                                        >
                                            {applicant.characterName ||
                                                applicant.username}
                                        </Link>
                                    </td>
                                    <td>{applicant.playerClass}</td>
                                    <td>{applicant.playerRole}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </Panel>
    );
}
