import { prisma } from '../../../lib/prisma';
import { authenticateToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const user = await authenticateToken(req);
            req.user = user;
            return getEvents(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const user = await authenticateToken(req);
            if (!user.admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }
            req.user = user;
            return createEvent(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function getEvents(req, res) {
    try {
        const events = await prisma.event.findMany({
            where: { hidden: false },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        characterName: true,
                    },
                },
                eventAttendance: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                characterName: true,
                            },
                        },
                    },
                },
            },
            orderBy: { date: 'asc' },
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}

async function createEvent(req, res) {
    try {
        const { title, description, type, date } = req.body;

        const event = await prisma.event.create({
            data: {
                title,
                description,
                type,
                date: date ? new Date(date) : null,
                createdBy: req.user.id,
                hidden: false,
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

        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ error: 'Failed to create event' });
    }
}
