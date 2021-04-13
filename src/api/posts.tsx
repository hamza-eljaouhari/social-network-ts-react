import axios from '../axios';

const postsApi = {
    getAllPosts: async (): Promise<any> => {

        return await axios.get("/user/feed", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
    },
}

export default postsApi;