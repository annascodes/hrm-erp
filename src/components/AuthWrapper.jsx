'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function AuthWrapper({ children }) {
  const user = useSelector(state => state.user.currentUser)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/login') // Redirect if not logged in
    }
  }, [user, router])

  // Optional: Show nothing or loader while checking auth
  if (!user) return null

  return children
}
