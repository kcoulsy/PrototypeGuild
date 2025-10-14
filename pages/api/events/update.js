import { prisma } from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    return requireAdmin(updateEvent)(req, res);
}

async function updateEvent(req, res) {
    try {
        const { id, title, description, type, date } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                type,
                date: date ? new Date(date) : null,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        characterName: true,
                    },
                },
            },
        });

        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ error: 'Failed to update event' });
    }
}
