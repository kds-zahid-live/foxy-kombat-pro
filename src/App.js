import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { Pickaxe, Users, MessageSquare } from 'lucide-react'
import Foxx from "./Foxx";

const NavItem = ({ to, icon, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} className={`flex flex-col items-center justify-center ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}

const Exchange = () => <div className="p-4">Exchange Page Content</div>
const Mine = () => <div className="p-4">Mine Page Content</div>
const Friends = () => <div className="p-4">Friends Page Content</div>
const Earn = () => <div className="p-4">Earn Page Content</div>
const Airdrop = () => <div className="p-4">Airdrop Page Content</div>

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-full px-4 py-2">
      <nav className="flex justify-between items-center w-72">
        <NavItem
          to="/exchange"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 5.25L12 1.5L19.5 5.25V18.75L12 22.5L4.5 18.75V5.25ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
            </svg>
          }
          label="Exchange"
        />
        <NavItem to="/" icon={<Pickaxe className="w-6 h-6" />} label="Mine" />
        <NavItem to="/friends" icon={<Users className="w-6 h-6" />} label="Friends" />
        <NavItem to="/earn" icon={<MessageSquare className="w-6 h-6" />} label="Earn" />
        <NavItem
          to="/airdrop"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="#FFD700" />
              <circle cx="8" cy="9" r="1.5" fill="#000" />
              <circle cx="16" cy="9" r="1.5" fill="#000" />
              <path d="M15.5 14.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          label="Airdrop"
        />
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Foxx />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/airdrop" element={<Airdrop />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  )
}