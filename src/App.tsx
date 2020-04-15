import 'typeface-roboto';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ItemList from './components/ItemList'

function App() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginProps = {
    loginState,
    setLoginState,
    username,
    setUsername,
    password,
    setPassword
  };

  const message = <h1>Welcome {username}!</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage {...loginProps}>{message}</HomePage>
          </Route>
          <Route path="/login">
            <LoginPage {...loginProps}>
              <p>Please log in or go away!</p>
            </LoginPage>
          </Route>
          <Route path="/list/:groupID">
            <ItemList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
