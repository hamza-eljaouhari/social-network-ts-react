import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import Header from './Partials/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
