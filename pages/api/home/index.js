import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // Get recent posts
        const posts = await prisma.post.findMany({
            where: { hidden: false },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        // Get recruitment data
        const playerClasses = await prisma.recruitment.findMany({
            orderBy: { playerClass: 'asc' },
        });

        res.status(200).json({
            posts,
            playerClasses,
        });
    } catch (error) {
        console.error('Error fetching home data:', error);
        res.status(500).json({ error: 'Failed to fetch home data' });
    }
}
