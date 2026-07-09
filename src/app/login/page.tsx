import { login } from '@/app/login/actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const next = typeof searchParams?.next === 'string' ? searchParams.next : '';

  if (user) {
    redirect('/servidor')
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#e5e2e1] tracking-tight">LOGIN</h1>
          <p className="text-[#a0a0a0] mt-2 text-sm">Acesso Restrito</p>
        </div>

        <form className="flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label className="block text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-[#131313] border border-[#2D2D2D] text-[#e5e2e1] px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-[#131313] border border-[#2D2D2D] text-[#e5e2e1] px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button
            formAction={login}
            className="w-full mt-4 bg-[#FFCC00] text-[#121212] font-bold py-3 rounded-lg hover:bg-[#e6b800] transition-colors focus:ring-4 focus:ring-[#FFCC00]/20"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
