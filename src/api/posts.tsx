import axios from '../axios';
import getAuthenticationToken from '../utils/getAuthenticationToken'

const postsApi = {
    getAllPosts: async (): Promise<any> => {

        return await axios.get("/user/feed");
    },
}

export default postsApi;