import { prisma } from '../../../lib/prisma';
import { authenticateToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getRecruitment(req, res);
    }

    if (req.method === 'POST') {
        try {
            const user = await authenticateToken(req);
            if (!user.admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }
            req.user = user;
            return createRecruitment(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    if (req.method === 'PATCH') {
        try {
            const user = await authenticateToken(req);
            if (!user.admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }
            req.user = user;
            return updateRecruitment(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function getRecruitment(req, res) {
    try {
        const recruitment = await prisma.recruitment.findMany({
            orderBy: { playerClass: 'asc' },
        });

        res.status(200).json(recruitment);
    } catch (error) {
        console.error('Error fetching recruitment:', error);
        res.status(500).json({ error: 'Failed to fetch recruitment data' });
    }
}

async function createRecruitment(req, res) {
    try {
        const { playerClass, recruiting } = req.body;

        const recruitment = await prisma.recruitment.create({
            data: {
                playerClass,
                recruiting: recruiting || false,
            },
        });

        res.status(201).json(recruitment);
    } catch (error) {
        console.error('Error creating recruitment:', error);
        res.status(400).json({ error: 'Failed to create recruitment' });
    }
}

async function updateRecruitment(req, res) {
    try {
        const { id, playerClass, recruiting } = req.body;

        const recruitment = await prisma.recruitment.update({
            where: { id: parseInt(id) },
            data: {
                playerClass,
                recruiting,
            },
        });

        res.status(200).json(recruitment);
    } catch (error) {
        console.error('Error updating recruitment:', error);
        res.status(400).json({ error: 'Failed to update recruitment' });
    }
}
