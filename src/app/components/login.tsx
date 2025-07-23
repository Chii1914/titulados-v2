import React from 'react';
import { Box, Paper, Grid, Typography, Link } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

export default function UserRoleSelection() {
  const userProfiles = [
    {
      id: 'estudiantes',
      title: 'Estudiantes',
      description: 'Suba sus documentos necesarios para iniciar su proceso de titulación.',
      icon: PersonIcon,
      link: '/auth/login',
    },
    {
      id: 'secretarias',
      title: 'Secretari@s',
      description: 'Gestione alumnos.',
      icon: BusinessCenterIcon,
      link: '/auth/login',
    },
    {
      id: 'academicos',
      title: 'Académicos',
      description: 'Gestione a sus alumnos.',
      icon: SchoolIcon,
      link: '/auth/login',
    },
    {
      id: 'jefaturas',
      title: 'Jefaturas',
      description: 'Ver información generalizada del sistema.',
      icon: SettingsIcon,
      link: '/auth/login',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-blue-50">
      <Box sx={{ display: 'column', maxWidth: '960px', width: '100%', mx: 'auto', height: 'auto' }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 1, md: 2 },
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: 'strong' }}
          >
            Sistema de titulados UV
          </Typography>
          <Typography
            variant="body1"
          >
            Seleccione su perfil para ingresar al sistema.
          </Typography>
        </Paper>
          {userProfiles.map((profile) => (
              <Link href={profile.link} underline="none" color="inherit">
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: '20px',
                    textAlign: 'center',
                    marginTop: '15px',
                    height: '100%',
                    display: 'column',
                    transition: 'all 0.4s cubic-bezier(.25,.8,.25,1)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                      transform: 'translateY(-8px) scale(1.02)',
                    },
                  }}
                >
                  <profile.icon sx={{ fontSize: 60, mb: 2, color: '#2196f3' }} />
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mb: 1, fontWeight: 'bold', color: '#424242' }}
                  >
                    {profile.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#757575' }}
                  >
                    {profile.description}
                  </Typography>
                </Paper>
              </Link>
          ))}
      </Box>
    </main>
  );
}
