import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { shouldForwardProp } from '@/helpers/helpers'

export const StyledEditButton = styled(Button)`
  text-transform: none;
  color: #aeaeae;
  font-size: 14px;
  svg {
    margin-left: 5px;
  }
`

export const StyledHideCommentsButton = styled(Button)`
  text-transform: none;
  color: #0e0e2c;
  font-size: 16px;
  border: 1px solid #f1361d;
  border-radius: 8px;
  padding: 6px 12px;
`

export const StyledAnimatedPatientCard = styled(motion.div, {
  shouldForwardProp: prop => shouldForwardProp(['commentsVisible'], prop)
})<{ commentsVisible: boolean }>`
  width: ${({ commentsVisible }) => (commentsVisible ? '60%' : '100%')};
`

export const StyledAnimatedInaccuracyCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
`
