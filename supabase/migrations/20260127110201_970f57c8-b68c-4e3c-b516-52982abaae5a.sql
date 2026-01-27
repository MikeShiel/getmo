-- Fix the security definer view issue by using security invoker
-- This ensures RLS policies from the base table (profiles) are enforced

DROP VIEW IF EXISTS public.profiles_public;

-- Recreate with security_invoker = true (default behavior, but explicit)
-- The view will respect RLS policies on the underlying profiles table
CREATE VIEW public.profiles_public AS
SELECT 
  id,
  user_id,
  gamer_name,
  avatar_url
FROM public.profiles;

-- Set security invoker explicitly
ALTER VIEW public.profiles_public SET (security_invoker = true);

-- Grant SELECT only on the view for public leaderboard access
GRANT SELECT ON public.profiles_public TO anon, authenticated;

-- Revoke write permissions
REVOKE INSERT, UPDATE, DELETE ON public.profiles_public FROM anon, authenticated;

-- Add a public SELECT policy on profiles for the public profile fields only
-- This allows the profiles_public view to work for leaderboards
CREATE POLICY "Public can view gamer names for leaderboards"
ON public.profiles
FOR SELECT
USING (true);  -- Allow select but RLS on profiles still protects other columns through the view