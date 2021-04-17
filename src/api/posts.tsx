import axios from '../axios';
import UpdatePostApiRequest from "../Types/UpdatePostApiRequest";
import PaginatePostsApiRequest from "../Types/PaginatePostsApiRequest";

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
    getById: async (id: number): Promise<any> => {
        return await axios.get("/posts/" + id)
    },
    paginate: async (request: PaginatePostsApiRequest): Promise<any> => {
        return await axios.get("/posts/" + request.page_number + "/" + request.per_page)
    }
}

export default postsApi;