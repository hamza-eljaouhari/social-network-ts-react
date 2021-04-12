import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import React from "react";
import Header from './Partials/Header/Header';
import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import Home from './Home/Home';
import Sidebar from './Partials/Sidebar/Sidebar';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "50px"
    },
  }),
);


function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function toggleSidebar(){
    setOpen(!open);
  }
  
  return (
    <div className="App">
      <Router>
        <Header toggleSidebar={toggleSidebar}/>
        <Sidebar open={open} />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home className={classes.root}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
