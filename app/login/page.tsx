'use client';

import { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { loginAction } from '@/lib/actions/users';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { execute, isExecuting, result } = useAction(loginAction, {
        onSuccess: ({ data }) => {
            if (data?.success) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('profile', JSON.stringify(data.user));
                router.push('/dashboard');
            }
        },
        onError: ({ error }) => {
            setError('Unable to login');
        },
    });

    useEffect(() => {
        // Check if already logged in
        const profile = localStorage.getItem('profile');
        if (profile) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError('');
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        execute({ username, password });
    };

    return (
        <div>
            <Navbar loggedIn={false} />
            <div className="content">
                <Panel title="Login" styleName="panel-sm">
                    <form className="proto-form">
                        {error}
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInput}
                            placeholder="Username"
                            autoComplete="username"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInput}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        <button
                            className="proto-btn"
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isExecuting}
                        >
                            {isExecuting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <Link href="/apply" className="link-button">
                        Click here to Apply
                    </Link>
                </Panel>
            </div>
        </div>
    );
}
