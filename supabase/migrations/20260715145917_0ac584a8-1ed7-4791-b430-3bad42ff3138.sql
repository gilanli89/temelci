
-- Phase 1a: add new enum values (must commit before use)
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'translator';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lead_manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'viewer';
