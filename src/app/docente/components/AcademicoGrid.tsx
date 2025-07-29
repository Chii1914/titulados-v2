"use client";
import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface AcademicoGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

export default function AcademicoGrid({ rows, columns }: AcademicoGridProps) {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'fechaAsignacion', sort: 'desc' }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.main',
            color: 'primary.main',         
            fontFamily: "'Swis721 BT', sans-serif",
            fontSize: '1rem',
          },
          '& .MuiDataGrid-cell': {
            fontFamily: "'Swis721 BT', sans-serif",
          },
          '& .MuiButton-root': {
            fontFamily: "'Swis721 BT', sans-serif"
          }
        }}
        
      />
    </Box>
  );
}