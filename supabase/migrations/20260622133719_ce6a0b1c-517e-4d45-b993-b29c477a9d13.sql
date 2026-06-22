
-- Revoke default PUBLIC execute on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.merge_guest_xp(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_public_profiles() FROM PUBLIC;

-- Re-grant only what's needed
GRANT EXECUTE ON FUNCTION public.merge_guest_xp(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_profiles() TO anon, authenticated;
