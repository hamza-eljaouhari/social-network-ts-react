import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import authenticator from "../../api/authenticate";
import { useHistory } from "react-router-dom";

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
    const history = useHistory();
    
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })
    
    function onChangeEmail(event : React.ChangeEvent<HTMLInputElement>){
        setUser({...user, email: event.target.value});
    }

    function onChangePassword(event : React.ChangeEvent<HTMLInputElement>){
        setUser({...user, password: event.target.value});
    }

    function onChangeUsername(event : React.ChangeEvent<HTMLInputElement>){
        setUser({...user, username: event.target.value});
    }
    
    function onChangePasswordConfirmation(event : React.ChangeEvent<HTMLInputElement>){
        setUser({...user, confirmPassword: event.target.value});
    }

    function handleSubmit(event : React.KeyboardEvent | React.MouseEvent) {

        event.preventDefault();

        if(user.confirmPassword !== user.password){
            alert("Error : The passwords aren't identical.");
            return
        }
        
        authenticator.register(user).then((response: any) => {
            history.push("/login");
            alert("Account created successfully, you can now login !")
            
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
            <TextField id="username" label="Username" onChange={onChangeUsername} variant="filled"/>
            <TextField id="email" label="Email" onChange={onChangeEmail} variant="filled"/>
            <TextField id="password" label="Password" onChange={onChangePassword} variant="filled" />
            <TextField id="confirm-password" onChange={onChangePasswordConfirmation} label="Confirm Password" variant="filled" />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Register
            </Button>
        </form>
    );
}

export default RegisterForm;