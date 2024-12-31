// 'use client'

// import { useState, useEffect } from 'react'
// import Layout from '../components/Layout'
// import { motion } from 'framer-motion'
// import { Bed, User, Clock, Activity } from 'lucide-react'
// import { useHospital } from '../contexts/HospitalContext'


'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Bed, User, Clock, Activity } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'

export default function BedsAndRounds() {
  const { selectedHospital, filterDataByHospital } = useHospital()
  const [patients, setPatients] = useState([
    { id: 1, name: 'Aarav Patel', age: 45, bed: '101A', status: 'Stable', lastRound: '2 hours ago', nextRound: 'In 1 hour', hospital: 'Arogya Hospital' },
    { id: 2, name: 'Diya Sharma', age: 32, bed: '203B', status: 'Critical', lastRound: '30 minutes ago', nextRound: 'In 30 minutes', hospital: 'Seva Medical Center' },
    { id: 3, name: 'Arjun Singh', age: 58, bed: '105C', status: 'Recovering', lastRound: '4 hours ago', nextRound: 'In 2 hours', hospital: 'Shanti Clinic' },
  ])

  useEffect(() => {
    setPatients(filterDataByHospital(patients))
  }, [selectedHospital, filterDataByHospital])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Beds and Rounds Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Patient Rounds</h2>
            <div className="space-y-4">
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{patient.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === 'Stable' ? 'bg-green-200 text-green-800' :
                      patient.status === 'Critical' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      Age: {patient.age}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Bed className="w-4 h-4 mr-2" />
                      Bed: {patient.bed}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      Last Round: {patient.lastRound}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Activity className="w-4 h-4 mr-2" />
                      Next Round: {patient.nextRound}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bed Availability</h2>
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-100 mb-2">General Ward</h3>
                <p className="text-green-600 dark:text-green-200">15 beds available</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-100 mb-2">ICU</h3>
                <p className="text-yellow-600 dark:text-yellow-200">3 beds available</p>
              </div>
              <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-100 mb-2">Emergency Room</h3>
                <p className="text-red-600 dark:text-red-200">1 bed available</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

