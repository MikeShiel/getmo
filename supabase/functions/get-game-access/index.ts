import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { gameId } = await req.json()
    
    if (!gameId) {
      console.error('Missing gameId in request')
      return new Response(
        JSON.stringify({ error: 'Game ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Processing game access request for gameId:', gameId)

    // Create Supabase client with user's auth context
    const authHeader = req.headers.get('Authorization')
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader ?? '' } } }
    )

    // Fetch game details
    const { data: game, error: gameError } = await supabase
      .from('games')
      .select('id, title, game_url, is_free')
      .eq('id', gameId)
      .maybeSingle()

    if (gameError) {
      console.error('Error fetching game:', gameError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch game' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!game) {
      console.log('Game not found:', gameId)
      return new Response(
        JSON.stringify({ error: 'Game not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Game found:', game.title, 'is_free:', game.is_free)

    // If game is free, allow access
    if (game.is_free) {
      console.log('Free game - access granted')
      return new Response(
        JSON.stringify({ 
          canPlay: true, 
          gameUrl: game.game_url,
          reason: 'free_game'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // For premium games, check authentication
    if (!authHeader) {
      console.log('No auth header - premium game requires login')
      return new Response(
        JSON.stringify({ 
          canPlay: false, 
          gameUrl: null,
          reason: 'login_required'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate JWT using getUser for proper token validation
    // This validates the token signature, expiry, and fetches current user data
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Auth validation failed:', userError)
      return new Response(
        JSON.stringify({ 
          canPlay: false, 
          gameUrl: null,
          reason: 'login_required'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = user.id
    console.log('Authenticated user:', userId)

    // Check premium status from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('user_id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
      return new Response(
        JSON.stringify({ error: 'Failed to verify subscription status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has premium access
    if (profile?.is_premium === true) {
      console.log('Premium user - access granted')
      return new Response(
        JSON.stringify({ 
          canPlay: true, 
          gameUrl: game.game_url,
          reason: 'premium_user'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // User is registered but not premium
    console.log('Non-premium user - subscription required')
    return new Response(
      JSON.stringify({ 
        canPlay: false, 
        gameUrl: null,
        reason: 'subscription_required'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
