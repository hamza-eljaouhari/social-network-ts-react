import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
        '& > *': {
            marginTop: theme.spacing(1),
            width: "100%",
        }
    }
  }),
);

function LoginForm() {
    const classes = useStyles();

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="username" label="Username" variant="filled"/>
            <TextField id="password" label="Password" variant="filled" />
            <Button variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
}

export default LoginForm;