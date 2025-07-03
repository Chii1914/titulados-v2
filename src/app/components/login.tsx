import React from 'react';
import { Box, Button, Paper, Grid, Typography } from "@mui/material";

/**
 * Login Component
 *
 * This component provides a login interface, adjusted for a refined aesthetic
 * that aligns with Material-UI v7's design principles.
 *
 * It ensures the content is centered and applies explicit styling for
 * consistent visual presentation across different MUI versions, focusing on
 * modern spacing, shadows, and button appearance.
 *
 * @returns {JSX.Element} The Login component.
 */
export default async function Login() {
  // Note: Using 'async' for a simple client-side component like this
  // is usually not necessary unless you're performing await operations
  // (e.g., data fetching) directly within the component's render logic,
  // or if it's intended as a React Server Component in Next.js App Router.
  // If not, you can safely remove 'async'.

  return (
    // Main container for the login page.
    // It uses Tailwind CSS classes for full screen height and centering content.
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24">
      {/* Box component acts as a flexible wrapper for the Paper component.
          It helps in controlling the maximum width on larger screens for better readability. */}
      <Box sx={{ maxWidth: '450px', width: '100%', mx: 'auto', height: 'auto'}}>
        {/* Paper component provides a distinct, elevated surface for the login form.
            - `elevation={6}` gives a more pronounced shadow (can be adjusted 0-24).
            - `sx` prop is used for direct Material-UI styling:
              - `p: { xs: 4, md: 6 }` applies responsive padding.
              - `borderRadius: '12px'` ensures more rounded corners.
              - `textAlign: 'center'` centers all inline content within the Paper. */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 6 }, // Responsive padding
            borderRadius: '12px', // More pronounced rounded corners
            textAlign: 'center', // Center text and inline elements within the Paper
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', // Enhanced shadow for depth
          }}
        >
          {/* Grid container for arranging elements in a column.
              - `direction="column"` stacks items vertically.
              - `justifyContent="center"` centers items along the column's main axis (vertical centering).
              - `alignItems="stretch"` makes items fill the width of the container.
              - `spacing={3}` adds consistent vertical spacing between grid items. */}
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3} // Increased spacing for better visual separation
          >
            {/* Typography for the main title of the login section.
                - `variant="h4"` applies a heading 4 style.
                - `component="h1"` ensures semantic HTML for the main heading.
                - `sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}`:
                  - `mb: 2` adds consistent bottom margin.
                  - `fontWeight: 'bold'` makes the title stand out.
                  - `color: 'primary.main'` uses the primary color from your MUI theme. */}
            <Grid item component="div"> {/* Added component="div" to resolve TypeScript error */}
              <Typography
                variant="h4"
                component="h1" // Semantic HTML for main heading
                sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
              >
                Sistema de titulados UV
              </Typography>
            </Grid>

            {/* Typography providing instructions for institutional email.
                - `sx={{ mb: 4, color: 'text.secondary' }}`:
                  - `mb: 4` adds more bottom margin before the button.
                  - `color: 'text.secondary'` uses a secondary text color for softer appearance. */}
            <Grid item component="div"> {/* Added component="div" to resolve TypeScript error */}
              <Typography
                variant="body1"
                sx={{ mb: 4, color: 'text.secondary' }}
              >
                A continuación, ingrese con su correo institucional UV.
              </Typography>
            </Grid>

            {/* Button to initiate the login process.
                - `variant="contained"` applies a filled button style.
                - `component="a"` renders the button as an anchor tag.
                - `href="/auth/login"` sets the navigation link.
                - `sx` prop for enhanced styling:
                  - `width: '100%'` ensures the button spans full width.
                  - `py: 1.75` increases vertical padding for a more substantial button.
                  - `fontSize: '1.15rem'` makes the text slightly larger.
                  - `borderRadius: '8px'` applies rounded corners.
                  - `boxShadow` and `&:hover` effects add visual feedback and polish. */}
            <Grid item component="div"> {/* Added component="div" to resolve TypeScript error */}
              <Button
                variant="contained"
                component="a"
                href="/auth/login"
                sx={{
                  width: '100%',
                  py: 1.75, // Increased vertical padding
                  fontSize: '1.15rem', // Slightly larger font size
                  borderRadius: '8px', // Consistent rounded corners
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)', // More prominent shadow
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.25)', // Enhanced shadow on hover
                    transform: 'translateY(-2px)', // Slight lift effect
                  },
                  transition: 'all 0.3s ease-in-out', // Smoother transition
                }}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </main>
  );
}
