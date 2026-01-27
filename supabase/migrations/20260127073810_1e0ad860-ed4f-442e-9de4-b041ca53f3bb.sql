-- Fix #1: Add explicit deny policies for games table write operations
-- This ensures no one can INSERT, UPDATE, or DELETE games via client-side queries
-- Admin operations should be done via Dashboard or Edge Functions with service_role

CREATE POLICY "No public insert on games"
ON public.games FOR INSERT
WITH CHECK (false);

CREATE POLICY "No public update on games"
ON public.games FOR UPDATE
USING (false);

CREATE POLICY "No public delete on games"
ON public.games FOR DELETE
USING (false);