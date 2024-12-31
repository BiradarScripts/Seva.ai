'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { User, Clock, Briefcase, CheckCircle } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'

export default function StaffManagement() {
  const { selectedHospital, filterDataByHospital } = useHospital()
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Priya Gupta', role: 'Cardiologist', status: 'On Duty', hospital: 'Arogya Hospital', shift: '8:00 AM - 4:00 PM' },
    { id: 2, name: 'Nurse Rahul Sharma', role: 'ER Nurse', status: 'Off Duty', hospital: 'Seva Medical Center', shift: '4:00 PM - 12:00 AM' },
    { id: 3, name: 'Dr. Anjali Desai', role: 'Pediatrician', status: 'On Call', hospital: 'Shanti Clinic', shift: '9:00 AM - 5:00 PM' },
  ])

  useEffect(() => {
    setStaff(filterDataByHospital(staff))
  }, [selectedHospital, filterDataByHospital])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Staff Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Staff Overview</h2>
            <div className="space-y-4">
              {staff.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{member.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'On Duty' ? 'bg-green-200 text-green-800' :
                      member.status === 'Off Duty' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {member.role}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      {member.hospital}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {member.shift}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Staff Statistics</h2>
            <div className="space-y-4">
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-100 mb-2">Total Staff</h3>
                <p className="text-blue-600 dark:text-blue-200">50</p>
              </div>
              <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-100 mb-2">On Duty</h3>
                <p className="text-green-600 dark:text-green-200">30</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-100 mb-2">On Call</h3>
                <p className="text-yellow-600 dark:text-yellow-200">10</p>
              </div>
              <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-100 mb-2">Off Duty</h3>
                <p className="text-red-600 dark:text-red-200">10</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

