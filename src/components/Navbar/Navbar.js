import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { logoNavBar } from "../../images";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const onClickLogOut = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  }, [dispatch, navigate, setUser]);
  
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        onClickLogOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, onClickLogOut, user?.token]);
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={logoNavBar}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={onClickLogOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
