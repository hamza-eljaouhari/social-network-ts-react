import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Header from "../Header/Header";
import sideBarLinkStyleConfiguration from "../../utils/sideBarLinkStyleConfiguration";

import {
  Link
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: "30px",
    },
  }),
);

export default function ClippedDrawer(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Header></Header>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[['Feed', '/posts'], ['Communities', '/communities'], ['Drafts', '/posts/drafts'], ['Profile', '/profile'], ['Settings', '/setting']].map((menuItem, index) => (
                <Link to={menuItem[1]} style={sideBarLinkStyleConfiguration()}>
                  <ListItem button key={menuItem[1]}>
                    <ListItemIcon>
                      <InboxIcon></InboxIcon>  
                    </ListItemIcon>
                  <ListItemText primary={menuItem[0]} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {
          props.children
        }
      </main>
    </div>
  );
}
