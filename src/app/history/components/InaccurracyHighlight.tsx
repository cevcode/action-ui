import React from 'react'
import { InaccuracyType } from '@/types/HistoryOfChecks'
import { inaccuraciesBgColors } from '@/app/history/helpers/helpers'

interface InaccuracyHighlightProps {
  children: React.ReactNode
  type: InaccuracyType
}

const InaccuracyHighlight = ({ children, type }: InaccuracyHighlightProps) => {
  return (
    <span style={{ backgroundColor: inaccuraciesBgColors[type], color: '#0E0E2C', padding: '4px', borderRadius: '4px' }}>
      {children}
    </span>
  )
}

export default InaccuracyHighlight
