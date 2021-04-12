import AuthenticationForm from '../AuthenticationForm'
import CardImageHeader from "../../assets/login-header.jpg";
import LoginForm from "./LoginForm";

function Register() {
    return (
        <AuthenticationForm
            formTitle="Welcome to the social network clone"
            routePath="/register"
            routeText="Register"
            cardImageHeader={CardImageHeader}
            formText="Login"
        >
            <LoginForm/>
        </AuthenticationForm>
    );
}

export default Register;

