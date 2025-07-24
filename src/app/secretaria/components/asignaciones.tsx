"use client"; // Required for client-side components in Next.js App Router

import { BottomNavigation, BottomNavigationAction, Box, Card, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
// Removed DatePicker related imports as they are not used in the current form structure

function Asignaciones() {
    const [viewValue, setViewValue] = useState(0); // Controls which tab is active (Visualizar or Generar)

    // --- DataGrid for "Visualizar asignaciones" ---
    interface AssignmentRow {
        id: number;
        studentName: string;
        professorName: string;
        rol: string; // Correctly reflects the 'rol' column
        status: string;
    }

    const assignmentColumns: GridColDef<AssignmentRow>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'studentName', headerName: 'Estudiante', width: 200 },
        { field: 'professorName', headerName: 'Profesor', width: 200 },
        { field: 'rol', headerName: 'Rol', width: 250 }, // DataGrid column for 'rol'
        { field: 'status', headerName: 'Estado', width: 130 },
    ];

    const assignmentRows: AssignmentRow[] = [
        { id: 1, studentName: 'Juan Pérez', professorName: 'Dr. García', rol: 'guía', status: 'Pendiente' },
        { id: 2, studentName: 'María López', professorName: 'Dra. Soto', rol: 'informante', status: 'En Proceso' },
        { id: 3, studentName: 'Carlos Díaz', professorName: 'Dr. Medina', rol: 'secretario', status: 'Pendiente' },
        { id: 4, studentName: 'Ana Ruiz', professorName: 'Dra. Castro', rol: 'presidente', status: 'Completado' },
    ];

    // --- State for "Generar asignación" form ---
    interface NewAssignmentState {
        studentId: string;
        professorId: string;
        rol: string; // 'rol' is now a direct field in the state
        description: string; // Keeping description as it was in the previous correct version
    }

    const [newAssignment, setNewAssignment] = useState<NewAssignmentState>({
        studentId: '',
        professorId: '',
        rol: '',
        description: '',
    });

    // Dummy data for select dropdowns (replace with actual data from your backend)
    const students = [
        { id: 'est1', name: 'Juan Pérez' },
        { id: 'est2', name: 'María López' },
        { id: 'est3', name: 'Carlos Díaz' },
        { id: 'est4', name: 'Ana Ruiz' },
    ];

    const professors = [
        { id: 'prof1', name: 'Dr. García' },
        { id: 'prof2', name: 'Dra. Soto' },
        { id: 'prof3', name: 'Dr. Medina' },
        { id: 'prof4', name: 'Dra. Castro' },
    ];

    // Generic handler for all form fields (TextFields and Selects)
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setNewAssignment(prev => ({ ...prev, [name as string]: value }));
    };

    const handleSubmitAssignment = async () => {
        // Validate required fields
        if (!newAssignment.studentId || !newAssignment.professorId || !newAssignment.rol) {
            alert('Por favor, completa todos los campos requeridos para la asignación (Estudiante, Profesor, Rol).');
            return;
        }

        console.log('Generando nueva asignación:', newAssignment);

        // Here you would typically send this data to your backend API
        /*
        try {
            const response = await fetch('/api/create-assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAssignment), // Send the entire newAssignment object
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Asignación creada exitosamente:', result);
                alert('Asignación creada exitosamente!');
                // Reset form
                setNewAssignment({
                    studentId: '',
                    professorId: '',
                    rol: '',
                    description: '',
                });
                // Optionally, refresh the DataGrid data if needed
            } else {
                const errorText = await response.text();
                console.error('Error al crear la asignación:', response.status, errorText);
                alert(`Error al crear la asignación: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error de red al crear la asignación:', error);
            alert('Error de red al crear la asignación.');
        }
        */
        alert('Asignación generada exitosamente (simulado)!');
        // Reset form after successful (simulated) submission
        setNewAssignment({
            studentId: '',
            professorId: '',
            rol: '',
            description: '',
        });
    };

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Box sx={{ width: '100%', maxWidth: 500, mb: 3 }}>
                    <BottomNavigation
                        showLabels
                        value={viewValue}
                        onChange={(event, newValue) => {
                            setViewValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Visualizar asignaciones" icon={<VisibilityIcon />} />
                        <BottomNavigationAction label="Generar asignación" icon={<AddBoxIcon />} />
                    </BottomNavigation>
                </Box>

                {viewValue === 0 && (
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            A continuación se muestran las asignaciones hechas de estudiantes a profesores.
                        </Typography>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={assignmentRows}
                                columns={assignmentColumns}
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
                    </Box>
                )}

                {viewValue === 1 && (
                    <Box sx={{ mt: 2, width: '100%', maxWidth: 600 }}>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                            Aquí puedes generar una nueva asignación para un estudiante.
                        </Typography>
                        <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
                            Al generar la asignación se le notificará al profesor correspondiente
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                            <FormControl fullWidth required>
                                <InputLabel id="student-select-label">Estudiante</InputLabel>
                                <Select
                                    labelId="student-select-label"
                                    id="student-select"
                                    name="studentId" // Important for handleFormChange
                                    value={newAssignment.studentId}
                                    label="Estudiante"
                                    onChange={handleFormChange} // Use generic handler
                                >
                                    <MenuItem value=""><em>Selecciona un estudiante</em></MenuItem>
                                    {students.map(student => (
                                        <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel id="professor-select-label">Profesor</InputLabel>
                                <Select
                                    labelId="professor-select-label"
                                    id="professor-select"
                                    name="professorId" // Important for handleFormChange
                                    value={newAssignment.professorId}
                                    label="Profesor"
                                    onChange={handleFormChange} // Use generic handler
                                >
                                    <MenuItem value=""><em>Selecciona un profesor</em></MenuItem>
                                    {professors.map(professor => (
                                        <MenuItem key={professor.id} value={professor.id}>{professor.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required> {/* Wrap rol Select in FormControl */}
                                <InputLabel id="rol-select-label">Rol</InputLabel> {/* New InputLabel for Rol */}
                                <Select
                                    labelId="rol-select-label"
                                    id="rol-select"
                                    name="rol" // Important: Set the name to "rol"
                                    value={newAssignment.rol}
                                    label="Rol" // Label for the Select component
                                    onChange={handleFormChange} // Use the generic handler
                                >
                                    <MenuItem value=""><em>Selecciona un rol</em></MenuItem>
                                    <MenuItem value="guía">Guía</MenuItem>
                                    <MenuItem value="informante">Informante</MenuItem>
                                    <MenuItem value="secretario">Secretario</MenuItem>
                                    <MenuItem value="presidente">Presidente</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SendIcon />}
                                onClick={handleSubmitAssignment}
                                sx={{ mt: 2 }}
                            >
                                Generar Asignación
                            </Button>
                        </Box>
                    </Box>
                )}
            </Card>
        </Box>
    );
}

export default Asignaciones;