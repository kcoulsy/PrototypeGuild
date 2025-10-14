'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const action = createSafeActionClient();

// Schema
const createUserSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    characterName: z.string().optional(),
    discordTag: z.string().optional(),
    playerClass: z.string().optional(),
    playerRole: z.string().optional(),
    professionOne: z.string().optional(),
    professionTwo: z.string().optional(),
    applicationJSON: z.string().optional(),
    recaptcha: z.string(),
});

// Action
export const createUserAction = action
    .inputSchema(createUserSchema)
    .action(async ({ parsedInput }) => {
        const {
            username,
            password,
            characterName,
            discordTag,
            playerClass,
            playerRole,
            professionOne,
            professionTwo,
            applicationJSON,
            recaptcha,
        } = parsedInput;

        try {
            // Verify reCAPTCHA
            const recaptchaResponse = await axios({
                method: 'post',
                url: 'https://www.google.com/recaptcha/api/siteverify',
                params: {
                    secret: process.env.RECAPTCHA_SECRET,
                    response: recaptcha,
                },
            });

            if (!recaptchaResponse.data.success) {
                throw new Error('Invalid ReCaptcha');
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create user
            const user = await prisma.user.create({
                data: {
                    username: username.toLowerCase(),
                    password: hashedPassword,
                    characterName,
                    discordTag,
                    playerClass,
                    playerRole,
                    professionOne,
                    professionTwo,
                    applicationJSON,
                    rank: 'Member',
                    enabled: false,
                    deleted: false,
                },
            });

            // Create token
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
                error instanceof Error ? error.message : 'User creation failed',
            );
        }
    });
