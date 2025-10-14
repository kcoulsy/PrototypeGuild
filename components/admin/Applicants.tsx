import React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import Panel from '../Panel';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Applicants() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <Panel title="Applicants" styleName="no-padding">
                <div>Not logged in</div>
            </Panel>
        );
    }

    // Fetch applicants data
    let applicants: any[] = [];
    try {
        const result = await prisma.user.findMany({
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
        applicants = result;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        applicants = [];
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
