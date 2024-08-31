import React from 'react'
import { Box } from '@mui/material'
import LogoIcon from '@/shared/icons/LogoIcon'

const Header = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <LogoIcon />
    </Box>
  )
}

export default Header
