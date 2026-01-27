-- Remove the overly permissive SELECT policy
DROP POLICY IF EXISTS "Public can view gamer names for leaderboards" ON public.profiles;

-- profiles_public is a view, not a table, so RLS doesn't apply directly to it
-- Views with security_invoker inherit RLS from the base table
-- We need to keep the original restrictive policy for profiles
-- and use profiles_public view for leaderboard data

-- The profiles_public view already exists with security_invoker = true
-- It will use the caller's permissions, but since the view only selects
-- specific columns, that's the safe approach

-- For leaderboards to work, we need authenticated users to be able to view 
-- other users' public profile data. Let's create a function-based approach instead.

-- Create a secure function to get leaderboard data
CREATE OR REPLACE FUNCTION public.get_public_profiles()
RETURNS TABLE (
  id uuid,
  gamer_name text,
  avatar_url text,
  xp_points integer,
  xp_level integer
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, gamer_name, avatar_url, xp_points, xp_level
  FROM profiles
  ORDER BY xp_points DESC
  LIMIT 100;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_public_profiles() TO anon, authenticated;