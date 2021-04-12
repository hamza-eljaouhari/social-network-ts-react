import AuthenticationForm from '../AuthenticationForm'
import CardImageHeader from "../../assets/login-header.jpg";
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <AuthenticationForm
            formTitle="Welcome to the social network clone"
            routePath="/login"
            routeText="Login"
            cardImageHeader={CardImageHeader}
            formText="Register"
        >
            <RegisterForm/>
        </AuthenticationForm>
    );
}

export default Register;

