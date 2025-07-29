import React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { UploadFile, Download, Visibility } from '@mui/icons-material';
import AcademicoGrid from './AcademicoGrid';

interface GuiaContentProps {
  rows: GridRowsProp;
}

function GuiaContent({ rows }: GuiaContentProps) {
  const columnasGuia: GridColDef[] = [
    { field: 'estudianteAsignado', headerName: 'Estudiante', width: 180 },
    { field: 'rutEstudiante', headerName: 'RUT', width: 120 },
    { field: 'correoEstudiante', headerName: 'Correo', width: 200 },
    { field: 'fechaAsignacion', headerName: 'Fecha Asignación', type: 'dateTime', width: 180 },
    {
      field: 'acciones',
      headerName: 'Acciones de Guía',
      width: 350,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>Poner Nota</Button>
          <IconButton title="Descargar Rúbrica Guía"><Download /></IconButton>
          <IconButton title="Subir Rúbrica Guía"><UploadFile /></IconButton>
          <IconButton title="Subir Archivo Tesis"><UploadFile /></IconButton>
          {params.row.archivoTesis && <IconButton title="Ver Tesis"><Visibility /></IconButton>}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant='h4' sx={{ mb: 2 }}>Sección Guía</Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Aquí encontrarás a los estudiantes que te han sido asignados como académico guía.
      </Typography>
      <AcademicoGrid rows={rows} columns={columnasGuia} />
    </Box>
  );
}

export default GuiaContent;