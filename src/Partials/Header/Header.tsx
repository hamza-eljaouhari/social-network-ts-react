import {
  Link,
} from "react-router-dom";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from "@material-ui/core";

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
  
  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={() => toggleSidebar(true)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Link to="/login" style={{ textDecoration: 'none', color: "white", marginLeft: "auto"}}>
              Login
            </Link>
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default Header;