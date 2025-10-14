import { prisma } from '../../../../lib/prisma';
import { authenticateToken } from '../../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const user = await authenticateToken(req);
        if (!user.admin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        req.user = user;
        return declineApplicant(req, res);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

async function declineApplicant(req, res) {
    try {
        const { id } = req.query;
        const { deleted } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                deleted: deleted || true,
                enabledBy: req.user.id,
            },
            select: {
                id: true,
                username: true,
                characterName: true,
                deleted: true,
            },
        });

        res.status(200).json({ returnedUser: user });
    } catch (error) {
        console.error('Error declining applicant:', error);
        res.status(400).json({ error: 'Failed to decline applicant' });
    }
}
