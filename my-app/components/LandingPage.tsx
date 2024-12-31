'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Globe, Users, Clock, Brain, Hospital, FileText, Activity, Star, ChevronRight, ArrowUpRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">seva+.ai</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition duration-300">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a>
          </div>
          <Link href="/login" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Login
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-20">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Revolutionize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Multi-Hospital</span> Management
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Streamline operations, enhance patient care, and optimize your workflow across multiple hospitals with seva+.ai's cutting-edge AI-powered platform.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/login" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center">
              Get Started <ArrowRight className="ml-2" />
            </Link>
            <a href="#demo" className="text-blue-600 border border-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300 inline-flex items-center">
              Watch Demo <ChevronRight className="ml-2" />
            </a>
          </motion.div>
        </section>

        <section id="features" className="mb-32">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">Powerful Features for Seamless Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Multi-Hospital Integration", description: "Seamlessly manage multiple hospitals from a single, intuitive dashboard." },
              { icon: Users, title: "Patient-Centric Care", description: "Keep track of patient records and progress across all facilities effortlessly." },
              { icon: Clock, title: "Smart Scheduling", description: "AI-powered system optimizes appointments and reduces wait times." },
              { icon: Brain, title: "Intelligent Insights", description: "Get data-driven insights to improve efficiency and patient outcomes." },
              { icon: Hospital, title: "Real-time Overview", description: "Instant updates on bed availability, equipment status, and staff allocation." },
              { icon: FileText, title: "Centralized Records", description: "Access and update patient records from any hospital in your network." },
              { icon: Activity, title: "Performance Analytics", description: "Track and analyze KPIs across all hospitals to optimize operations." },
              { icon: CheckCircle, title: "Quality Assurance", description: "Implement and monitor standardized protocols for consistent care." },
              { icon: Star, title: "AI-Powered Assistance", description: "Leverage cutting-edge AI to support decision-making and improve care quality." },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8">
                  <feature.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:text-purple-500 transition-colors duration-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mb-32">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Dr. Emily Chen", role: "Chief of Surgery, Metro Hospital", quote: "seva+.ai has transformed how we operate across our network of hospitals. The efficiency gains are remarkable, and the centralized patient management system has significantly improved our quality of care." },
              { name: "Dr. Michael Lee", role: "ER Director, City Medical Center", quote: "The real-time updates and smart scheduling features have significantly improved our emergency response times. seva+.ai has become an indispensable tool in our daily operations." },
              { name: "Dr. Sarah Johnson", role: "Head of Pediatrics, Children's Hospital", quote: "The ability to access patient records across multiple hospitals has been a game-changer for us. It's improved our ability to provide consistent care, especially for patients with complex needs." },
              { name: "Dr. Robert Thompson", role: "CEO, Regional Healthcare System", quote: "seva+.ai has given us unprecedented insights into our operations across multiple facilities. It's helped us identify best practices and areas for improvement, leading to better patient outcomes and cost savings." },
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Ready to Get Started?</h2>
          <p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
            Contact us today to see how seva+.ai can revolutionize your hospital management and improve patient care across your entire network.
          </p>
          <Link href="/contact" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center">
            Contact Us <ArrowUpRight className="ml-2" />
          </Link>
        </section>
      </main>

      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">seva+.ai</h3>
              <p className="text-gray-600">Revolutionizing multi-hospital management with AI-powered solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300">Features</a></li>
                <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition duration-300">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">&copy; 2023 seva+.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

