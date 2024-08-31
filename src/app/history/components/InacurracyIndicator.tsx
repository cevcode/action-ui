import { Box, Typography } from '@mui/material'
import { InaccuracyType } from '@/types/HistoryOfChecks'
import { getInaccuracyColor } from '@/app/history/helpers/helpers'

interface InaccuracyIndicatorProps {
  total: number
  type: InaccuracyType
  text?: string
}

const InaccuracyIndicator = ({ total, type, text }: InaccuracyIndicatorProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getInaccuracyColor(type),
          display: 'inline-block',
          marginRight: '6px'
        }}
      />
      <Typography variant='subtitle1'>{total} {text}</Typography>
    </Box>
  )
}

export default InaccuracyIndicator
