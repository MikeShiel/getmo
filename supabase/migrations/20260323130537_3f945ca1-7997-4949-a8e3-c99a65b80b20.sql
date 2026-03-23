
-- Create purchased_vouchers table
CREATE TABLE public.purchased_vouchers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  voucher_id TEXT NOT NULL,
  key_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  platform TEXT NOT NULL DEFAULT 'other',
  voucher_type TEXT NOT NULL DEFAULT 'Game Key',
  variant_label TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create key_reveal_logs table
CREATE TABLE public.key_reveal_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  purchased_voucher_id UUID REFERENCES public.purchased_vouchers(id) ON DELETE CASCADE NOT NULL,
  revealed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.purchased_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.key_reveal_logs ENABLE ROW LEVEL SECURITY;

-- RLS: users can only read their own purchased vouchers
CREATE POLICY "Users can view own purchased vouchers"
  ON public.purchased_vouchers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS: users can update their own vouchers (e.g. mark as used)
CREATE POLICY "Users can update own purchased vouchers"
  ON public.purchased_vouchers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS: users can insert their own purchased vouchers
CREATE POLICY "Users can insert own purchased vouchers"
  ON public.purchased_vouchers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS: users can view their own key reveal logs
CREATE POLICY "Users can view own key reveal logs"
  ON public.key_reveal_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS: users can insert their own key reveal logs
CREATE POLICY "Users can insert own key reveal logs"
  ON public.key_reveal_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
