'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Task } from '@/types';

export async function saveTask(taskData: Partial<Task>) {
  const supabase = await createClient();

  // Se a tarefa foi marcada como "completa" e tem "frequencia", empurra para a frente
  let dataToSave = { ...taskData };
  
  if (dataToSave.status === 'completa' && dataToSave.frequencia) {
    const freq = dataToSave.frequencia.toLowerCase();
    let daysToAdd = 0;
    
    if (freq.includes('diária') || freq.includes('diaria') || freq.includes('dia')) daysToAdd = 1;
    else if (freq.includes('semanal') || freq.includes('semana')) daysToAdd = 7;
    else if (freq.includes('quinzenal') || freq.includes('quinzena')) daysToAdd = 15;
    else if (freq.includes('mensal') || freq.includes('mês') || freq.includes('mes')) daysToAdd = 30;
    else if (freq.includes('anual') || freq.includes('ano')) daysToAdd = 365;
    
    if (daysToAdd > 0) {
      if (dataToSave.prazo) {
        const p = new Date(dataToSave.prazo);
        p.setDate(p.getDate() + daysToAdd);
        dataToSave.prazo = p.toISOString();
      }
      if (dataToSave.inicio) {
        const i = new Date(dataToSave.inicio);
        i.setDate(i.getDate() + daysToAdd);
        dataToSave.inicio = i.toISOString();
      }
      dataToSave.status = 'não iniciada'; // Reseta o status
    }
  }

  // Remove empty strings and replace with null for database consistency
  Object.keys(dataToSave).forEach(key => {
    if (dataToSave[key as keyof Task] === '') {
      (dataToSave as any)[key] = null;
    }
  });

  if (dataToSave.id) {
    // Update existing task
    const { error } = await supabase
      .from('tasks')
      .update(dataToSave)
      .eq('id', dataToSave.id);

    if (error) throw new Error(error.message);
  } else {
    // Insert new task
    // user_id will be handled by RLS if possible, but let's grab it explicitly to be safe
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      dataToSave.user_id = user.id;
    }
    
    const { error } = await supabase
      .from('tasks')
      .insert([dataToSave]);

    if (error) throw new Error(error.message);
  }

  revalidatePath('/labdiv');
  revalidatePath('/servidor');
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  
  revalidatePath('/labdiv');
  revalidatePath('/servidor');
}
