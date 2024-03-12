'use client'

import { Box } from '@mui/material';
import React from 'react'
import UserPage from '../../../_components/pages/UserPage';

const page = () => {

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <UserPage />
    </Box>
  )
}

export default page;