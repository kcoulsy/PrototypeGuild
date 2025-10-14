'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';

export default function SignupPage() {
    const [name, setName] = useState('');
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
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || 'Failed to create account');
            } else {
                router.push('/login');
            }
        } catch (error) {
            setError('Unable to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Sign Up" styleName="panel-sm">
                    <form className="proto-form" onSubmit={handleSubmit}>
                        {error && <div className="error">{error}</div>}
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            autoComplete="name"
                            required
                        />
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
                            autoComplete="new-password"
                            required
                        />
                        <button
                            className="proto-btn"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>
                    <Link href="/login" className="link-button">
                        Already have an account? Login
                    </Link>
                </Panel>
            </div>
        </div>
    );
}
