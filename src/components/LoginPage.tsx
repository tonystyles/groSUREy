import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, FormControl, TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { response } from 'express';

interface PropsInt {
  loginState: boolean;
  children: React.ReactNode;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles: (
  props?: any
) => Record<'root' | 'button' | 'container', string> = makeStyles(
  (theme: Theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200
      }
    },
    container: {
      flex: 1,
      margin: 'auto',
      width: '50%'
    },
    button: {
      float: 'right',
      marginTop: '5vh',
      marginLeft: '7vw'
    }
  })
);

const LoginPage: React.FC<PropsInt> = ({
  loginState,
  children,
  setLoginState,
  setUsername,
  setPassword,
  username,
  password
}): JSX.Element => {
  const classes: Record<'button' | 'root' | 'container', string> = useStyles();

  const toggleLogin: () => void = (): void => {
    const fetchLogin = async () => {
      try {
        const response = await fetch('/user/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        });
        const json = await response.json();
        if (json.isLoggedIn) {
          setLoginState(true);
          console.log('success!');
        }
      } catch (error) {
        console.log('Request to sever failed');
      }
    };
    fetchLogin();
  };
  return (
    <>
      <Container className={classes.container}>
        {children}
        <FormControl>
          <TextField
            id="standard-basic"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />          
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
            onClick={() => toggleLogin()}
          >
            Log In
          </Button>
          <Link to="/signupPage">
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
          >
            Sign Up
          </Button>
          </Link>
        </FormControl>
      </Container>
    </>
  );
};

export default LoginPage;
