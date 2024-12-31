'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Activity, Clock, User, Hospital } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'

export default function OperationTheatre() {
  const { selectedHospital, filterDataByHospital } = useHospital()
  const [surgeries, setSurgeries] = useState([
    { id: 1, patient: 'Aarav Patel', type: 'Appendectomy', status: 'In Progress', startTime: '09:00 AM', duration: '2 hours', surgeon: 'Dr. Gupta', hospital: 'Arogya Hospital' },
    { id: 2, patient: 'Diya Sharma', type: 'Hip Replacement', status: 'Scheduled', startTime: '11:30 AM', duration: '3 hours', surgeon: 'Dr. Kumar', hospital: 'Seva Medical Center' },
    { id: 3, patient: 'Arjun Singh', type: 'Cataract Surgery', status: 'Completed', startTime: '02:00 PM', duration: '1 hour', surgeon: 'Dr. Reddy', hospital: 'Shanti Clinic' },
  ])

  useEffect(() => {
    setSurgeries(filterDataByHospital(surgeries))
  }, [selectedHospital, filterDataByHospital])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Operation Theatre Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Today's Surgeries</h2>
            <div className="space-y-4">
              {surgeries.map((surgery) => (
                <motion.div
                  key={surgery.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{surgery.patient}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      surgery.status === 'In Progress' ? 'bg-green-200 text-green-800' :
                      surgery.status === 'Scheduled' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {surgery.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Activity className="w-4 h-4 mr-2" />
                      {surgery.type}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {surgery.startTime} ({surgery.duration})
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      {surgery.surgeon}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Hospital className="w-4 h-4 mr-2" />
                      {surgery.hospital}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Theatre Status</h2>
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-100 mb-2">Theatre 1</h3>
                <p className="text-green-600 dark:text-green-200">In Use</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-100 mb-2">Theatre 2</h3>
                <p className="text-yellow-600 dark:text-yellow-200">Preparing</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-100 mb-2">Theatre 3</h3>
                <p className="text-blue-600 dark:text-blue-200">Available</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

