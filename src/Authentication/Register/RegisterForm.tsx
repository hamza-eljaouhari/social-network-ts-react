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

function RegisterForm() {
    const classes = useStyles();

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="username" label="Username" variant="filled"/>
            <TextField id="email" label="Email" variant="filled"/>
            <TextField id="password" label="Password" variant="filled" />
            <TextField id="confirm-password" label="Confirm Password" variant="filled" />
            <Button variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
}

export default RegisterForm;