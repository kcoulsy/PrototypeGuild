import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ error: 'Username and password are required' });
        }

        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Remove existing tokens
        await prisma.token.deleteMany({
            where: { userId: user.id },
        });

        // Create new token
        const token = jwt.sign(
            { id: user.id, type: 'x-auth' },
            process.env.JWT_SECRET
        );

        // Save token to database
        await prisma.token.create({
            data: {
                type: 'x-auth',
                token,
                userId: user.id,
            },
        });

        res.setHeader('x-auth', token);
        res.status(200).json(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
}
