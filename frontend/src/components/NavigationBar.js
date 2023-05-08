import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { lightBlue, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    '&:hover': {
      color: 'grey',
    },
  },
}));

const NavBar = (props) => {
  const { user, user_email } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  }))(Button);

  const ReviewButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lightBlue[500]),
      backgroundColor: lightBlue[500],
      '&:hover': {
        backgroundColor: lightBlue[700],
      },
    },
  }))(Button);

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleReviewClick = () => {
    navigate('/review');
  };

  const handleTitleClick = () => {
    navigate('/');
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
        <Typography variant="h6" className={classes.title} onClick={handleTitleClick}>
          CalCalories
        </Typography>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <Typography variant="h6" style={{ marginRight: '0.5rem' }}>
              Welcome, {user_email}
            </Typography>
            <ColorButton  onClick={handleProfileClick} style={{ marginRight: '0.5rem' }}>
              Profile
            </ColorButton>
            <ReviewButton color="inherit" onClick={handleReviewClick} style={{ marginRight: '0.5rem' }}>
              Review
            </ReviewButton>
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
