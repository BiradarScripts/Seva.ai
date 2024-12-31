'use client'

import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, MapPin, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useHospital } from '../contexts/HospitalContext'

export default function Emergency() {
  const [emergencies, setEmergencies] = useState([])
  const { hospitals } = useHospital()

  useEffect(() => {
    // Simulating API call to fetch emergencies from all hospitals
    const fetchEmergencies = () => {
      return [
        { id: 1, type: 'Cardiac Arrest', location: 'Arogya Hospital', time: '10 minutes ago', status: 'Critical', patient: 'Vikram Malhotra' },
        { id: 2, type: 'Multiple Trauma', location: 'Seva Medical Center', time: '25 minutes ago', status: 'Severe', patient: 'Ananya Desai' },
        { id: 3, type: 'Stroke', location: 'Shanti Clinic', time: '40 minutes ago', status: 'Moderate', patient: 'Rajesh Kumar' },
      ]
    }

    setEmergencies(fetchEmergencies())
  }, [])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Emergency Management (All Hospitals)</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Active Emergencies</h2>
            <div className="space-y-4">
              {emergencies.map((emergency) => (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{emergency.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      emergency.status === 'Critical' ? 'bg-red-200 text-red-800' :
                      emergency.status === 'Severe' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {emergency.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {emergency.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {emergency.time}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      {emergency.patient}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                      Respond
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Emergency Resources</h2>
            <div className="space-y-4">
              {hospitals.filter(h => h.id !== 'all').map((hospital) => (
                <div key={hospital.id} className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-100 mb-2">{hospital.name}</h3>
                  <p className="text-blue-600 dark:text-blue-200">
                    Ambulances: {Math.floor(Math.random() * 5) + 1} available
                  </p>
                  <p className="text-blue-600 dark:text-blue-200">
                    Emergency Rooms: {Math.floor(Math.random() * 3) + 1} ready
                  </p>
                  <p className="text-blue-600 dark:text-blue-200">
                    On-Call Staff: {Math.floor(Math.random() * 10) + 5} available
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

