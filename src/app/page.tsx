"use client";
import React from "react";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import __url from "../lib/const";
import { useAccessToken } from './context/TokenContext';
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const { user, isLoading } = useUser();
  const token = useAccessToken();
  const router = useRouter();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24">
        <Typography variant="h6" color="text.secondary">
          Cargando información de usuario...
        </Typography>
      </main>
    );
  }

  async function handleLogin() {
    try {
      const response = await axios.get(`${__url}/user/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data.user);
      if (response.data.user) {
        switch (response.data.user) {
          case 'estudiante':
            router.push("/estudiante");
            break;
          case 'profesor':
            router.push("/profesor");
            break;
          case 'secretario':
            router.push("/secretario");
            break;
          case 'jefatura':
            router.push("/jefatura");
            break;
          default:
            console.error("Unknown role", response.data.role);
        }
      } else {
        console.error("error", response.data)
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <>
      <title>Confirmación de usuario</title>
      <meta name="description" content="Confirme su identidad para acceder al sistema de seguimientos académicos UV." />
      {user && (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24">
          <Box sx={{ maxWidth: '450px', width: '100%', mx: 'auto' }}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid component="div">
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
                  >
                    Sistema de titulados UV
                  </Typography>
                </Grid>
                <Grid component="div">
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: 'text.secondary' }}
                  >
                    Confirme que usted es la siguiente persona:
                  </Typography>
                </Grid>
                <Grid component="div">
                  <Card
                    sx={{
                      p: 3,
                      mb: 4,
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Card>
                </Grid>
                <Grid component="div">
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                      width: '100%',
                      py: 1.75,
                      fontSize: '1.15rem',
                      borderRadius: '8px',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease-in-out',
                      mb: 2,
                    }}
                  >
                    Confirmar
                  </Button>
                </Grid>
                <Grid component="div">
                  <Button
                    variant="outlined"
                    component="a"
                    href="/auth/logout"
                    sx={{
                      width: '100%',
                      py: 1.5,
                      fontSize: '1rem',
                      borderRadius: '8px',
                      borderColor: 'divider',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    No soy {user.name}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </main>
      )}
    </>
  );
}
