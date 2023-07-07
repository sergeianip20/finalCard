import { createTheme } from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#366EFF',
        },
        secondary: {
            main: '#FCFCFC',
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 1,
            },
            styleOverrides: {
                root: {
                    display: 'flex',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    lineHeight: '27px',
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    width: 'max-content',
                    position: 'relative',
                    overflow: 'visible',
                    borderRadius: '1px',
                    marginTop: '15px',
                    '::after': {
                        content: '""',
                        position: 'absolute',
                        display: 'block',
                        right: '18px',
                        top: '-19px',
                        border: '10px solid transparent',
                        borderBottom: '10px solid white',
                    },
                },
            },
        },
    },
})
