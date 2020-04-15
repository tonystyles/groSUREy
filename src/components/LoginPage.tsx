import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

interface PropsInt {
  children: React.ReactNode;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  container: {
    flex: 1,
    margin: "auto",
    width: "50%",
  },
  button: {
    float: "right",
    marginTop: "5vh",
    marginLeft: "7vw",
  },
}));

const LoginPage: React.FC<PropsInt> = ({
  children,
  setLoginState,
  setUsername,
  setPassword,
}) => {
  const classes = useStyles();

  const toggleLogin = () => {
      setLoginState(true);
  };
  return (
    <>
      <Container className={classes.container}>
        {children}
        <FormControl>
          <TextField id="standard-basic" label="Username" onChange={(e) => setUsername(e.target.value)}/>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className={classes.button} variant="outlined" type="submit" onClick={()=>toggleLogin()}>
            Log In
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default LoginPage;
