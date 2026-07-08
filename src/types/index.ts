export interface Task {
  id: string;
  created_at: string;
  nome: string;
  status: string;
  prioridade: string | null;
  categoria: string | null;
  responsavel: string | null;
  inicio: string | null;
  prazo: string | null;
  descricao: string | null;
  frequencia: string | null;
  dimensao: string | null;
  user_id: string;
}
