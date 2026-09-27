import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CarePath',
    description: 'Acute care navigation for unexpected injuries',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
