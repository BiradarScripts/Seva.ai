'use client'

import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Clipboard, FileText, Calendar, Activity, BellRing, Users, Brain, TrendingUp, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Pending Reports', value: '56', icon: Clipboard, color: 'bg-green-500' },
    { title: 'Surgeries Today', value: '8', icon: Activity, color: 'bg-red-500' },
    { title: 'Staff on Duty', value: '42', icon: Users, color: 'bg-yellow-500' },
  ]

  const recentActivities = [
    { id: 1, action: 'Patient Admitted', details: 'John Doe admitted to City Hospital', time: '2 hours ago' },
    { id: 2, action: 'Surgery Completed', details: 'Appendectomy for Jane Smith successful', time: '4 hours ago' },
    { id: 3, action: 'New Staff Onboarded', details: 'Dr. Emily Johnson joined Central Medical Center', time: '1 day ago' },
    { id: 4, action: 'Emergency Response', details: 'Multi-car accident, 5 patients treated', time: '1 day ago' },
  ]

  const upcomingSchedule = [
    { id: 1, event: 'Board Meeting', time: '09:00 AM', location: 'Conference Room A' },
    { id: 2, event: 'Surgery: Hip Replacement', time: '11:30 AM', location: 'OR 2, City Hospital' },
    { id: 3, event: 'Staff Training', time: '02:00 PM', location: 'Training Center' },
    { id: 4, event: 'Patient Rounds', time: '04:00 PM', location: 'West Wing, Central Medical' },
  ]

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Welcome back, Dr. Ravi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.color} rounded-lg shadow-lg p-6 text-white`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
                <stat.icon className="w-10 h-10 opacity-80" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.details}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/activities" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-4 inline-block hover:underline">
              View all activities
            </Link>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Upcoming Schedule</h2>
            <div className="space-y-4">
              {upcomingSchedule.map((event) => (
                <div key={event.id} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{event.event}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.time} - {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/schedule" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-4 inline-block hover:underline">
              View full schedule
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Hospital Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">City Hospital</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">92% Efficiency</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Central Medical Center</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">87% Efficiency</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">West End Clinic</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">78% Efficiency</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Low Blood Supply</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">City Hospital - Type O Negative needed urgently</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Staff Shortage</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Central Medical Center - Night shift understaffed</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Equipment Malfunction</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">West End Clinic - MRI machine needs immediate attention</p>
                </div>
              </div>
            </div>
            <Link href="/alerts" className="text-red-600 dark:text-red-400 text-sm font-medium mt-4 inline-block hover:underline">
              View all alerts
            </Link>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition duration-300">
                New Admission
              </button>
              <button className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition duration-300">
                Schedule Surgery
              </button>
              <button className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition duration-300">
                Order Supplies
              </button>
              <button className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition duration-300">
                Emergency Protocol
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  )
}

