import { getCurrentUser } from '@/api/auth'
import { UserType } from '@/types/user.types'
import { createContext, useCallback, useEffect, useState } from 'react'

interface AuthContextUser {
  type: UserType
  username: string
}

interface AuthContextData {
  user?: AuthContextUser
  refreshUser: () => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextUser | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const refreshUser = useCallback(async () => {
    setLoading(true)
    try {
      const user = await getCurrentUser()
      setUser(user)
    } catch (e) {
      logout()
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const logout = async () => {
    setUser(undefined)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
