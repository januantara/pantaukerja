"use client";

import { BriefcaseBusiness, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { signOut, useSession } from '~/lib/auth-client';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh();
                }
            }
        });
    };

    return (
        <nav className="w-full flex items-center bg-background border-b py-6">
            <div className="w-full max-w-6xl px-6 flex items-center justify-between mx-auto">
                <div className="logo font-semibold text-2xl font-sans flex items-center gap-x-2">
                    <BriefcaseBusiness />
                    Pantau Kerja
                </div>
                <div className="flex gap-x-2">
                    <Button size="icon" onClick={toggleTheme} className="bg-card border text-muted-foreground hover:bg-accent"><Sun /></Button>
                    {session && (
                        <Button onClick={handleLogout}>Logout</Button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar