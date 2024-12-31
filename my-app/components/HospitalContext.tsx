'use client'

import React, { createContext, useState, useContext } from 'react'

type Hospital = {
  id: string
  name: string
}

type HospitalContextType = {
  selectedHospital: Hospital | null
  setSelectedHospital: (hospital: Hospital | null) => void
  hospitals: Hospital[]
  filterDataByHospital: <T extends { hospital: string }>(data: T[]) => T[]
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const useHospital = () => {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }
  return context
}

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [hospitals] = useState<Hospital[]>([
    { id: '1', name: 'Arogya Hospital' },
    { id: '2', name: 'Seva Medical Center' },
    { id: '3', name: 'Shanti Clinic' },
    { id: 'all', name: 'All Hospitals' },
  ])

  const filterDataByHospital = <T extends { hospital: string }>(data: T[]): T[] => {
    if (!selectedHospital || selectedHospital.id === 'all') {
      return data
    }
    return data.filter(item => item.hospital === selectedHospital.name)
  }

  return (
    <HospitalContext.Provider value={{ selectedHospital, setSelectedHospital, hospitals, filterDataByHospital }}>
      {children}
    </HospitalContext.Provider>
  )
}

