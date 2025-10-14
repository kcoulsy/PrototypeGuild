import React from 'react';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import { requireAuth } from '@/lib/helpers/auth';
import { prisma } from '@/lib/prisma';
import sortFunc from '@/utils/memberSort';

export default async function MembersPage() {
    await requireAuth();

    const members = await prisma.user.findMany({
        where: {
            enabled: true,
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
            admin: true,
        },
    });

    const sortedMembers = members.sort(sortFunc);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Members" styleName="panel-md no-padding">
                    <table className="proto-table class-colors">
                        <tbody>
                            {sortedMembers &&
                                sortedMembers.map((member: any) => {
                                    return (
                                        <tr key={member.id}>
                                            <td>
                                                <Link
                                                    href={`/profile?id=${member.id}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className={
                                                            member.playerClass
                                                        }
                                                    >
                                                        {upperFirst(
                                                            member.characterName ||
                                                                member.username,
                                                        )}
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                {upperFirst(member.playerClass)}
                                            </td>
                                            <td>
                                                {upperFirst(member.playerRole)}
                                            </td>
                                            <td>{upperFirst(member.rank)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </Panel>
            </div>
        </div>
    );
}
