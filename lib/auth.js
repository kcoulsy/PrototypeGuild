import { prisma } from './prisma';
import jwt from 'jsonwebtoken';

export async function authenticateToken(req) {
    const token = req.headers['x-auth'];

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: {
                tokens: {
                    where: { token: token },
                },
            },
        });

        if (!user || user.tokens.length === 0) {
            throw new Error('Invalid token');
        }

        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export async function requireAuth(handler) {
    return async (req, res) => {
        try {
            const user = await authenticateToken(req);
            req.user = user;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    };
}

export async function requireAdmin(handler) {
    return async (req, res) => {
        try {
            const user = await authenticateToken(req);

            if (!user.admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }

            req.user = user;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    };
}
