import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import authenticator from "../../api/authenticate";

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
    const history = useHistory();

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })

    function onChangeEmail(event : React.ChangeEvent<HTMLInputElement>){
        setCredentials({...credentials, email: event.target.value});
    }

    function onChangePassword(event : React.ChangeEvent<HTMLInputElement>){
        setCredentials({...credentials, password: event.target.value});
    }

    function handleSubmit(event : React.KeyboardEvent | React.MouseEvent) {

        event.preventDefault();
        
        authenticator.authenticate(credentials).then((response: any) => {
            console.log(response);
            history.push("/home");
        }).catch((error: any) => {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
                console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }
    
    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="email" onChange={onChangeEmail} label="Username" variant="filled"/>
            <TextField id="password" onChange={onChangePassword} label="Password" variant="filled" />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
        </form>
    );
}

export default LoginForm;