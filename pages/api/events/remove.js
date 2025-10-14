import { prisma } from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    return requireAdmin(removeEvent)(req, res);
}

async function removeEvent(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data: { hidden: true },
        });

        res.status(200).json(event);
    } catch (error) {
        console.error('Error removing event:', error);
        res.status(400).json({ error: 'Failed to remove event' });
    }
}
