-- ==========================================
-- Migração Mk7: Normatização de Tarefas
-- ==========================================

-- 1. Atualiza os nomes dos responsáveis para o padrão curto
UPDATE tasks SET responsavel = 'João' WHERE responsavel = 'Joao Paulo Stangorlini de Carvalho';
UPDATE tasks SET responsavel = 'Andy' WHERE responsavel = 'Andy Raposo';

-- 2. Traduz e normatiza os Status que vieram em inglês do CSV
UPDATE tasks SET status = 'completa' WHERE status = 'COMPLETED';
UPDATE tasks SET status = 'falta testar' WHERE status = 'BACKLOG';
UPDATE tasks SET status = 'descartada' WHERE status = 'DISCARDED';
UPDATE tasks SET status = 'em progresso' WHERE status = 'IN_PROGRESS';
UPDATE tasks SET status = 'não iniciada' WHERE status = 'NOT_STARTED';

-- Nota: Certifique-se de executar este script no painel SQL do Supabase.
