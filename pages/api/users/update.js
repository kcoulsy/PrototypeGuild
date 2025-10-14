import { prisma } from '../../../lib/prisma';
import { requireAuth, requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Check if this is an admin update or user self-update
    const { _id } = req.body;
    if (_id && _id !== req.user?.id) {
        return requireAdmin(updateUser)(req, res);
    } else {
        return requireAuth(updateUser)(req, res);
    }
}

async function updateUser(req, res) {
    try {
        const {
            _id,
            characterName,
            discordTag,
            playerClass,
            playerRole,
            rank,
            professionOne,
            professionTwo,
        } = req.body;

        const userId = _id || req.user.id;

        const user = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                characterName,
                discordTag,
                playerClass,
                playerRole,
                rank,
                professionOne,
                professionTwo,
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

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: 'Failed to update user' });
    }
}
