-- Este programa é um software livre (Licença AGPLv3)
-- Unificação Aurtistic e stangorlini.web

ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS resumo TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS curriculo JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS portfolio JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS features_config JSONB DEFAULT '{"active": ["tasks", "resumo", "curriculo", "portfolio"], "order": ["tasks", "resumo", "curriculo", "portfolio"], "layout_style": "default"}'::jsonb;
