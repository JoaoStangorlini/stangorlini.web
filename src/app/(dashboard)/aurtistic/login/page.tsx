'use client';

import { useState } from 'react';
import { loginAurtistic, signupAurtistic } from '@/app/(dashboard)/aurtistic/actions';
import { useSearchParams } from 'next/navigation';

export default function AurtisticLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="h-full overflow-y-auto bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
        
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-[#FFCC00] mb-2">psychology</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Aurtistic</h1>
          <p className="text-[#8E8E8E] mt-2 text-sm">Seu espaço pessoal livre de distrações.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#93000a]/20 border border-[#93000a] text-[#ffdad6] rounded-md text-sm text-center font-bold">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex w-full mb-6 bg-[#252525] p-1 rounded-lg">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${isLogin ? 'bg-[#FFCC00] text-[#121212]' : 'text-[#8E8E8E] hover:text-white'}`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${!isLogin ? 'bg-[#9D4EDD] text-white' : 'text-[#8E8E8E] hover:text-white'}`}
            onClick={() => setIsLogin(false)}
          >
            Criar Conta
          </button>
        </div>

        {/* Forms */}
        <form className="flex flex-col gap-4" action={isLogin ? loginAurtistic : signupAurtistic}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#8E8E8E] uppercase tracking-wider mb-2" htmlFor="name">
                Nome (Opcional)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full bg-[#131313] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
                placeholder="Como prefere ser chamado?"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#8E8E8E] uppercase tracking-wider mb-2" htmlFor="username">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full bg-[#131313] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
              placeholder="seu_usuario"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#8E8E8E] uppercase tracking-wider mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full bg-[#131313] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#8E8E8E] uppercase tracking-wider mb-2" htmlFor="confirmPassword">
                Repetir Senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={!isLogin}
                minLength={6}
                className="w-full bg-[#131313] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full mt-4 font-bold py-3 rounded-lg transition-colors focus:ring-4 focus:outline-none ${isLogin ? 'bg-[#FFCC00] text-[#121212] hover:bg-[#e6b800] focus:ring-[#FFCC00]/20' : 'bg-[#9D4EDD] text-white hover:bg-[#8836ce] focus:ring-[#9D4EDD]/20'}`}
          >
            {isLogin ? 'Entrar no Planner' : 'Criar minha Conta'}
          </button>
        </form>

      </div>
    </div>
  );
}
