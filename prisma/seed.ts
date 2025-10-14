import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
        where: { admin: true },
    });

    if (existingAdmin) {
        console.log('✅ Admin user already exists:', existingAdmin.email);
        return;
    }

    // Create admin user using better-auth's signup method
    console.log('🔐 Creating admin user with better-auth...');

    const signupResult = await auth.api.signUpEmail({
        body: {
            email: 'admin@prototypeguild.com',
            password: 'admin123',
            name: 'Admin User',
        },
    });

    if (!signupResult.user) {
        console.error('❌ Failed to create admin user:', signupResult);
        return;
    }

    console.log('Signup result:', signupResult);
    const adminUser = signupResult.user;

    // Update the user with additional guild-specific fields
    const updatedAdminUser = await prisma.user.update({
        where: { id: adminUser.id },
        data: {
            characterName: 'Admin',
            discordTag: 'Admin#0000',
            playerClass: 'Warrior',
            playerRole: 'Tank',
            rank: 'Guild Master',
            professionOne: 'Mining',
            professionTwo: 'Blacksmithing',
            enabled: true,
            admin: true,
            applicationJSON: JSON.stringify({
                reason: 'Initial admin setup',
                experience: 'Guild management',
                availability: 'Always available',
            }),
        },
    });

    console.log('✅ Admin user created successfully!');
    console.log('📋 Admin Details:');
    console.log('   Email: admin@prototypeguild.com');
    console.log('   Password: admin123');
    console.log('   Name: Admin User');
    console.log('   Character: Admin (Warrior)');
    console.log('   Role: Guild Master');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the admin password after first login!');

    // Create some sample recruitment data
    const recruitmentData = [
        { playerClass: 'Warrior', recruiting: true },
        { playerClass: 'Paladin', recruiting: true },
        { playerClass: 'Hunter', recruiting: false },
        { playerClass: 'Rogue', recruiting: true },
        { playerClass: 'Priest', recruiting: true },
        { playerClass: 'Shaman', recruiting: false },
        { playerClass: 'Mage', recruiting: true },
        { playerClass: 'Warlock', recruiting: false },
        { playerClass: 'Druid', recruiting: true },
    ];

    // Clear existing recruitment data and create new ones
    await prisma.recruitment.deleteMany({});

    for (const recruitment of recruitmentData) {
        await prisma.recruitment.create({
            data: recruitment,
        });
    }

    console.log('✅ Recruitment data seeded successfully!');

    // Create a sample post
    const samplePost = await prisma.post.create({
        data: {
            title: 'Welcome to Prototype Guild!',
            body: 'Welcome to our Classic WoW guild! We are a friendly community focused on raiding and having fun together. Please read our guild rules and feel free to ask any questions.',
            hidden: false,
        },
    });

    console.log('✅ Sample post created successfully!');
    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
