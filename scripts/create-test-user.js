const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        // Create a test user with better-auth compatible structure
        const user = await prisma.user.create({
            data: {
                id: 'test-user-1',
                name: 'Test User',
                email: 'test@example.com',
                emailVerified: true,
                admin: true,
                characterName: 'TestCharacter',
                discordTag: 'TestUser#1234',
                playerClass: 'warrior',
                playerRole: 'tank',
                rank: 'officer',
                professionOne: 'mining',
                professionTwo: 'blacksmithing',
                enabled: true,
            },
        });

        console.log('Test user created:', user);
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();
