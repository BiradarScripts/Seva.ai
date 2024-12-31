'use client'

import { useState } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export default function QAPage() {
  const [questions, setQuestions] = useState([
    { id: 1, question: "How do I add a new patient to the system?", answer: "To add a new patient, go to the 'Patient Reports' section and click on the 'New Report' button. Fill in the required information and click 'Save'." },
    { id: 2, question: "Can I access patient records from multiple hospitals?", answer: "Yes, seva+.ai allows you to access patient records from all hospitals in your network, provided you have the necessary permissions." },
    { id: 3, question: "How does the smart scheduling system work?", answer: "Our AI-powered scheduling system analyzes factors like patient priority, doctor availability, and hospital resources to optimize appointments and reduce wait times." },
  ])

  const [newQuestion, setNewQuestion] = useState('')

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: questions.length + 1, question: newQuestion, answer: "Our team will respond to your question shortly." }])
      setNewQuestion('')
    }
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {questions.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{q.question}</h2>
              <p className="text-gray-600 dark:text-gray-300">{q.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Submit Question
            </button>
          </form>
        </div>
      </motion.div>
    </Layout>
  )
}

