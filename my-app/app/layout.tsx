import './globals.css'
import { Inter } from 'next/font/google'
import { HospitalProvider } from './contexts/HospitalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dr. Ravi\'s MediManager',
  description: 'Multi-hospital management system for Dr. Ravi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HospitalProvider>
          {children}
        </HospitalProvider>
      </body>
    </html>
  )
}

