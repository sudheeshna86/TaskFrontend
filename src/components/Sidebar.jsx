import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkItem = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-white hover:shadow ${isActive ? 'bg-white shadow' : 'text-gray-700'}`}>
    {children}
  </NavLink>
)

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <div className="mb-6 text-xl font-bold">Menu</div>
      <nav className="flex flex-col gap-2">
        <LinkItem to="/app/dashboard">Dashboard</LinkItem>
        <LinkItem to="/app/tasks">Tasks</LinkItem>
        <LinkItem to="/app/tasks/add">Add Task</LinkItem>
      </nav>
    </aside>
  )
}
