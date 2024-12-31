'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    specialization: '',
    hospitals: [''],
    hospitalEmails: [''],
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index: number, field: 'hospitals' | 'hospitalEmails', value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addHospital = () => {
    setFormData(prev => ({
      ...prev,
      hospitals: [...prev.hospitals, ''],
      hospitalEmails: [...prev.hospitalEmails, ''],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(prev => prev + 1)
    } else {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Doctor Login - Step {step} of 3</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </>
          )}
          {step === 2 && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="Specialization"
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </>
          )}
          {step === 3 && (
            <>
              {formData.hospitals.map((hospital, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => handleArrayInputChange(index, 'hospitals', e.target.value)}
                    placeholder={`Hospital ${index + 1} Name`}
                    required
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="email"
                    value={formData.hospitalEmails[index]}
                    onChange={(e) => handleArrayInputChange(index, 'hospitalEmails', e.target.value)}
                    placeholder={`Hospital ${index + 1} Email`}
                    required
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addHospital}
                className="w-full p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"
              >
                Add Another Hospital
              </button>
            </>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
          >
            {step < 3 ? 'Next' : 'Submit'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

