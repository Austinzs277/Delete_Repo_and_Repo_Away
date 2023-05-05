import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
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
  const { user } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleReviewClick = () => {
    navigate('/review');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          CalCalories
        </Typography>
        {user ? (
          <div>
            <Button color="inherit" onClick={handleProfileClick}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleReviewClick}>
              Review
            </Button>
            <Button color="inherit" onClick={handleLoginClick}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
