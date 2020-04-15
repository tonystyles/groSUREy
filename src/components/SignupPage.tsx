import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, FormControl, TextField } from '@material-ui/core';

interface SignupPropsInt {
  children: React.ReactNode;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
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
  setName,
  setUsername,
  setPassword,
  setEmail
}): JSX.Element => {
  const classes: Record<'button' | 'root' | 'container', string> = useStyles();

  //need to change for functionality
  // const toggleLogin: () => void = (): void => {
  //   setLoginState(true);
  // };
  return (
    <>
      <Container className={classes.container}>
        {children}
        <FormControl>
          <TextField
            id="standard-basic"
            label="Name"
            onChange={(e) => setName(e.target.value)}
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
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
            //need to add functionality here
            // onClick={() => toggleLogin()}
          >
            Sign Up Now!
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default SignupPage;
