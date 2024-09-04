import { PatientCardProps } from '@/types/HistoryOfChecks'
import { Box, Typography } from '@mui/material'
import { StyledAnimatedPatientCard, StyledEditButton } from '@/app/history/[id]/page.styled'
import EditIcon from '@/shared/icons/EditIcon'
import { getMarkedText } from '@/app/history/helpers/helpers'
import InaccuracyCard from '@/app/history/components/InaccuracyCard'
import React from 'react'
import { animationRightToLeftFadeIn } from '@/styles/animations'

interface PatientCardViewProps {
  card: PatientCardProps
  commentsVisible: boolean
  index?: number
}

const PatientCardView = ({ card, commentsVisible, index }: PatientCardViewProps) => {
  const checkIsHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value)

  return (
    <Box sx={{ marginTop: '28px', display: 'flex', gap: 6, overflow: 'hidden' }}>
      <StyledAnimatedPatientCard
        commentsVisible={commentsVisible}
        variants={animationRightToLeftFadeIn(index ? ++index * 0.15 : 0.15)}
        initial='hidden'
        animate='visible'
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{
              padding: '6px 10px',
              width: 'fit-content',
              background: '#fff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant='subtitle1'>{card.cardTitle}</Typography>
          </Box>
          <StyledEditButton>
            Дать правку
            <EditIcon />
          </StyledEditButton>
        </Box>
        <Box sx={{ padding: '14px 0' }}>
          {card.cardData.map((text, i) => {
            return (
              <Typography variant='subtitle1' key={i}>
                {checkIsHtml(getMarkedText(text, card.inaccuracies) as string) ? (
                  <span dangerouslySetInnerHTML={{ __html: getMarkedText(text, card.inaccuracies) }} />
                ) : (
                  getMarkedText(text, card.inaccuracies)
                )}
              </Typography>
            )
          })}
        </Box>
        <Box
          sx={{
            height: '1px',
            width: '100%',
            background: '#dcdcdc'
          }}
        />
      </StyledAnimatedPatientCard>
      <Box
        sx={{
          width: '40%',
          display: commentsVisible ? 'block' : 'none'
        }}
      >
        {card.inaccuracies.map((inaccuracy, i) => {
          return <InaccuracyCard inaccuracy={inaccuracy} key={inaccuracy.id} index={i} />
        })}
      </Box>
    </Box>
  )
}

export default PatientCardView
