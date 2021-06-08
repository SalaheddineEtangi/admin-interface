import React from 'react';
import {Home} from './components/Home'; 
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import {ForgotPassword} from './components/ForgotPassword'
import {UpdatePassword} from './components/UpdatePassword'
import AddUser from './components/AddUser'
import {EditUser} from './components/EditUser'
import Users from './components/Users'
import {PrivateRoute} from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import {store} from './actions/store'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Container} from '@material-ui/core'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastProvider} from 'react-toast-notifications'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                <PrivateRoute path="/update-password" component={UpdatePassword}></PrivateRoute>
                <PrivateRoute path="/add-user" component={AddUser}></PrivateRoute>
                <PrivateRoute path="/edit-user/:id" component={EditUser}></PrivateRoute>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/forgot-password" component={ForgotPassword}></Route>
                <ToastProvider autoDismiss={true}>
                  <Container>
                    <Route path="/users" component={Users}></Route>
                  </Container>
                </ToastProvider>
              </Switch>
            </AuthProvider>
          </Router>
      </div>
    </Provider>
  );
}

export default App;
