'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const action = createSafeActionClient();

// Schema
const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

// Action
export const loginAction = action
    .inputSchema(loginSchema)
    .action(async ({ parsedInput }) => {
        const { username, password } = parsedInput;

        try {
            // Find user by username
            const user = await prisma.user.findUnique({
                where: { username: username.toLowerCase() },
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Remove existing tokens
            await prisma.token.deleteMany({
                where: { userId: user.id },
            });

            // Create new token
            const token = jwt.sign(
                { id: user.id, type: 'x-auth' },
                process.env.JWT_SECRET!,
            );

            // Save token to database
            await prisma.token.create({
                data: {
                    type: 'x-auth',
                    token,
                    userId: user.id,
                },
            });

            return {
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    characterName: user.characterName,
                    discordTag: user.discordTag,
                    playerClass: user.playerClass,
                    playerRole: user.playerRole,
                    rank: user.rank,
                    professionOne: user.professionOne,
                    professionTwo: user.professionTwo,
                    enabled: user.enabled,
                    admin: user.admin,
                },
                token,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Login failed',
            );
        }
    });
