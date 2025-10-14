import { prisma } from '../../../lib/prisma';
import { authenticateToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const user = await authenticateToken(req);
        req.user = user;
        return findUsers(req, res);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

async function findUsers(req, res) {
    try {
        const { username, _id } = req.body;

        let whereClause = {
            enabled: true,
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

        const users = await prisma.user.findMany({
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
                admin: true,
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error finding users:', error);
        res.status(400).json({ error: 'Failed to find users' });
    }
}
