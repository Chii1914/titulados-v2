import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

function GuiaContent() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Recurso', width: 300 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'link', headerName: 'Enlace', width: 250, sortable: false },
  ];

  const rows: GridRowsProp = [
    { id: 1, title: 'Guía de Evaluación', type: 'PDF', link: 'https://example.com/guia-evaluacion.pdf' },
    { id: 2, title: 'Calendario Académico', type: 'Documento', link: 'https://example.com/calendario' },
    { id: 3, title: 'Formato de Acta', type: 'Plantilla', link: 'https://example.com/acta.docx' },
    { id: 4, title: 'Manual de Buenas Prácticas', type: 'PDF', link: 'https://example.com/manual.pdf' },
  ];

  return (
    <Box sx={{ p: 3, width: '100%', height: 400 }}>
      <Typography variant='h2'>Sección Guía</Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>Aquí encontrarás información y recursos para guiarte.</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />
    </Box>
  )
}

export default GuiaContent