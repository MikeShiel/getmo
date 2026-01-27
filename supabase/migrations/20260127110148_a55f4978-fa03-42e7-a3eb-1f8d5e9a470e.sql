-- Enable RLS on profiles_public view (it's actually a view, but we need to secure it)
-- First, let's check if profiles_public is a view and add appropriate policies

-- Since profiles_public is a VIEW (as seen in the types), we need to ensure it only exposes safe data
-- Views in PostgreSQL inherit RLS from their base tables, but we should add a security barrier

-- Drop the existing view and recreate with security barrier
DROP VIEW IF EXISTS public.profiles_public;

-- Recreate as a security barrier view that only shows gamer_name and avatar_url
CREATE VIEW public.profiles_public WITH (security_barrier = true) AS
SELECT 
  id,
  user_id,
  gamer_name,
  avatar_url
FROM public.profiles;

-- Grant SELECT only on the view
GRANT SELECT ON public.profiles_public TO anon, authenticated;

-- Revoke any other permissions
REVOKE INSERT, UPDATE, DELETE ON public.profiles_public FROM anon, authenticated;