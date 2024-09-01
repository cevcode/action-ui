'use client'

import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '@/shared/components/Header/Header'
import { useHistoryOfChecks } from '@/api/history.service'
import InaccuracyIndicator from '@/app/history/components/InacurracyIndicator'
import AppointmentsTable from '@/app/history/components/AppointmentsTable/AppointmentsTable'
import { AnimatePresence } from 'framer-motion'
import { HistoryOfChecksCardProps } from '@/types/HistoryOfChecks'

const HistoryPage = () => {
  const { data: historyData, isLoading, isError } = useHistoryOfChecks({})

  const [appointments, setAppointments] = useState<HistoryOfChecksCardProps[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (historyData?.data.appointments) {
      setAppointments(historyData.data.appointments)
    }
  }, [historyData])

  // Filter appointments based on the search query
  const filteredAppointments = appointments.filter(appointment => {
    return (
      appointment.doctorFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.clinicDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.MKB10Code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.appointmentId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientId.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <CircularProgress disableShrink sx={{ mt: 6, color: '#302C2D' }} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h4'>Что-то пошло не так...</Typography>
      </Box>
    )
  }

  return (
    <AnimatePresence>
      <Box sx={{ height: '100vh' }}>
        <Header />
        <Box
          sx={{
            padding: '40px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant='h4'>История проверок</Typography>
            <TextField
              id='search'
              placeholder='Поиск по тексту'
              type='search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              sx={{
                width: '400px',
                background: '#EDEDED',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                borderRadius: '12px',
                input: {
                  border: 'none',
                  padding: '10px',
                  outline: 'none',
                  boxShadow: 'none',
                  color: '#0E0E2C',
                  '&::placeholder': {
                    textOverflow: 'ellipsis !important',
                    color: '#0E0E2C'
                  }
                },
                fieldset: {
                  border: 'none'
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #DBDBDB',
                borderRadius: '8px',
                padding: '6px 20px'
              }}
            >
              <InaccuracyIndicator total={historyData?.data.totalWarningInaccuracies || 0} type='warning' />
              <InaccuracyIndicator total={historyData?.data.totalErrorInaccuracies || 0} type='error' />
            </Box>
          </Box>
        </Box>
        <AppointmentsTable
          appointments={filteredAppointments}
          totalWarningInaccuracies={historyData?.data.totalWarningInaccuracies || 0}
          totalErrorInaccuracies={historyData?.data.totalErrorInaccuracies || 0}
        />
      </Box>
    </AnimatePresence>
  )
}

export default HistoryPage
