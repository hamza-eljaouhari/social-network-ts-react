import React from "react";
import { connect } from "react-redux";

import {
  Link,
} from "react-router-dom";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';

import routerLinkStyleConfiguration from '../../utils/routerLinkStyleConfiguration'

import CreateButton from "../CreateButton/CreateButton";
import { Typography } from "@material-ui/core";

import isOnPage from '../../utils/isOnPage'

import {
  withRouter
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      justifyContent: "space-between"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function Header(props: any) {
  const classes = useStyles();

  const { toggle, history, isAuthenticated } = props;
  
  function registerLink(){
    if(isAuthenticated){
      return;
    }

    if(isOnPage("/login", history)){
      return (
          <Link to="/register" style={routerLinkStyleConfiguration()}>
            <Typography component="h6">
              Register
            </Typography>
          </Link>
      )
    }
  }

  function loginLink(){
    if(isAuthenticated){
      return;
    }

    if(isOnPage("/register", history)){
      return (
          <Link to="/login" style={routerLinkStyleConfiguration()}>
            <Typography component="h6">
              Login
            </Typography>
          </Link>
      )
    }
  }

  function chatLink(){
    if(isAuthenticated){
      return (
          <Link to="/chat" onClick={() => alert("Chat is not yet implemented")} style={routerLinkStyleConfiguration()}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
              <ChatIcon />
            </IconButton>
          </Link>
      );
    }
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" onClick={() => toggle(true)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
              <div>
                {
                  isAuthenticated &&
                  <CreateButton></CreateButton>
                }
                {
                  chatLink()
                }
                {
                  loginLink()
                }
                {
                  registerLink()
                }
              </div>
          </Toolbar>
        </AppBar>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  console.log("state", state)
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated
  };
};
export default connect(mapStateToProps)(withRouter(Header));