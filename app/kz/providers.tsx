'use client'

const SessionContextProvider = require('@supabase/auth-helpers-react').SessionContextProvider
const supabase = require('/lib/supabaseClient').supabase

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
