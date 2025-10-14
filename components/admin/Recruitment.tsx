import React from 'react';
import { headers } from 'next/headers';
import Panel from '../Panel';
import RecruitmentActions from './RecruitmentActions';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RecruitmentData {
    id: number;
    playerClass: string;
    recruiting: boolean;
}

export default async function Recruitment() {
    // Get session from better-auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <Panel title="Recruitment" styleName="">
                <div>Not logged in</div>
            </Panel>
        );
    }

    // Fetch recruitment data
    let recruitment: RecruitmentData[] = [];
    try {
        const result = await prisma.recruitment.findMany({
            orderBy: { playerClass: 'asc' },
        });
        recruitment = result;
    } catch (error) {
        console.error('Error fetching recruitment data:', error);
        recruitment = [];
    }

    return (
        <Panel title="Recruitment" styleName="">
            <RecruitmentActions recruitment={recruitment} />
        </Panel>
    );
}
