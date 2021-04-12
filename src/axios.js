import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://social.codingmomentum.com/api',
    timeout: 10000,
    headers: {
        'Authorization': localStorage.getItem("token"),
        "Accept": "application/json"
    }
});

export default instance;