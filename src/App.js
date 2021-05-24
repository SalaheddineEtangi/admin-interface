import React from 'react';
import {Home} from './components/Home'; 
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
