'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const action = createSafeActionClient();

// Schemas
const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

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

const updateUserSchema = z.object({
    id: z.number(),
    characterName: z.string().optional(),
    discordTag: z.string().optional(),
    playerClass: z.string().optional(),
    playerRole: z.string().optional(),
    rank: z.string().optional(),
    professionOne: z.string().optional(),
    professionTwo: z.string().optional(),
});

// Actions
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

export const updateUserAction = action
    .inputSchema(updateUserSchema)
    .action(async ({ parsedInput }) => {
        const {
            id,
            characterName,
            discordTag,
            playerClass,
            playerRole,
            rank,
            professionOne,
            professionTwo,
        } = parsedInput;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    characterName,
                    discordTag,
                    playerClass,
                    playerRole,
                    rank,
                    professionOne,
                    professionTwo,
                },
                select: {
                    id: true,
                    username: true,
                    characterName: true,
                    discordTag: true,
                    playerClass: true,
                    playerRole: true,
                    rank: true,
                    professionOne: true,
                    professionTwo: true,
                    enabled: true,
                    admin: true,
                },
            });

            return {
                success: true,
                user,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'User update failed',
            );
        }
    });

export const getMembersAction = async () => {
    try {
        const members = await prisma.user.findMany({
            where: {
                enabled: true,
                deleted: false,
            },
            select: {
                id: true,
                username: true,
                characterName: true,
                discordTag: true,
                playerClass: true,
                playerRole: true,
                rank: true,
                professionOne: true,
                professionTwo: true,
                enabled: true,
                admin: true,
            },
            orderBy: { characterName: 'asc' },
        });

        return {
            success: true,
            members,
        };
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch members',
        );
    }
};
