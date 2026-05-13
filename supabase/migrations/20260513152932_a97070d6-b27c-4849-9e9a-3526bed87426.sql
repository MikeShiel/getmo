-- 1) Revoke column-level SELECT on games.game_url from client roles
REVOKE SELECT (game_url) ON public.games FROM anon, authenticated;

-- 2) Revoke EXECUTE on internal SECURITY DEFINER helpers / trigger functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.validate_gamer_name() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

-- 3) Keep get_public_profiles callable (intentional public leaderboard)
GRANT EXECUTE ON FUNCTION public.get_public_profiles() TO anon, authenticated;