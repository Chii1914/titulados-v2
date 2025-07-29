import React from 'react';
import Box from '@mui/material/Box';
import { Typography, IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import AcademicoGrid from './AcademicoGrid';

interface PresidenteContentProps {
  rows: GridRowsProp;
}

function PresidenteContent({ rows }: PresidenteContentProps) {
  const columnasPresidente: GridColDef[] = [
    { field: 'estudianteAsignado', headerName: 'Estudiante', width: 180 },
    { field: 'rutEstudiante', headerName: 'RUT', width: 120 },
    { field: 'correoEstudiante', headerName: 'Correo', width: 200 },
    { field: 'fechaAsignacion', headerName: 'Fecha Asignación', type: 'dateTime', width: 180 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton title="Ver Detalles del Estudiante"><Visibility /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant='h4' sx={{ mb: 2 }}>Sección Presidente de Comisión</Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Listado de estudiantes donde figuras como Presidente de la comisión evaluadora.
      </Typography>
      <AcademicoGrid rows={rows} columns={columnasPresidente} />
    </Box>
  );
}

export default PresidenteContent;