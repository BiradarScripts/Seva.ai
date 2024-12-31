'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'
import { useChat } from 'ai/react'

export default function PatientReports() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const { selectedHospital, filterDataByHospital } = useHospital()
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      { role: 'system', content: 'You are an AI assistant for patient reports. You can provide information about patients and their medical history.' },
    ],
  })

  useEffect(() => {
    // Simulating API call to fetch patients based on selected hospital
    const fetchPatients = () => {
      const allPatients = [
        { id: 1, name: 'Aarav Patel', age: 45, lastUpdate: '2023-05-15', status: 'Stable', diagnosis: 'Hypertension', doctor: 'Dr. Gupta', hospital: 'Arogya Hospital' },
        { id: 2, name: 'Diya Sharma', age: 32, lastUpdate: '2023-05-14', status: 'Critical', diagnosis: 'Pneumonia', doctor: 'Dr. Kumar', hospital: 'Seva Medical Center' },
        { id: 3, name: 'Arjun Singh', age: 58, lastUpdate: '2023-05-13', status: 'Recovering', diagnosis: 'Fractured Leg', doctor: 'Dr. Reddy', hospital: 'Shanti Clinic' },
        { id: 4, name: 'Ananya Desai', age: 27, lastUpdate: '2023-05-16', status: 'Stable', diagnosis: 'Migraine', doctor: 'Dr. Joshi', hospital: 'Arogya Hospital' },
        { id: 5, name: 'Vikram Malhotra', age: 62, lastUpdate: '2023-05-12', status: 'Critical', diagnosis: 'Heart Attack', doctor: 'Dr. Chopra', hospital: 'Seva Medical Center' },
      ]

      return allPatients
    }

    const allPatients = fetchPatients()
    setPatients(filterDataByHospital(allPatients))
  }, [selectedHospital, filterDataByHospital])

  const filteredPatients = patients
    .filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(patient => filterStatus === 'All' || patient.status === filterStatus)

  const patientsPerPage = 3
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  )

  const handleViewReport = (patient) => {
    setSelectedPatient(patient)
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Patient Reports {selectedHospital && selectedHospital.id !== 'all' ? `- ${selectedHospital.name}` : ''}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="relative w-full md:w-auto mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Stable">Stable</option>
                  <option value="Critical">Critical</option>
                  <option value="Recovering">Recovering</option>
                </select>
                <button className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200">
                  <Plus size={20} className="mr-2" />
                  New Report
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Last Update</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Diagnosis</th>
                    <th className="px-4 py-2 text-left">Doctor</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPatients.map((patient) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{patient.name}</td>
                      <td className="px-4 py-2">{patient.age}</td>
                      <td className="px-4 py-2">{patient.lastUpdate}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          patient.status === 'Stable' ? 'bg-green-200 text-green-800' :
                          patient.status === 'Critical' ? 'bg-red-200 text-red-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{patient.diagnosis}</td>
                      <td className="px-4 py-2">{patient.doctor}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button className="text-blue-500 hover:text-blue-600" title="View" onClick={() => handleViewReport(patient)}>
                            <Eye size={18} />
                          </button>
                          <button className="text-green-500 hover:text-green-600" title="Edit">
                            <Edit size={18} />
                          </button>
                          <button className="text-red-500 hover:text-red-600" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((currentPage - 1) * patientsPerPage) + 1} to {Math.min(currentPage * patientsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
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
                  placeholder="Ask about patient reports..."
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        {selectedPatient && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Patient Report</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Status:</strong> {selectedPatient.status}</p>
              <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
              <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
              <p><strong>Hospital:</strong> {selectedPatient.hospital}</p>
              <p><strong>Last Update:</strong> {selectedPatient.lastUpdate}</p>
            </div>
            <button 
              onClick={() => setSelectedPatient(null)}
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

