import { createClient } from '@supabase/supabase-js'

// This grabs your secret keys from the .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This creates the official connection cable
export const supabase = createClient(supabaseUrl, supabaseKey)