import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, FormControl, TextField } from '@material-ui/core';

interface SignupPropsInt {
  children: React.ReactNode;
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

const SignupPage: React.FC<SignupPropsInt> = ({
  children,
  setFullName,
  setUsername,
  setPassword,
  setEmail,
  setAlias,
  fullName,
  username,
  password,
  email,
  alias
}): JSX.Element => {
  const classes: Record<'button' | 'root' | 'container', string> = useStyles();

  const signinButton: () => void = (): void => {
    const fetchSignup = async () => {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({fullName, username, password, email,alias})
        });
      } catch (error) {
        console.log('Request to server /signup failed');
      }
    };
    fetchSignup();
  };
  return (
    <>
      <Container className={classes.container}>
        {children}
        <FormControl>
          <TextField
            id="standard-basic"
            label="Name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            id="standard-email"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <TextField
            id="standard-basic"
            label="nickname"
            onChange={(e) => setAlias(e.target.value)}
          />
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
            onClick={() => signinButton()}
          >
            Sign Up Now!
          </Button>
        </FormControl>
      </Container>
    </>
  );
};


export default SignupPage;
