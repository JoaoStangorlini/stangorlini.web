'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Task } from '@/types';

export async function updateTaskOrders(updates: { id: string, ordem_manual: number }[]) {
  const supabase = await createClient();
  
  // Executar os updates individualmente
  for (const update of updates) {
    const { error } = await supabase
      .from('tasks')
      .update({ ordem_manual: update.ordem_manual })
      .eq('id', update.id);
      
    if (error) {
      console.error("Erro ao atualizar ordem:", error);
      throw new Error(error.message);
    }
  }
}

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
      dataToSave.concluida_em = null;
    }
  } else if (dataToSave.status === 'completa') {
    // Se marcou como completa e não é recorrente (ou não tem frequencia)
    dataToSave.concluida_em = new Date().toISOString();
  } else {
    // Se mudou para qualquer outro status, remove a data de conclusão
    dataToSave.concluida_em = null;
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

export async function updateMultipleTasks(taskIds: string[], updates: Partial<Task>) {
  const supabase = await createClient();

  // Remove empty strings and replace with null for database consistency
  const dataToSave = { ...updates };
  Object.keys(dataToSave).forEach(key => {
    if (dataToSave[key as keyof Task] === '') {
      (dataToSave as any)[key] = null;
    }
  });

  // Se marcou o status como "completa" na edição múltipla, vamos tratar o concluida_em simplificadamente.
  // Note: a lógica complexa de recorrência será ignorada para edições em massa por segurança (para evitar dupes).
  if (dataToSave.status === 'completa') {
    dataToSave.concluida_em = new Date().toISOString();
  } else if (dataToSave.status && dataToSave.status !== 'completa') {
    dataToSave.concluida_em = null;
  }

  const { error } = await supabase
    .from('tasks')
    .update(dataToSave)
    .in('id', taskIds);

  if (error) {
    console.error("Erro na edição em massa:", error);
    throw new Error(error.message);
  }

  revalidatePath('/labdiv');
  revalidatePath('/servidor');
}
