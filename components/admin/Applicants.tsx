import React from 'react';
import Link from 'next/link';
import Panel from '../Panel';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/helpers/auth';

export default async function Applicants() {
    await requireAdmin();

    const applicants = await prisma.user.findMany({
        where: {
            enabled: false,
            deleted: false,
        },
        select: {
            id: true,
            username: true,
            characterName: true,
            discordTag: true,
            playerClass: true,
            playerRole: true,
            rank: true,
            professionOne: true,
            professionTwo: true,
            enabled: true,
            applicationJSON: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });

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
