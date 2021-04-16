import {
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import React, {useEffect} from "react";

import Header from './Partials/Header/Header';
import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import Home from './Home/Home';
import PostArticle from './Posts/Post/Article';
import Sidebar from './Partials/Sidebar/Sidebar';

import { withRouter } from "react-router-dom";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import authenticator from "./api/authenticate";

import PostEditor from "./Editor/Post/PostEditor";
import CommunityEditor from "./Editor/Community/CommunityEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "50px 150px"
    },
  }),
);

interface AppProps{
  history: any
}

function App(props : AppProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function toggleSidebar(isOpen: boolean){
    setOpen(isOpen);
  }

  useEffect(() => {
    authenticator.checkIfAuthenticated().then((response) => {
      if(response.data.success){
        if(['/login', '/register'].includes(props.history.location.pathname)){
          props.history.push('/home');
        }
        localStorage.setItem("isAuthenticated", "true");
      }
    }).catch((error) => {
      props.history.push('/login');
      localStorage.setItem("isAuthenticated", "false");
    })
  }, [props.history])
  
  return (
      <main className="App">
        <Header toggleSidebar={toggleSidebar}/>
        <Sidebar open={open} setOpen={toggleSidebar}/>
        <section className={classes.root}>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            {/* <Route path="/posts/:id">
              <PostArticle className={classes.root}/>
            </Route> */}
            <Route path="/posts/:id">
              <PostEditor />
            </Route>
            <Route path="/communities/:id">
              <CommunityEditor/>
            </Route>
          </Switch>
        </section>
      </main>
  );
}

export default withRouter(App);
