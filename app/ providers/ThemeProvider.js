"use client"
import { light } from '@mui/material/styles/createPalette';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

const lightTheme = {
  colors: {
    text: {
        primary: 'black',
        secondary: 'grey',
    },
  },
};

const darkTheme = {
    colors: {
        text: {
            primary: 'white',
            secondary: 'lightgrey',
        },
    },
};

export default function ThemeClient({ children }) {
    const [ theme, setTheme ] = useState(light);
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}