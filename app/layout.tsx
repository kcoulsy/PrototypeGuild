import type { Metadata } from 'next';
import '../styles.scss';
import { SessionProvider } from '@/components/SessionProvider';

export const metadata: Metadata = {
    title: 'Prototype Guild',
    description: 'A Classic WoW guild management application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <div className="">{children}</div>
                </SessionProvider>
            </body>
        </html>
    );
}
