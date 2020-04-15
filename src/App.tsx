import 'typeface-roboto';
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ItemList from './components/ItemList';
import {AppPropsInterface} from './utils/interfaces'

const App: React.FC= (): JSX.Element => {
  const [loginState, setLoginState]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [username, setUsername]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');
  const [password, setPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');
  const [drawerOut, setDrawerOut]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const loginProps: AppPropsInterface = {
    loginState,
    setLoginState,
    username,
    setUsername,
    password,
    setPassword
  };

  const drawerProps: any = {
    drawerOut,
    setDrawerOut
  }

  const message: JSX.Element = <h1>Welcome {username}!</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage {...loginProps} {...drawerProps}>{message}</HomePage>
          </Route>
          <Route path="/login">
            <LoginPage {...loginProps}>
              <p>Please log in or go away!</p>
            </LoginPage>
          </Route>
          <Route path="/list/:groupID">
            <ItemList {...loginProps} {...drawerProps} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
