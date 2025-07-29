import React from 'react';
import Box from '@mui/material/Box';
import { Typography, IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { EditNote } from '@mui/icons-material';
import AcademicoGrid from './AcademicoGrid'; 

interface SecretarioContentProps {
  rows: GridRowsProp;
}

function SecretarioContent({ rows }: SecretarioContentProps) {
  const columnasSecretario: GridColDef[] = [
    { field: 'nombreAcademico', headerName: 'Secretario de Comisión', width: 220 },
    { field: 'estudianteAsignado', headerName: 'Estudiante Asignado', width: 180 },
    {
      field: 'fechaAsignacion',
      headerName: 'Fecha de Asignación',
      type: 'dateTime',
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton title="Gestionar Acta de Evaluación"><EditNote /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant='h4' sx={{ mb: 2 }}>Sección Secretario de Comisión</Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Listado de estudiantes donde figuras como Secretario.
      </Typography>
      <AcademicoGrid rows={rows} columns={columnasSecretario} />
    </Box>
  );
}

export default SecretarioContent;