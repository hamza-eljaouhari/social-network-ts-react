import {
  Link,
} from "react-router-dom";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import isAuthenticated from '../../utils/isAuthenticated';

import routerLinkStyleConfiguration from '../../utils/routerLinkStyleConfiguration'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface HeaderProps {
  toggleSidebar: (isOpen: boolean) => void;
}


function Header(props : HeaderProps) {
  const classes = useStyles();

  const { toggleSidebar } = props;
  
  function loginLink(){
    if(!isAuthenticated()){
      return (
        <Link to="/chat" style={routerLinkStyleConfiguration()}>
          Login
        </Link>
      )
    }
  }

  function chatLink(){
    if(isAuthenticated()){
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
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={() => toggleSidebar(true)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            {
              chatLink()
            }
            {
              loginLink()
            }
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default Header;