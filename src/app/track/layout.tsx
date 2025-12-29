
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Manage your job applications and interview schedules. Keep track of your progress and never miss an opportunity.',
};

export default function TrackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
