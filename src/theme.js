import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const AppTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette: {
        primary: {
            light: '#ff6659',
            main: '#d32f2f',
            dark: '#9a0007',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff867c',
            main: '#ef5350',
            dark: '#b61827',
            contrastText: '#fff'
        }
    }
});