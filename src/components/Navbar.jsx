import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="text-lg font-semibold">TaskApp</div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-sm text-gray-600">Hi, {user?.name || user?.username}</div>
        <button onClick={logout} className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600">Logout</button>
      </div>
    </header>
  )
}
