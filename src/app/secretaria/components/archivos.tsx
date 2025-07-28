"use client"; // Required for client-side components in Next.js App Router

import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Card, CardActionArea, Paper, Typography, Modal, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Added Select, MenuItem, FormControl, InputLabel
import React, { useState } from 'react';
import SingleFileUploadButton from '@/app/components/singleFileButton'; // Ensure this path is correct
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Icon for upload action
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef, GridActionsCellItemProps } from '@mui/x-data-grid';

function Archivos() {
    const [archivoExcel, setArchivoExcel] = useState<File | null>(null);
    const [selectedStudentIdForUpload, setSelectedStudentIdForUpload] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false); // Renamed 'open' to 'openModal' for clarity
    const [selectedFileType, setSelectedFileType] = useState<string>(''); // State for selected file type in modal
    const [individualFileToUpload, setIndividualFileToUpload] = useState<File | null>(null); // State for the file chosen in the modal

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedFileType(''); // Reset selected file type on close
        setIndividualFileToUpload(null); // Reset file on close
        setSelectedStudentIdForUpload(null); // Reset student ID on close
    };

    const handleSendExcelFile = async () => { // Renamed for clarity
        if (archivoExcel) {
            console.log('Enviando archivo Excel:', archivoExcel.name);
            const formData = new FormData();
            formData.append('file', archivoExcel);

            // Implement your file upload logic here for the Excel file
            // Example:
            /*
            try {
                const response = await fetch('/api/upload-excel', { // Dedicated API endpoint
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Archivo Excel enviado exitosamente:', result);
                    // Consider using a Material-UI Snackbar for alerts instead of alert()
                    // alert('Archivo Excel enviado exitosamente!');
                    setArchivoExcel(null); // Clear the file after successful upload
                } else {
                    const errorText = await response.text();
                    console.error('Error al enviar el archivo Excel:', response.status, errorText);
                    // alert(`Error al enviar el archivo Excel: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error('Error de red al enviar el archivo Excel:', error);
                // alert('Error de red al enviar el archivo Excel.');
            }
            */
        } else {
            console.warn('No hay archivo Excel para enviar.');
        }
    };

    const handleExcelFileSelect = (file: File | null) => { // Renamed for clarity
        setArchivoExcel(file);
        if (file) {
            console.log('Archivo Excel seleccionado:', file.name, file);
        } else {
            console.log('Archivo Excel limpiado.');
        }
    };

    // --- DataGrid Columns and Rows for Manual File Upload Section ---
    interface StudentRow {
        id: number;
        nombre: string;
        apellido: string;
        segundoApellido: string;
        correo: string;
        rut: string;
    }

    interface ActionParams {
        row: StudentRow;
    }

    const columns: GridColDef<StudentRow>[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'nombre', headerName: 'Nombre', width: 130, editable: true },
        { field: 'apellido', headerName: 'Apellido Paterno', width: 130, editable: true },
        { field: 'segundoApellido', headerName: 'Apellido Materno', width: 130, editable: true },
        { field: 'correo', headerName: 'Correo', width: 200, editable: true },
        { field: 'rut', headerName: 'RUT', width: 120, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 120,
            getActions: (params: ActionParams): React.ReactElement<GridActionsCellItemProps>[] => [
                <GridActionsCellItem
                    icon={<UploadFileIcon />}
                    label="Subir Documento"
                    onClick={() => handleClickUpload(params.row.id)} // Simpler click handler
                    showInMenu
                />,
            ],
        },
    ];

    const rows = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', segundoApellido: 'González', correo: 'juan.perez@example.com', rut: '12.345.678-9' },
        { id: 2, nombre: 'María', apellido: 'López', segundoApellido: 'Díaz', correo: 'maria.lopez@example.com', rut: '98.765.432-1' },
        { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', segundoApellido: 'Soto', correo: 'carlos.r@example.com', rut: '11.222.333-4' },
        { id: 4, nombre: 'Ana', apellido: 'Silva', segundoApellido: 'Muñoz', correo: 'ana.silva@example.com', rut: '22.333.444-5' },
    ];
    // --- End DataGrid Columns and Rows ---

    // Handler for the "Subir Documento" button click within DataGrid
    const handleClickUpload = (studentId: number) => {
        setSelectedStudentIdForUpload(studentId);
        handleOpenModal(); // Open the modal
        console.log(`Acciones para estudiante ID: ${studentId}. Abriendo modal para subir archivo.`);
    };

    const handleFileTypeChange = (event: any) => { // Type 'any' for event from Select
        setSelectedFileType(event.target.value as string);
    };

    const handleIndividualFileSelect = (file: File | null) => {
        setIndividualFileToUpload(file);
        if (file) {
            console.log('Archivo individual seleccionado:', file.name, file);
        } else {
            console.log('Archivo individual limpiado.');
        }
    };

    const handleUploadIndividualFile = async () => {
        if (selectedStudentIdForUpload && selectedFileType && individualFileToUpload) {
            console.log(`Subiendo ${selectedFileType} para estudiante ID: ${selectedStudentIdForUpload}, Archivo: ${individualFileToUpload.name}`);

            const formData = new FormData();
            formData.append('studentId', selectedStudentIdForUpload.toString());
            formData.append('fileType', selectedFileType);
            formData.append('file', individualFileToUpload);

            // Implement your individual file upload logic here
            /*
            try {
                const response = await fetch('/api/upload-individual-file', { // Dedicated API endpoint
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Archivo individual subido exitosamente:', result);
                    // alert('Archivo individual subido exitosamente!');
                    handleCloseModal(); // Close modal on success
                } else {
                    const errorText = await response.text();
                    console.error('Error al subir archivo individual:', response.status, errorText);
                    // alert(`Error al subir archivo individual: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error('Error de red al subir archivo individual:', error);
                // alert('Error de red al subir archivo individual.');
            }
            */
            // Placeholder for successful upload
            alert(`Archivo "${individualFileToUpload.name}" de tipo "${selectedFileType}" subido para estudiante ID ${selectedStudentIdForUpload}`);
            handleCloseModal();

        } else {
            console.warn('Faltan datos para subir el archivo individual (estudiante, tipo de archivo o archivo).');
            alert('Por favor, selecciona el tipo de archivo y el archivo a subir.');
        }
    };

    // Style for the modal content Box
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    };

    return (
        <Box sx={{ p: 3, width: '100%' }}>

            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Carga de estudiantes vía archivo Excel
                </Typography>
                <CardActionArea sx={{ width: '100%', borderRadius: 2, boxShadow: 5, p: 1, mt: 1 }}>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 500 }}>
                        Descargar plantilla para estudiantes
                    </Typography>
                </CardActionArea>
                <SingleFileUploadButton
                    onFileSelect={handleExcelFileSelect}
                    buttonText="Subir archivo de estudiantes en excel (.xlsx, .xls)"
                    acceptedFileTypes=".xlsx, .xls"
                />
                {archivoExcel && (
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            Archivo listo para enviar: <strong>{archivoExcel.name}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SendIcon />}
                            onClick={handleSendExcelFile}
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
            </Card>

            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Generar reporte
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
                    En esta sección se podrá generar un reporte de los estudiantes que se encuentran en el Sistema de Seminario de Título UV.
                </Typography>
                <CardActionArea sx={{ width: '100%', borderRadius: 2, boxShadow: 5, p: 1, mt: 1 }}>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 500 }}>
                        Descargar reporte de estudiantes
                    </Typography>
                </CardActionArea>
            </Card>

            <Card sx={{ mb: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Gestión de Documentos Individuales
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
                    Aquí puedes subir archivos específicos para cada estudiante.
                </Typography>
                {/* DataGrid for manual student data entry/view with actions */}
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            }
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </Card>

            {/* Modal for individual file upload */}
            <Modal
                aria-labelledby="upload-modal-title"
                aria-describedby="upload-modal-description"
                open={openModal} // Use openModal state
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={modalStyle}>
                    <Typography id="upload-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Subir Documento para el Estudiante : {selectedStudentIdForUpload}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="file-type-select-label">Tipo de Documento</InputLabel>
                        <Select
                            labelId="file-type-select-label"
                            id="file-type-select"
                            value={selectedFileType}
                            label="Tipo de Documento"
                            onChange={handleFileTypeChange}
                        >
                            <MenuItem value=""><em>Selecciona un tipo</em></MenuItem>
                            <MenuItem value="Ficha de Ingreso">Ficha de Ingreso</MenuItem>
                            <MenuItem value="Tesis">Tesis</MenuItem>
                            <MenuItem value="Rubrica Guía">Rubrica Guía</MenuItem>
                            <MenuItem value="Rubrica Informante">Rubrica Informante</MenuItem>
                        </Select>
                    </FormControl>

                    <SingleFileUploadButton
                        onFileSelect={handleIndividualFileSelect}
                        buttonText={individualFileToUpload ? `Cambiar Archivo: ${individualFileToUpload.name}` : "Seleccionar Archivo"}
                        acceptedFileTypes=".pdf, .doc, .docx, .xlsx, .xls" // Example accepted types
                    />

                    {individualFileToUpload && (
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                            Archivo seleccionado: <strong>{individualFileToUpload.name}</strong>
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseModal} sx={{ flexGrow: 1 }}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleUploadIndividualFile}
                            disabled={!selectedFileType || !individualFileToUpload} // Disable if type or file not selected
                            sx={{ flexGrow: 1 }}
                        >
                            Subir
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </Box>
    );
}

export default Archivos;