import axios from '../axios';
import UpdatePostApiRequest from "../Types/UpdatePostApiRequest";

const postsApi = {
    getAll: async (): Promise<any> => {
        return await axios.get("/user/feed");
    },
    create: async (): Promise<any> => {
        return await axios.post("/posts")
    },
    edit: async (post: UpdatePostApiRequest): Promise<any> => {
        return await axios.patch("/posts/" + post.id, post)
    },
    geptById: async (id: number): Promise<any> => {
        return await axios.get("/posts/" + id)
    }
}

export default postsApi;