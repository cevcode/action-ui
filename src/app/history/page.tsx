'use client'

import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '@/shared/components/Header/Header'
import { useHistoryOfChecks } from '@/api/history.service'
import InaccuracyIndicator from '@/app/history/components/InacurracyIndicator'
import AppointmentsTable from '@/app/history/components/AppointmentsTable'

const HistoryPage = () => {
  const { data: historyData, isLoading, isError } = useHistoryOfChecks({})
  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100%',
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
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h4'>Произошла ошибка</Typography>
      </Box>
    )
  }

  return (
    <Box>
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
            sx={{
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
        appointments={historyData?.data.appointments || []}
        totalWarningInaccuracies={historyData?.data.totalWarningInaccuracies || 0}
        totalErrorInaccuracies={historyData?.data.totalErrorInaccuracies || 0}
      />
    </Box>
  )
}

export default HistoryPage
