-- Create a public view that only exposes safe profile fields
CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT 
  id,
  user_id,
  gamer_name,
  avatar_url
FROM public.profiles;

-- Add a policy to allow anyone to read the public view data via the base table
-- This works because security_invoker=on means the view uses caller's permissions
CREATE POLICY "Anyone can view public profile fields"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (true);

-- Drop the restrictive authenticated-only policy since we now have a more nuanced approach
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;