-- Create a validation trigger for gamer_name instead of CHECK constraint
-- (Using trigger because CHECK constraints must be immutable)

-- Create validation function for gamer_name
CREATE OR REPLACE FUNCTION public.validate_gamer_name()
RETURNS TRIGGER AS $$
BEGIN
  -- If gamer_name is provided, validate and sanitize it
  IF NEW.gamer_name IS NOT NULL THEN
    -- Trim whitespace
    NEW.gamer_name := TRIM(NEW.gamer_name);
    
    -- Remove control characters
    NEW.gamer_name := REGEXP_REPLACE(NEW.gamer_name, E'[\\x00-\\x1F\\x7F]', '', 'g');
    
    -- If empty after sanitization, set to NULL (will use default)
    IF NEW.gamer_name = '' THEN
      NEW.gamer_name := NULL;
    END IF;
    
    -- Enforce length limits
    IF NEW.gamer_name IS NOT NULL THEN
      IF LENGTH(NEW.gamer_name) < 3 THEN
        RAISE EXCEPTION 'Gamer name must be at least 3 characters';
      END IF;
      IF LENGTH(NEW.gamer_name) > 20 THEN
        NEW.gamer_name := LEFT(NEW.gamer_name, 20);
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for INSERT and UPDATE
DROP TRIGGER IF EXISTS validate_gamer_name_trigger ON public.profiles;
CREATE TRIGGER validate_gamer_name_trigger
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.validate_gamer_name();

-- Update handle_new_user function with input sanitization
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  clean_gamer_name TEXT;
BEGIN
  -- Get gamer name from user metadata
  clean_gamer_name := NEW.raw_user_meta_data->>'gamer_name';
  
  -- Sanitize: trim and remove control characters
  IF clean_gamer_name IS NOT NULL THEN
    clean_gamer_name := TRIM(clean_gamer_name);
    clean_gamer_name := REGEXP_REPLACE(clean_gamer_name, E'[\\x00-\\x1F\\x7F]', '', 'g');
    
    -- If empty after sanitization or too short, use default
    IF clean_gamer_name = '' OR LENGTH(clean_gamer_name) < 3 THEN
      clean_gamer_name := NULL;
    END IF;
    
    -- Truncate if too long
    IF clean_gamer_name IS NOT NULL AND LENGTH(clean_gamer_name) > 20 THEN
      clean_gamer_name := LEFT(clean_gamer_name, 20);
    END IF;
  END IF;
  
  -- Use default if no valid gamer name
  IF clean_gamer_name IS NULL THEN
    clean_gamer_name := 'Player' || substr(NEW.id::text, 1, 8);
  END IF;
  
  INSERT INTO public.profiles (user_id, gamer_name)
  VALUES (NEW.id, clean_gamer_name);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;