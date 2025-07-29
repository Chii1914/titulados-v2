import React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { UploadFile, Download, Visibility } from '@mui/icons-material';
import AcademicoGrid from './AcademicoGrid'; 

interface InformanteContentProps {
  rows: GridRowsProp;
}

function InformanteContent({ rows }: InformanteContentProps) {
  const columnasInformante: GridColDef[] = [
    { field: 'nombreAcademico', headerName: 'Académico Informante', width: 180 },
    { field: 'estudianteAsignado', headerName: 'Estudiante Asignado', width: 180 },
    {
      field: 'fechaAsignacion',
      headerName: 'Fecha de Asignación',
      type: 'dateTime',
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'Acciones de Informante',
      width: 450,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>Poner Nota</Button>
          <IconButton title="Descargar Rúbrica Informante"><Download /></IconButton>
          <IconButton title="Subir Rúbrica Informante"><UploadFile /></IconButton>
          {params.row.archivoTesis && <IconButton title="Ver Tesis"><Visibility /></IconButton>}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant='h4' sx={{ mb: 2 }}>Sección Informante</Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Aquí encontrarás a los estudiantes que te han sido asignados como académico informante.
      </Typography>
      <AcademicoGrid rows={rows} columns={columnasInformante} />
    </Box>
  );
}

export default InformanteContent;