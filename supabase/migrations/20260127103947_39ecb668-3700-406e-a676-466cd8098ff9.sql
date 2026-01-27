-- Add xp_reward column to games table
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS xp_reward integer DEFAULT 50;

-- Update existing games with XP values based on free/premium status
UPDATE public.games SET xp_reward = CASE 
  WHEN is_free = true THEN 75 
  ELSE 150 
END;