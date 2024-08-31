import { Box, Typography } from '@mui/material'
import { getInaccuracyColor } from '@/app/history/helpers/helpers'
import React from 'react'
import { InaccuracyProps } from '@/types/HistoryOfChecks'
import EditIcon from '@/shared/icons/EditIcon'
import { StyledAnimatedInaccuracyCard, StyledEditButton } from '@/app/history/[id]/page.styled'
import { bottomToTopAnimation } from '@/styles/animations'

interface InaccuracyCardProps {
  inaccuracy: InaccuracyProps
  index?: number
}

const InaccuracyCard = ({ inaccuracy, index }: InaccuracyCardProps) => {
  return (
    <StyledAnimatedInaccuracyCard
      variants={bottomToTopAnimation(index ? ++index * 0.15 : 0.15)}
      initial='hidden'
      animate='visible'
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
        <Box
          sx={{
            width: '10px',
            minWidth: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: getInaccuracyColor(inaccuracy.type),
            display: 'inline-block',
            marginRight: '14px'
          }}
        />
        <StyledEditButton>
          Изменить
          <EditIcon />
        </StyledEditButton>
      </Box>
      <Typography
        sx={{
          fontSize: '16px',
          span: {
            color: getInaccuracyColor(inaccuracy.type),
            marginLeft: '6px'
          }
        }}
      >
        «{inaccuracy.cardSubstring}»:
        <span>{inaccuracy.comment}</span>
      </Typography>
    </StyledAnimatedInaccuracyCard>
  )
}

export default InaccuracyCard
