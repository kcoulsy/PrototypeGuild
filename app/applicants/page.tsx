import Link from 'next/link';
import { requireAdmin } from '@/lib/helpers/auth';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import ApplicantsTable from '@/components/ApplicantsTable';

export default async function ApplicantsPage() {
    await requireAdmin();

    const applicants = await prisma.user.findMany({
        where: {
            deleted: false,
            enabled: false,
        },
        select: {
            id: true,
            username: true,
            characterName: true,
            discordTag: true,
            playerClass: true,
            playerRole: true,
            professionOne: true,
            professionTwo: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Manage Applicants" styleName="panel-lg">
                    <div className="applicants-header">
                        <h2>Pending Applications</h2>
                        <div className="applicants-nav">
                            <Link href="/admin" className="link-button">
                                Back to Admin
                            </Link>
                        </div>
                    </div>
                    <ApplicantsTable applicants={applicants} />
                </Panel>
            </div>
        </div>
    );
}
