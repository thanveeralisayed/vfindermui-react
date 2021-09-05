import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, red } from '@material-ui/core/colors';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';





const Layout = ({ children }) => {
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? blue[500] : blue[900];
    const mainSecondaryColor = darkState ? red[100] : red[500];
    const darkTheme = createTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });

    useEffect(() => {
        if (localStorage.getItem('darkmode')) {
           const value = localStorage.getItem('darkmode');
           console.log(value);
           if (value === 'false') {
               setDarkState(false);
           }
           if (value === 'true') {
               setDarkState(true);
           }
          
        }
    }, [])

    const handleThemeChange = () => {
        setDarkState(!darkState);
        localStorage.setItem("darkmode",!darkState);
        
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        nighttoggle:{
            cursor:'pointer'
        }
    }));

    const classes = useStyles();


    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <div>
                    <div className={classes.root}>
                        <AppBar  position="static">
                            <Toolbar>
                                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton> */}
                                <Typography variant="h6" className={classes.title}>
                                    VFinder
                                </Typography>
                                {/* <Button color="inherit">Login</Button> */}
                                {
                                    !darkState ? <Brightness4OutlinedIcon className={classes.nighttoggle} onClick={() => handleThemeChange()} /> :
                                        <FlareOutlinedIcon className={classes.nighttoggle} onClick={() => handleThemeChange()} />
                                }
                            </Toolbar>
                        </AppBar>
                    </div>

                    {children}
                </div>
            </div>
        </ThemeProvider>

    )
}

export default Layout
