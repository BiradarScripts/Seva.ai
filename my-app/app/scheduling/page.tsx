'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Activity, Users, Brain, MessageSquare } from 'lucide-react'
import { useHospital } from '../contexts/HospitalContext'
import { useChat } from 'ai/react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'

export default function Scheduling() {
  const [activeTab, setActiveTab] = useState('regular')
  const { selectedHospital, filterDataByHospital } = useHospital()
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Aarav Patel', time: '09:00 AM', type: 'Consultation', hospital: 'Arogya Hospital' },
    { id: 2, patient: 'Diya Sharma', time: '11:30 AM', type: 'Surgery', hospital: 'Seva Medical Center' },
    { id: 3, patient: 'Arjun Singh', time: '02:00 PM', type: 'Follow-up', hospital: 'Shanti Clinic' },
  ])

  const [smartSchedule, setSmartSchedule] = useState([
    { id: 1, hospital: 'Arogya Hospital', time: '09:00 AM - 11:00 AM', priority: 'High', patients: 5 },
    { id: 2, hospital: 'Seva Medical Center', time: '12:00 PM - 02:00 PM', priority: 'Medium', patients: 3 },
    { id: 3, hospital: 'Shanti Clinic', time: '03:00 PM - 05:00 PM', priority: 'Low', patients: 2 },
  ])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      { role: 'system', content: 'You are an AI assistant for scheduling. You can provide information about appointments, suggest optimal scheduling, and answer questions about time management.' },
    ],
  })

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setAppointments(filterDataByHospital(appointments))
    setSmartSchedule(filterDataByHospital(smartSchedule))
  }, [selectedHospital, filterDataByHospital])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Scheduling</h1>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'regular' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setActiveTab('regular')}
            >
              Regular Scheduling
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'smart' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setActiveTab('smart')}
            >
              Smart Scheduling
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'regular' ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Today's Schedule</h2>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <Clock className="w-8 h-8 text-indigo-500" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{appointment.patient}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.time} - {appointment.type}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.hospital}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="text-indigo-500 hover:text-indigo-600">View</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Optimized Schedule</h2>
                <div className="space-y-4">
                  {smartSchedule.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.hospital}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.priority === 'High' ? 'bg-red-200 text-red-800' :
                          item.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          {item.time}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Activity className="w-4 h-4 mr-2" />
                          {item.patients} patients
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Calendar</h2>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
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
                    placeholder="Ask about scheduling..."
                    className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

