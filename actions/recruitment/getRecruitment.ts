'use server';

import { prisma } from '@/lib/prisma';

// Action
export const getRecruitmentAction = async () => {
    try {
        const recruitment = await prisma.recruitment.findMany({
            orderBy: { playerClass: 'asc' },
        });

        return {
            success: true,
            recruitment,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Failed to fetch recruitment data',
        );
    }
};
