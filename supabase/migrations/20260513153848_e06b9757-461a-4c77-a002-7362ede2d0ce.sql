-- Block direct client writes to sensitive profile columns
REVOKE UPDATE (is_premium, xp_points, xp_level) ON public.profiles FROM anon, authenticated;

-- Safe server-side guest XP merge with a cap
CREATE OR REPLACE FUNCTION public.merge_guest_xp(_xp integer)
RETURNS TABLE (xp_points integer, xp_level integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  capped_xp integer;
  new_xp integer;
  new_level integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Sanity-cap incoming guest XP to prevent leaderboard inflation
  capped_xp := GREATEST(0, LEAST(COALESCE(_xp, 0), 5000));

  UPDATE public.profiles
  SET
    xp_points = COALESCE(xp_points, 0) + capped_xp,
    xp_level  = 1 + ((COALESCE(xp_points, 0) + capped_xp) / 1000)
  WHERE user_id = auth.uid()
  RETURNING profiles.xp_points, profiles.xp_level
  INTO new_xp, new_level;

  RETURN QUERY SELECT new_xp, new_level;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.merge_guest_xp(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.merge_guest_xp(integer) TO authenticated;