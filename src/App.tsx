import "typeface-roboto";
import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ItemList from "./components/ItemList";
import { AppPropsInterface } from "./utils/interfaces";
import SignupPage from "./components/SignupPage";

interface SignupPropsInterface {
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  alias: string;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
}

const App: React.FC = (): JSX.Element => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [drawerOut, setDrawerOut] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [alias, setAlias] = useState<string>("");


  const loginProps: AppPropsInterface = {
    loginState,
    setLoginState,
    username,
    setUsername,
    password,
    setPassword,
  };

  const drawerProps: any = {
    drawerOut,
    setDrawerOut,
  };

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await fetch("/user/");
        const json = await response.json();
        if (json.isLoggedIn) {
          setLoginState(true);
          console.log("success!");
        } else {
          setLoginState(false);
        }
      } catch (error) {
        console.log("Request to sever failed");
      }
    };
    if (!loginState) fetchLogin();
  }, [loginState]);

  const signupProps: SignupPropsInterface = {
    fullName,
    setFullName,
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    alias,
    setAlias
  };

  const message: JSX.Element = <h1>Welcome {username}!</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage {...loginProps} {...drawerProps}>
              {message}
            </HomePage>
          </Route>
          <Route path="/login">
            <LoginPage {...loginProps}>
              <p>Please log in or go away!</p>
            </LoginPage>
          </Route>
          <Route path="/signupPage">
            <SignupPage {...signupProps}>
              <p>Sign up!</p>
            </SignupPage>
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
