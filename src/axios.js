import axios from 'axios';
import getAuthenticationToken from './utils/getAuthenticationToken';

const instance = axios.create({
    // baseURL: 'http://social.codingmomentum.com/api',
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        "Authorization": getAuthenticationToken(),
        "Accept": "application/json"
    }
});

export default instance;