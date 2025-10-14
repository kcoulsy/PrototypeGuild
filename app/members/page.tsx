'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import Loader from '@/components/Loader';
import sortFunc from '@/utils/memberSort';

export default function MembersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [members, setMembers] = useState<any[]>([]);
    const router = useRouter();

    // We need to create a server action for finding users
    // For now, let's use a simple fetch
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setIsLoading(true);
                // TODO: Create a proper server action for finding users
                // For now, we'll use a placeholder
                setMembers([]);
            } catch (error) {
                console.error('Error fetching members:', error);
                setMembers([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Check if user is logged in
        const profile = localStorage.getItem('profile');
        if (!profile) {
            router.push('/login');
            return;
        }

        fetchMembers();
    }, [router]);

    const sortedMembers = members.sort(sortFunc);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Members" styleName="panel-md no-padding">
                    {isLoading ? (
                        <Loader />
                    ) : (
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
                                                                    member.username
                                                            )}
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    {upperFirst(
                                                        member.playerClass
                                                    )}
                                                </td>
                                                <td>
                                                    {upperFirst(
                                                        member.playerRole
                                                    )}
                                                </td>
                                                <td>
                                                    {upperFirst(member.rank)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}
                </Panel>
            </div>
        </div>
    );
}
