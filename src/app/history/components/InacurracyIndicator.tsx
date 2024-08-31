import { Box, Typography } from '@mui/material'
import { InaccuracyType } from '@/types/HistoryOfChecks'

interface InaccuracyIndicatorProps {
  total: number
  type: InaccuracyType
}

const InaccuracyIndicator = ({ total, type }: InaccuracyIndicatorProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: type === 'error' ? '#F1361D' : '#FFB545',
          display: 'inline-block',
          marginRight: '6px'
        }}
      />
      <Typography variant='subtitle1'>{total}</Typography>
    </Box>
  )
}

export default InaccuracyIndicator
