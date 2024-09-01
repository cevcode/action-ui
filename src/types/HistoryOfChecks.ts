export interface HistoryOfChecksFilterProps {
  activeSections?: string[]
  doctorFullName?: string
  patientFullName?: string
  withErrors?: boolean
}

export interface HistoryOfChecksErrorsRateProps {
  errors?: number
  warnings?: number
}

export interface HistoryOfChecksCardProps {
  id: number
  appointmentId: number
  doctorFullName: string
  clinic: string
  clinicDepartment: string
  doctorSpecialty: string
  patientId: number
  patientFullName: string
  appointmentDateTime: string
  MKB10Code: string
  isUnderHospitalization: boolean
  isAnamnesisCompleted: boolean
  isFilledStatusPraesens: boolean
  errorsRate: HistoryOfChecksErrorsRateProps
  inaccuracies: InaccuracyProps[]
}

export interface HistoryOfChecksResponse {
  appointments: HistoryOfChecksCardProps[]
  totalErrorInaccuracies: number
  totalWarningInaccuracies: number
}

export type InaccuracyType = 'error' | 'warning'

export interface InaccuracyProps {
  id: string
  type: InaccuracyType
  cardSubstring: string
  comment: string
}

export interface PatientCardProps {
  id: number
  cardTitle: string
  cardData: string[]
  inaccuracies: InaccuracyProps[]
}

export interface PatientHistoryProps {
  id: number
  patientId: number
  personFullName: string
  totalErrorInaccuracies: number
  totalWarningInaccuracies: number
  patientCards: PatientCardProps[]
}
