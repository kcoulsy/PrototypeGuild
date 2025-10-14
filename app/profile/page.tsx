import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/helpers/auth';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';

interface ProfilePageProps {
    searchParams: {
        id?: string;
    };
}

async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
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
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
    // Require authentication
    const session = await requireAuth();

    let user;

    if (searchParams.id) {
        // Fetch specific user by ID
        user = await getUserById(searchParams.id);
        if (!user) {
            notFound();
        }
    } else {
        // Show current user's profile
        user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
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
            },
        });

        if (!user) {
            notFound();
        }
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Profile" styleName="panel-md">
                    <h1>{user.characterName || user.username}</h1>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Character Name:</strong>{' '}
                        {user.characterName || 'Not set'}
                    </p>
                    <p>
                        <strong>Discord Tag:</strong>{' '}
                        {user.discordTag || 'Not set'}
                    </p>
                    <p>
                        <strong>Player Class:</strong>{' '}
                        {user.playerClass || 'Not set'}
                    </p>
                    <p>
                        <strong>Player Role:</strong>{' '}
                        {user.playerRole || 'Not set'}
                    </p>
                    <p>
                        <strong>Rank:</strong> {user.rank || 'Not set'}
                    </p>
                    <p>
                        <strong>Professions:</strong>{' '}
                        {user.professionOne || 'Not set'} /{' '}
                        {user.professionTwo || 'Not set'}
                    </p>
                    {!user.enabled && (
                        <p className="status-pending">
                            <strong>Status:</strong> Pending Approval
                        </p>
                    )}
                </Panel>
            </div>
        </div>
    );
}
