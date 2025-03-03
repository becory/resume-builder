export interface PersonalDetails {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

