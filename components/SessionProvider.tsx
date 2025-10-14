'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

interface Session {
    user: {
        id: string;
        name?: string | null;
        email: string;
        image?: string | null;
        admin?: boolean;
        characterName?: string | null;
        discordTag?: string | null;
        playerClass?: string | null;
        playerRole?: string | null;
        rank?: string | null;
        professionOne?: string | null;
        professionTwo?: string | null;
        enabled?: boolean;
        enabledBy?: number | null;
        deleted?: boolean;
        applicationJSON?: string | null;
    };
}

interface SessionContextType {
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const result = await authClient.getSession();
                setSession(result.data);
            } catch (error) {
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Note: better-auth doesn't have onSessionChange in the current version
        // We'll handle session changes through the authClient methods
    }, []);

    const signOut = async () => {
        await authClient.signOut();
        setSession(null);
    };

    return (
        <SessionContext.Provider value={{ session, loading, signOut }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
