import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'sqlite',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    user: {
        additionalFields: {
            characterName: {
                type: 'string',
                required: false,
            },
            discordTag: {
                type: 'string',
                required: false,
            },
            playerClass: {
                type: 'string',
                required: false,
            },
            playerRole: {
                type: 'string',
                required: false,
            },
            rank: {
                type: 'string',
                required: false,
            },
            professionOne: {
                type: 'string',
                required: false,
            },
            professionTwo: {
                type: 'string',
                required: false,
            },
            enabled: {
                type: 'boolean',
                required: false,
                defaultValue: false,
            },
            enabledBy: {
                type: 'number',
                required: false,
            },
            deleted: {
                type: 'boolean',
                required: false,
                defaultValue: false,
            },
            admin: {
                type: 'boolean',
                required: false,
                defaultValue: false,
            },
            applicationJSON: {
                type: 'string',
                required: false,
            },
        },
    },
    trustedOrigins: [process.env.SITE_URL || 'http://localhost:3000'],
    baseURL: process.env.SITE_URL || 'http://localhost:3000',
    secret:
        process.env.BETTER_AUTH_SECRET ||
        process.env.JWT_SECRET ||
        'fallback-secret',
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
