import { notFound } from 'next/navigation';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';
import { requireAdmin } from '@/lib/helpers/auth';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import ApplicantActions from '@/components/ApplicantActions';

interface ApplicantPageProps {
    params: {
        id: string;
    };
}

export default async function ApplicantPage({ params }: ApplicantPageProps) {
    await requireAdmin();

    if (!params.id) {
        notFound();
    }

    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
            deleted: false,
        },
    });

    if (!user) {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Applicant not found!" styleName="panel-sm">
                        <Link href="/applicants" className="link-button">
                            Click here to see more applicants
                        </Link>
                    </Panel>
                </div>
            </div>
        );
    }

    const applicationJSON = user.applicationJSON || '';
    let application = null;

    if (applicationJSON.length) {
        try {
            application = JSON.parse(applicationJSON);
            if (typeof application === 'string') {
                application = JSON.parse(application);
            }
        } catch (error) {
            console.error('Error parsing application JSON:', error);
        }
    }

    const {
        username,
        discordTag,
        characterName,
        playerClass,
        playerRole,
        professionOne,
        professionTwo,
    } = user;

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Applicant" styleName="panel-md">
                    <table className="proto-table applicant-table">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{upperFirst(username || '')}</td>
                            </tr>
                            <tr>
                                <td>Discord Tag</td>
                                <td>{upperFirst(discordTag || '')}</td>
                            </tr>
                            <tr>
                                <td>Character Name</td>
                                <td>{upperFirst(characterName || '')}</td>
                            </tr>
                            <tr>
                                <td>Class</td>
                                <td>{upperFirst(playerClass || '')}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{upperFirst(playerRole || '')}</td>
                            </tr>
                            <tr>
                                <td>Professions</td>
                                <td>
                                    {upperFirst(professionOne || '')}/
                                    {upperFirst(professionTwo || '')}
                                </td>
                            </tr>
                            {application &&
                                Object.keys(application).map((key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{application[key]}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <ApplicantActions applicantId={user.id} />
                </Panel>
            </div>
        </div>
    );
}
