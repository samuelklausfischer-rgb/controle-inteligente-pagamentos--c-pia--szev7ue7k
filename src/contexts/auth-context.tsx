import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { mockProfiles } from '@/lib/mock-data'

interface User {
  id: string
  name: string
  email: string
  perfil: 'financeiro' | 'gestor' | 'administrador'
  ativo: boolean
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function isMock() {
  return (
    import.meta.env.VITE_SUPABASE_URL === 'https://mock-project.supabase.co' ||
    !import.meta.env.VITE_SUPABASE_URL
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isMock()) {
      setUser(mockProfiles[0] as User)
      setIsLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (id: string, email: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
    if (data) {
      setUser({
        id: data.id,
        name: data.name || email,
        email: data.email,
        perfil: data.perfil,
        ativo: data.ativo,
        avatarUrl: data.avatar_url
          ? supabase.storage.from('avatars').getPublicUrl(data.avatar_url).data.publicUrl
          : undefined,
      })
    } else {
      setUser({
        id,
        name: email,
        email,
        perfil: 'financeiro',
        ativo: true,
      })
    }
    setIsLoading(false)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      if (isMock()) {
        if (email === 'samuelklausfischer@hotmail.com') {
          setUser(mockProfiles[0] as User)
        } else {
          setUser(mockProfiles[1] as User)
        }
        return
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    if (isMock()) {
      setUser(null)
      return
    }
    await supabase.auth.signOut()
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, login, logout } },
    children,
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
