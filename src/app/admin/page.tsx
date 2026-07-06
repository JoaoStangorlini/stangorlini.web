'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/tarefas');
      router.refresh();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-cosmic-bg p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-cosmic-surface p-8 rounded-lg shadow-xl border border-cosmic-surface-hover">
        <h1 className="text-2xl font-bold text-cosmic-accent mb-6 text-center">Login (Admin)</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-cosmic-surface-hover/50 border border-cosmic-accent text-cosmic-accent rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-cosmic-text text-sm font-bold mb-2">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-cosmic-bg text-cosmic-text rounded border border-cosmic-surface-hover focus:border-cosmic-accent focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-cosmic-text text-sm font-bold mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-cosmic-bg text-cosmic-text rounded border border-cosmic-surface-hover focus:border-cosmic-accent focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cosmic-accent text-cosmic-bg font-bold py-3 px-4 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
