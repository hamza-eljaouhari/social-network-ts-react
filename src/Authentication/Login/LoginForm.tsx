import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import authenticator from "../../api/authenticate";
import handleError from "../../utils/handleError";

import { connect } from "react-redux";

import axios from "../../axios";

import { setIsAuthenticated, setAuthenticationToken } from "../../redux/reducers/authentication/actions";

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

function LoginForm(props: any) {
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
            const token = response.data.access_token;
            
            // axios.defaults.headers.common['Authorization'] = token;

            localStorage.setItem("token", token);
            props.setIsAuthenticated(true)
            props.setToken(token);

            axios.defaults.headers.common['Authorization'] = token;
                
            history.push("/home");

        }).catch((error: any) => {
            props.setIsAuthenticated(false)
            handleError(error);
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

function mapDispatchToProps(dispatch: any) {
    return {
        setIsAuthenticated: (isAuthenticated: boolean) => dispatch(setIsAuthenticated(isAuthenticated)),
        setToken: (token: string) => dispatch(setAuthenticationToken(token))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);