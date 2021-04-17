import {
  Switch,
  Route,
} from "react-router-dom";

import { connect } from "react-redux";

import { 
  setIsAuthenticated, 
  setAuthenticationToken 
} from "./redux/reducers/authentication/actions";

import './App.css';
import React, {useEffect} from "react";

import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import Sidebar from './Partials/Sidebar/Sidebar';

import { withRouter } from "react-router-dom";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import authenticator from "./api/authenticate";

import Entities from "./Entities/Entities";
import EntityEditor from "./Editor/EntityEditor"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  }),
);

function App(props : any) {
  const classes = useStyles();

  useEffect(() => {
    authenticator.checkIfAuthenticated().then((response) => {
      if(response.data.success){
        if(['/login', '/register'].includes(props.history.location.pathname)){
          // props.history.push('/home');
        }

          props.setIsAuthenticated(true);
          props.setAuthenticationToken(localStorage.getItem("token"));
      }
    }).catch((error) => {
      props.history.push('/login');
      localStorage.setItem("isAuthenticated", "false");
    })
  }, [props.history])
  
  return (
    <>
      <Sidebar>
        <main className="App">
          <section className={classes.root}>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              {/* <Route path="/posts/:id">
                <PostArticle className={classes.root}/>
              </Route> */}
              <Route path="/posts/:id">
                <EntityEditor entityType="posts"/>
              </Route>
              <Route path="/communities/:id">
                <EntityEditor entityType="communities"/>
              </Route>

              <Route path="/posts">
                <Entities />
              </Route>
              <Route path="/communities">
                <Entities />
              </Route>
            </Switch>
          </section>
        </main>
     </Sidebar>
    </>
  );
}


const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated
  };
};


function mapDispatchToProps(dispatch: any) {
  return {
      setIsAuthenticated: (isAuthenticated: boolean) => dispatch(setIsAuthenticated(isAuthenticated)),
      setAuthenticationToken: (token: string) => dispatch(setAuthenticationToken(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));