import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: red[300],
            main: red[500],
            dark: red[700]
        },
        secondary: {
            light: pink[100],
            main: pink[300],
            dark: pink[500]
        }
    },
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiTypography: {
            root: {}
        }
    }
});

const Theme = Component => {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
};

export default Theme;
