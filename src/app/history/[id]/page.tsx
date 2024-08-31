'use client'

import Header from '@/shared/components/Header/Header'
import React, { useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { usePatientHistory } from '@/api/history.service'
import { useParams } from 'next/navigation'
import InaccuracyIndicator from '@/app/history/components/InacurracyIndicator'
import { pluralize } from '@/helpers/helpers'
import PatientCardView from '@/app/history/components/PatientCardView'
import { AnimatePresence } from 'framer-motion'
import { StyledHideCommentsButton } from '@/app/history/[id]/page.styled'

const HistoryPageItem = () => {
  const [commentsVisible, toggleCommentsVisibility] = useState(true)
  const params = useParams()
  const { id } = params

  const { data: patientData, isLoading, isError } = usePatientHistory(Number(id))

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

  if (!patientData) {
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
        <Typography variant='h4'>Нет данных о пациенте</Typography>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#aeaeae'
                }}
              >
                ФИО
              </Typography>
              <Typography variant='h4'>{patientData.personFullName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledHideCommentsButton onClick={() => toggleCommentsVisibility(!commentsVisible)}>
                {commentsVisible ? 'Убрать' : 'Показать'} все комментарии
              </StyledHideCommentsButton>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box',
                  gap: 2,
                  padding: '8px 12px',
                  borderRadius: '16px'
                }}
              >
                <InaccuracyIndicator
                  total={patientData.totalWarningInaccuracies}
                  type='warning'
                  text={pluralize(patientData.totalWarningInaccuracies, ['неточность', 'неточности', 'неточностей'])}
                />
                <InaccuracyIndicator
                  total={patientData.totalErrorInaccuracies}
                  type='error'
                  text={pluralize(patientData.totalErrorInaccuracies, ['ошибка', 'ошибки', 'ошибок'])}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            {patientData.patientCards.map((card, i) => {
              return <PatientCardView card={card} key={card.id} index={i} commentsVisible={commentsVisible} />
            })}
          </Box>
        </Box>
      </Box>
    </AnimatePresence>
  )
}

export default HistoryPageItem
