-- Drop the overly permissive policy we just created
DROP POLICY IF EXISTS "Anyone can view public profile fields" ON public.profiles;

-- Recreate the owner-only SELECT policy for the base table
-- This protects sensitive fields when querying profiles directly
CREATE POLICY "Users can view their own full profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Grant SELECT on the public view to anon and authenticated roles
GRANT SELECT ON public.profiles_public TO anon, authenticated;