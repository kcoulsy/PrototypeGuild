import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return createUser(req, res);
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function createUser(req, res) {
    try {
        const body = pick(req.body, [
            'username',
            'password',
            'characterName',
            'discordTag',
            'playerClass',
            'playerRole',
            'professionOne',
            'professionTwo',
            'applicationJSON',
            'recaptcha',
        ]);

        body.rank = 'Member';
        body.enabled = false;
        body.deleted = false;
        body.username = body.username.toLowerCase();

        // Verify reCAPTCHA
        const recaptchaResponse = await axios({
            method: 'post',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            params: {
                secret: process.env.RECAPTCHA_SECRET,
                response: body.recaptcha,
            },
        });

        if (!recaptchaResponse.data.success) {
            return res.status(401).json({ error: 'Invalid ReCaptcha' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Create user
        const user = await prisma.user.create({
            data: {
                ...body,
                password: hashedPassword,
            },
        });

        // Create token
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
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
}
