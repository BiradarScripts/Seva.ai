'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Eye, MessageSquare } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'
import { useChat } from 'ai/react'

export default function Prescriptions() {
  const { selectedHospital, filterDataByHospital } = useHospital()
  const [prescriptions, setPrescriptions] = useState([])
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      { role: 'system', content: 'You are an AI assistant for prescriptions. You can provide information about medications, dosages, and potential side effects.' },
    ],
  })

  useEffect(() => {
    const allPrescriptions = [
      { id: 1, patient: 'Aarav Patel', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', date: '2023-05-15', hospital: 'Arogya Hospital' },
      { id: 2, patient: 'Diya Sharma', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', date: '2023-05-14', hospital: 'Seva Medical Center' },
      { id: 3, patient: 'Arjun Singh', medication: 'Metformin', dosage: '1000mg', frequency: 'With meals', date: '2023-05-13', hospital: 'Shanti Clinic' },
    ]

    setPrescriptions(filterDataByHospital(allPrescriptions))
  }, [selectedHospital, filterDataByHospital])

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription)
  }

  const closeModal = () => {
    setSelectedPrescription(null)
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Prescriptions</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Filter size={20} className="mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200">
                  <Plus size={20} className="mr-2" />
                  New Prescription
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left">Patient</th>
                    <th className="px-4 py-2 text-left">Medication</th>
                    <th className="px-4 py-2 text-left">Dosage</th>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((prescription) => (
                    <motion.tr
                      key={prescription.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{prescription.patient}</td>
                      <td className="px-4 py-2">{prescription.medication}</td>
                      <td className="px-4 py-2">{prescription.dosage}</td>
                      <td className="px-4 py-2">{prescription.frequency}</td>
                      <td className="px-4 py-2">{prescription.date}</td>
                      <td className="px-4 py-2">
                        <button className="text-indigo-500 hover:text-indigo-600 mr-2" onClick={() => handleViewPrescription(prescription)}>
                          <Eye size={18} />
                        </button>
                        <button className="text-indigo-500 hover:text-indigo-600">Edit</button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">AI Assistant</h2>
            <div className="space-y-4">
              <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                {messages.map((message, i) => (
                  <div key={i} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about prescriptions..."
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        {selectedPrescription && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Patient:</strong> {selectedPrescription.patient}</p>
              <p><strong>Medication:</strong> {selectedPrescription.medication}</p>
              <p><strong>Dosage:</strong> {selectedPrescription.dosage}</p>
              <p><strong>Frequency:</strong> {selectedPrescription.frequency}</p>
              <p><strong>Date:</strong> {selectedPrescription.date}</p>
              <p><strong>Hospital:</strong> {selectedPrescription.hospital}</p>
            </div>
            <button 
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </Layout>
  )
}

