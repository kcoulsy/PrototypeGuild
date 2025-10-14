import { prisma } from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    return requireAdmin(removePost)(req, res);
}

async function removePost(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { hidden: true },
        });

        res.status(200).json(post);
    } catch (error) {
        console.error('Error removing post:', error);
        res.status(400).json({ error: 'Failed to remove post' });
    }
}
