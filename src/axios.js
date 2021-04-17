const axios = require("axios");

const instance = axios.create({
    // baseURL: 'http://social.codingmomentum.com/api',
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        "Accept": "application/json"
    }
});

const token = localStorage.getItem("token");
instance.defaults.headers.common['Authorization'] = token;
    
export default instance;