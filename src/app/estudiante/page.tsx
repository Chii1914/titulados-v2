"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import SingleFileUploadButton from '../components/singleFileButton';
import { useState } from 'react';
import  __url  from '../../lib/const';

export default function Estudiantes() {
    const [fichaInscripcionFile, setFichaInscripcionFile] = useState<File | null>(null);
    const handleFichaInscripcionUpload = (file: File | null) => {
        setFichaInscripcionFile(file);
        if (file) {
            console.log('Archivo de ficha de inscripción seleccionado:', file.name, file);
        } else {
            console.log('Archivo de ficha de inscripción limpiado.');
        }
    };

    const handleSendFile = async () => {
        if (fichaInscripcionFile) {
            console.log('Enviando archivo:', fichaInscripcionFile.name);
            const formData = new FormData();
            formData.append('file', fichaInscripcionFile); 
/*
            try {
                const response = await fetch(`${__url}/api/upload-ficha`, {
                    method: 'POST',
                    body: formData,
                    // Note: Do NOT set Content-Type header manually for FormData.
                    // The browser will set it automatically, including the boundary.
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Archivo enviado exitosamente:', result);
                    alert('Archivo enviado exitosamente!'); // Using alert for simplicity, consider a custom modal
                    setFichaInscripcionFile(null); // Clear the file after successful upload
                } else {
                    const errorText = await response.text();
                    console.error('Error al enviar el archivo:', response.status, errorText);
                    alert(`Error al enviar el archivo: ${response.status} - ${errorText}`); // Using alert for simplicity
                }
            } catch (error) {
                console.error('Error de red al enviar el archivo:', error);
                alert('Error de red al enviar el archivo.'); // Using alert for simplicity
            */
        } else {
            console.warn('No hay archivo para enviar.');
        }
    };
    return (
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
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
                >
                    Ficha de inscripción seminario de titulo
                </Typography>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                Descargar ficha de inscripción seminario de titulo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* Here's where the new SingleFileUploadButton component is integrated */}
                <SingleFileUploadButton
                    onFileSelect={handleFichaInscripcionUpload}
                    buttonText="Seleccionar Ficha de Inscripción"
                    acceptedFileTypes=".pdf,.doc,.docx" // Example: only accept PDF and Word documents
                />

                {fichaInscripcionFile && (
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            Archivo listo para enviar: <strong>{fichaInscripcionFile.name}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="success" // Green color for success/send action
                            startIcon={<SendIcon />}
                            onClick={handleSendFile}
                            sx={{
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            Enviar Archivo
                        </Button>
                    </Box>
                )}

            </Paper>
        </Box>
    );
}
