import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function SecretarioContent() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h2'>Sección Secretario</Typography>
      <Typography variant='body1'>Gestiona documentos, actas y comunicaciones.</Typography>
    </Box>
  )
}

export default SecretarioContent