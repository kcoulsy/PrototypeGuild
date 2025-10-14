import { prisma } from '../../../lib/prisma';
import { authenticateToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getPosts(req, res);
    }

    if (req.method === 'POST') {
        try {
            const user = await authenticateToken(req);
            if (!user.admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }
            req.user = user;
            return createPost(req, res);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function getPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: { hidden: false },
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

async function createPost(req, res) {
    try {
        const { title, body, imageUrl } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                body,
                imageUrl,
                hidden: false,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(400).json({ error: 'Failed to create post' });
    }
}
