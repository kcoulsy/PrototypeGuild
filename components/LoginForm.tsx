'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError('Invalid email or password');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setError('Unable to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="proto-form" onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                />
                <button
                    className="proto-btn"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <Link href="/apply" className="link-button">
                Click here to Apply
            </Link>
        </>
    );
}
