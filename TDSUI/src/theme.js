import { createTheme } from '@mui/material/styles';

// Triode Data Systems Color Palette
const colors = {
  copper: '#F68B1F', // Primary orange/copper
  silver: {
    main: '#6D6E71', // Main grey
    light: '#BCBEC0', // Light grey
  },
  black: '#000000',
  white: '#FFFFFF',
};

const theme = createTheme({
  typography: {
    fontFamily: '"Futura BT", "Britannic Bold", "Arial", sans-serif',
    h1: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Britannic Bold", "Arial", sans-serif',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: '"Futura BT", "Arial", sans-serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Futura BT", "Arial", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Futura BT", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Futura BT", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Futura BT", "Arial", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: colors.copper,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.silver.main,
      light: colors.silver.light,
      contrastText: colors.white,
    },
    text: {
      primary: colors.black,
      secondary: colors.silver.main,
    },
    background: {
      default: '#f8f9fa',
      paper: colors.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          '&.MuiButton-contained': {
            background: `linear-gradient(135deg, ${colors.copper} 0%, #d97a1c 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, #d97a1c 0%, #c26918 100%)`,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${colors.silver.light}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.silver.light}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;