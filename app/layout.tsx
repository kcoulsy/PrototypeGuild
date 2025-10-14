import type { Metadata } from 'next';
import '../styles.scss';

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
                <div className="">{children}</div>
            </body>
        </html>
    );
}
