'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Invalid credentials')
  }

  const next = formData.get('next') as string;
  revalidatePath('/', 'layout');

  if (next && next.startsWith('/')) {
    redirect(next);
  } else {
    // Fallback inteligente
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id === 'f2f1e6c9-a178-433f-9d87-37d6ce7ec94e') {
      redirect('/servidor');
    } else {
      redirect('/labdiv');
    }
  }
}
