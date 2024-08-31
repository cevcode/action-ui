'use client';
import { createTheme } from '@mui/material/styles';
import './styles/globals.css'; // Ensure this line imports your global CSS file

const theme = createTheme({
    typography: {
        fontFamily: 'LabGrotesque, Arial, sans-serif', // Fallbacks in case the custom font doesn't load
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

export default theme;
