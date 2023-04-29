import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

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
  }));

const NavBar = (props) => {
    const {user} = props;

    const classes = useStyles();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                CalCalories
                </Typography>
                <Button color="inherit" onClick={handleLoginClick}>
                    {user ? 'Logout' : 'Login'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;