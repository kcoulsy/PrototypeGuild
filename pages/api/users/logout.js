import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const token = req.headers['x-auth'];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Remove token from database
        await prisma.token.deleteMany({
            where: {
                userId: decoded.id,
                token: token,
            },
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(400).json({ error: error.message });
    }
}
