import axios from '../axios';
import UpdateCommunityApiRequest from "../Types/UpdateCommunityApiRequest";
import PaginateCommunitiesApiRequest from "../Types/PaginateCommunitiesApiRequest";

const communitiesApi = {
    getAll: async (): Promise<any> => {
        return await axios.get("/communities");
    },
    create: async (): Promise<any> => {
        return await axios.post("/communities")
    },
    edit: async (community: UpdateCommunityApiRequest): Promise<any> => {
        return await axios.patch("/commmunities/" + community.id, {
            name: community.name,
            content: community.content
        })
    },
    getById: async (id: number): Promise<any> => {
        return await axios.get("/communities/" + id)
    },
    paginate: async (request: PaginateCommunitiesApiRequest): Promise<any> => {
        return await axios.get("/communities/" + request.page_number + "/" + request.per_page)
    }
}

export default communitiesApi;