import axios from '../axios';

interface Credentials {
    email: string,
    password: string
}

interface User {
    email: string,
    password: string,
    username: string
}

const authenticator = {
    authenticate: async (credentials: Credentials): Promise<any> => {
        return await axios.post("/user/signin", {
            email: credentials.email,
            password: credentials.password
        });
    },
    register: async (user: User): Promise<any> => {
        return await axios.post("/user/signup", {
            email: user.email,
            password: user.password,
            username: user.username
        });
    },
    checkIfAuthenticated: async (): Promise<any> => {
        return await axios.post("/user/checkJWT")
    }
}

export default authenticator;