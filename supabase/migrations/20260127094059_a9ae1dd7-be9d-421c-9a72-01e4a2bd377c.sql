-- Drop the existing SELECT policy and recreate with explicit authenticated role
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create SELECT policy that explicitly requires authenticated role
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add explicit DELETE policy to prevent profile deletions
CREATE POLICY "No profile deletions allowed"
ON public.profiles
FOR DELETE
USING (false);