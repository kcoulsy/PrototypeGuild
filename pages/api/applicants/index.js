import { prisma } from '../../../lib/prisma';
import { authenticateToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const user = await authenticateToken(req);
        if (!user.admin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        req.user = user;
        return findApplicants(req, res);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

async function findApplicants(req, res) {
    try {
        const { username, _id } = req.body;

        let whereClause = {
            enabled: false,
            deleted: false,
        };

        if (username) {
            whereClause.username = {
                startsWith: username.toLowerCase(),
            };
        }

        if (_id) {
            whereClause.id = parseInt(_id);
        }

        const applicants = await prisma.user.findMany({
            where: whereClause,
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

        res.status(200).json(applicants);
    } catch (error) {
        console.error('Error finding applicants:', error);
        res.status(400).json({ error: 'Failed to find applicants' });
    }
}
