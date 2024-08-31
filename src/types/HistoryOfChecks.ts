
export interface HistoryOfChecksFilterProps {
  activeSections?: string[]
  doctorFullName?: string
  patientFullName?: string
  withErrors?: boolean
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
