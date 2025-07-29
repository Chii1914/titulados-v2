"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import GuiaContent from './components/guia';
import InformanteContent from './components/informante';
import SecretarioContent from './components/secretario';
import PresidenteContent from './components/presidente';
import { Typography } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';

interface FilaGrid {
  id: number;
  nombreAcademico: string;
  rol: 'Guía' | 'Informante' | 'Presidente' | 'Secretario';
  estudianteAsignado: string;
  rutEstudiante: string;
  correoEstudiante: string;
  archivoTesis: File | null;
  fechaAsignacion: Date;
}

const filasCompletas: GridRowsProp<FilaGrid> = [
  { id: 1, nombreAcademico: 'Dr. Juan Pérez', rol: 'Guía', estudianteAsignado: 'Ana Gómez', rutEstudiante: '19.876.543-2', correoEstudiante: 'ana.gomez@mail.com', archivoTesis: null, fechaAsignacion: new Date('2024-07-28T10:00:00') },
  { id: 2, nombreAcademico: 'Dr. Juan Pérez', rol: 'Informante', estudianteAsignado: 'Carlos Ruiz', rutEstudiante: '20.123.456-7', correoEstudiante: 'carlos.ruiz@mail.com', archivoTesis: new File([], "tesis_carlos.pdf"), fechaAsignacion: new Date('2024-07-29T14:30:00') },
  { id: 3, nombreAcademico: 'Dra. María López', rol: 'Guía', estudianteAsignado: 'Sofía Castro', rutEstudiante: '19.111.222-K', correoEstudiante: 'sofia.castro@mail.com', archivoTesis: new File([], "tesis_sofia.pdf"), fechaAsignacion: new Date('2024-07-20T09:00:00') },
  { id: 4, nombreAcademico: 'Dra. María López', rol: 'Informante', estudianteAsignado: 'Luis Jara', rutEstudiante: '18.555.666-1', correoEstudiante: 'luis.jara@mail.com', archivoTesis: new File([], "tesis_luis.pdf"), fechaAsignacion: new Date('2024-07-30T11:00:00') },
  { id: 5, nombreAcademico: 'Dr. Carlos Soto', rol: 'Presidente', estudianteAsignado: 'Marta Díaz', rutEstudiante: '21.333.444-5', correoEstudiante: 'marta.diaz@mail.com', archivoTesis: new File([], "tesis_marta.pdf"), fechaAsignacion: new Date('2024-08-01T15:00:00') },
  { id: 6, nombreAcademico: 'Dra. Ana Torres', rol: 'Secretario', estudianteAsignado: 'Pedro Vera', rutEstudiante: '20.987.654-3', correoEstudiante: 'pedro.vera@mail.com', archivoTesis: new File([], "tesis_pedro.pdf"), fechaAsignacion: new Date('2024-08-02T12:00:00') },
];

export default function CustomBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const filasGuia = filasCompletas.filter(fila => fila.rol === 'Guía');
  const filasInformante = filasCompletas.filter(fila => fila.rol === 'Informante');
  const filasSecretario = filasCompletas.filter(fila => fila.rol === 'Secretario');
  const filasPresidente = filasCompletas.filter(fila => fila.rol === 'Presidente');

  const renderContent = () => {
    switch (value) {
      case 0:
        return <GuiaContent rows={filasGuia} />;
      case 1:
        return <InformanteContent rows={filasInformante} />;
      case 2:
        return <SecretarioContent rows={filasSecretario} />;
      case 3:
        return <PresidenteContent rows={filasPresidente} />;
      default:
        return <GuiaContent rows={filasGuia} />;
    }
  };

  return (
    <Box sx={{ width: '100%', pb: 7 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
        Gestión De Notas Para Docente
      </Typography>

      <Box sx={{ minHeight: 'calc(100vh - 150px)', width: '100%' }}>
        {renderContent()}
      </Box>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, borderTop: '1px solid #ddd' }}
      >
        <BottomNavigationAction label="Guía" icon={<SchoolIcon />} />
        <BottomNavigationAction label="Informante" icon={<InfoIcon />} />
        <BottomNavigationAction label="Secretario" icon={<DescriptionIcon />} />
        <BottomNavigationAction label="Presidente" icon={<GavelIcon />} />
      </BottomNavigation>
    </Box>
  );
}