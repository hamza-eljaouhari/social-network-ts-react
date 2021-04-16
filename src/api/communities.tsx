import axios from '../axios';
import UpdateCommunityApiRequest from "../Types/UpdateCommunityApiRequest";

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
}

export default communitiesApi;