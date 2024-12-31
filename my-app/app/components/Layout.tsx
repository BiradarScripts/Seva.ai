'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, Clipboard, FileText, Calendar, Activity, BellRing, Users, Brain, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHospital } from '../contexts/HospitalContext'

const menuItems = [
  { icon: Home, text: 'Home', href: '/' },
  { icon: Home, text: 'Dashboard', href: '/dashboard' },
  { icon: Clipboard, text: 'Patient Reports', href: '/patient-reports' },
  { icon: FileText, text: 'Prescriptions', href: '/prescriptions' },
  { icon: Calendar, text: 'Scheduling', href: '/scheduling' },
  { icon: Activity, text: 'Operation Theatre', href: '/operation-theatre' },
  { icon: Users, text: 'Beds & Rounds', href: '/beds-and-rounds' },
  { icon: BellRing, text: 'Emergency', href: '/emergency' },
  { icon: Users, text: 'Staff Management', href: '/staff-management' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const pathname = usePathname()
  const { selectedHospital, setSelectedHospital, hospitals } = useHospital()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <motion.nav
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-20"
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">seva+.ai</h1>
        </div>
        <ul className="py-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} passHref>
                <motion.a
                  className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 ${
                    pathname === item.href ? 'bg-indigo-50 dark:bg-gray-700' : ''
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.text}
                </motion.a>
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 dark:text-gray-300 focus:outline-none mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <select
              value={selectedHospital?.id || ''}
              onChange={(e) => {
                const hospital = hospitals.find(h => h.id === e.target.value) || null
                setSelectedHospital(hospital)
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">Dr. Ravi</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
            />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

